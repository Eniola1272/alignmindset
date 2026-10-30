import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import {
  getAdminAnalyticsSummary,
  getAdminSubmissionsList,
  getAssessmentWithPlan,
  getOrCreateAssessment,
  reviewAndReleasePlan,
  saveAssessmentDraft,
  saveOrUpdatePlan,
  submitAssessment
} from "@/lib/progress-builder/db";
import { generateSecureToken, hashToken, SESSION_TOKEN_COOKIE } from "@/lib/progress-builder/session";
import { middleware } from "@/middleware";
import { NextRequest } from "next/server";

test("Session & Token: generates secure tokens and deterministic SHA-256 hashes", () => {
  const token = generateSecureToken();
  assert.equal(typeof token, "string");
  assert.equal(token.length, 64); // 32 bytes hex = 64 chars

  const hash1 = hashToken(token);
  const hash2 = hashToken(token);
  assert.equal(hash1, hash2);
  assert.equal(hash1.length, 64);
});

test("Middleware: creates anonymous session cookie if missing and preserves existing cookie", () => {
  // 1. Request without cookie receives a new session cookie
  const reqWithoutCookie = new NextRequest("http://localhost:3000/progress-builder");
  const res1 = middleware(reqWithoutCookie);
  const setCookie = res1.cookies.get(SESSION_TOKEN_COOKIE);
  assert.ok(setCookie, "Cookie should be set on response");
  assert.equal(typeof setCookie.value, "string");
  assert.equal(setCookie.value.length, 64);

  // 2. Request with valid cookie retains it
  const existingVal = "a".repeat(64);
  const reqWithCookie = new NextRequest("http://localhost:3000/progress-builder", {
    headers: {
      cookie: `${SESSION_TOKEN_COOKIE}=${existingVal}`
    }
  });
  const res2 = middleware(reqWithCookie);
  const retainedCookie = res2.cookies.get(SESSION_TOKEN_COOKIE);
  // In Next.js, NextResponse.next() without modification won't reset the cookie
  assert.equal(retainedCookie?.value ?? existingVal, existingVal);
});

test("Database & Workflow: creates draft, autosaves progress, and prevents duplicate submissions", async () => {
  const tokenHash = crypto.randomBytes(32).toString("hex");

  // 1. Get or create draft
  const { assessment } = await getOrCreateAssessment(tokenHash);
  assert.ok(assessment.id);
  assert.equal(assessment.status, "draft");
  assert.equal(assessment.current_step, 1);
  assert.equal(assessment.completion_percentage, 0);

  // 2. Autosave partial answers
  const draftAnswers = {
    current_status: "employed_fulltime",
    target_skill_name: "Technical Writing",
    weekly_hours_capacity: "10_to_15"
  };

  const saveRes = await saveAssessmentDraft(assessment.id, 4, draftAnswers);
  assert.equal(saveRes.success, true);
  assert.ok(saveRes.completionPercentage > 0);

  // 3. Verify retrieval
  const draftState = await getAssessmentWithPlan(assessment.id);
  assert.equal(draftState.assessment?.current_step, 4);
  assert.equal(draftState.answers.target_skill_name, "Technical Writing");

  // 4. Submit assessment
  const submitRes = await submitAssessment(
    assessment.id,
    "Test Participant",
    "test@example.com",
    "1.0"
  );
  assert.equal(submitRes.success, true);

  // 5. Duplicate submission check: submitting an already submitted assessment must fail
  const duplicateRes = await submitAssessment(
    assessment.id,
    "Test Participant",
    "test@example.com",
    "1.0"
  );
  assert.equal(duplicateRes.success, false);
  assert.ok(duplicateRes.message.includes("already been submitted"));

  // 6. Plan saving and review workflow
  const mockPlanJson: any = {
    participant_summary: {
      current_situation: "Employed",
      primary_challenge: "Direction",
      strengths: ["Writing"],
      constraints: ["10 hours"],
      motivation: "Growth",
      commitment_score: 9
    },
    recommended_direction: {
      ninety_day_destination: "Technical Writer with 3 published guides",
      primary_skill: "Technical Writing",
      reason_for_recommendation: "Strong written communication foundation",
      alternative_direction_if_needed: "Content Marketing",
      assumptions: []
    },
    learning_plan: {
      main_course: { title: "Technical Writing Foundations" },
      supporting_resources: []
    },
    daily_system: {
      daily_learning_minutes: 30,
      daily_practice_minutes: 30,
      days_per_week: 5,
      preferred_time: "Morning",
      preferred_location: "Desk",
      minimum_action_on_busy_days: "15m reading",
      distractions_to_control: [],
      recovery_rule: "Never miss twice"
    },
    milestones: {
      first_24_hour_action: "Outline first article",
      day_30_project: "Developer API Guide",
      day_60_project: "Open Source Documentation",
      day_90_project: "Capstone Case Study",
      certificate_target: "Portfolio"
    },
    evidence_and_portfolio: {
      weekly_output_requirement: "1 published note",
      portfolio_location: "GitHub",
      feedback_sources: [],
      proof_of_progress: []
    },
    opportunity_plan: {
      target_opportunities: [],
      weekly_application_target: 3,
      networking_actions: [],
      visibility_actions: [],
      cv_actions: [],
      linkedin_actions: [],
      portfolio_actions: []
    },
    accountability: {
      accountability_person: "Mentor",
      weekly_review_day: "Sunday",
      check_in_method: "Email",
      evidence_required: "Links",
      response_to_missed_commitments: "Reset"
    },
    weekly_plan: Array.from({ length: 12 }, (_, i) => ({
      week_number: i + 1,
      primary_focus: `Week ${i + 1}`,
      learning_target: "Target",
      practice_target: "Practice",
      deliverable: "Deliverable",
      opportunity_action: "Action",
      review_question: "Review"
    })),
    risks_and_interventions: [],
    closing_guidance: "Stay consistent",
    disclaimer: "No guarantees"
  };

  const savedPlan = await saveOrUpdatePlan(
    assessment.id,
    mockPlanJson,
    "mock",
    "deterministic-v1",
    "1.0",
    false // Private until reviewed
  );

  assert.ok(savedPlan.id);
  assert.equal(savedPlan.participant_visible, false);

  // 7. Review and Release
  const releasedPlan = await reviewAndReleasePlan(
    savedPlan.id,
    "reviewer@alignmindset.org",
    "Excellent assessment responses. Direction is solid.",
    undefined,
    true // Release to participant
  );

  assert.equal(releasedPlan.participant_visible, true);
  assert.equal(releasedPlan.reviewed_by, "reviewer@alignmindset.org");

  // 8. Admin Submissions & Analytics
  const submissions = await getAdminSubmissionsList();
  assert.ok(submissions.length > 0);
  assert.ok(submissions.some((s) => s.id === assessment.id));

  const analytics = await getAdminAnalyticsSummary();
  assert.ok(analytics.totalStarted > 0);
  assert.ok(analytics.totalSubmitted > 0);
  assert.ok(analytics.totalPlansReleased > 0);
});
