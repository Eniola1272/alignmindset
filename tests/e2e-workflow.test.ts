import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import {
  getAssessmentWithPlan,
  getOrCreateAssessment,
  reviewAndReleasePlan,
  saveAssessmentDraft,
  saveOrUpdatePlan,
  submitAssessment
} from "@/lib/progress-builder/db";
import { DeterministicMockProvider } from "@/lib/progress-builder/ai-provider";
import { generatePlanPdf } from "@/lib/progress-builder/pdf-generator";
import {
  PROGRESS_BUILDER_QUESTIONS,
  PROGRESS_BUILDER_SECTIONS,
  validateSectionAnswers
} from "@/lib/progress-builder/questions";

test("End-to-End Workflow: Start -> Answer -> Resume -> Submit -> AI Plan -> Admin Review -> Release -> PDF Download", async () => {
  // Step 1: User visits /progress-builder and starts assessment
  const userTokenHash = crypto.randomBytes(32).toString("hex");
  const { assessment: initialDraft } = await getOrCreateAssessment(userTokenHash);

  assert.ok(initialDraft.id);
  assert.equal(initialDraft.status, "draft");
  assert.equal(initialDraft.current_step, 1);

  // Step 2: User answers questions across sections
  const participantAnswers: Record<string, any> = {
    // Section 1
    current_status: "employed_fulltime",
    dissatisfaction_area: "unclear_direction",
    recent_improvement_attempts: "Attempted self-paced tutorials on JavaScript but got stuck",
    started_not_completed: "React bootcamp on Udemy",
    primary_blocker: "information_overload",
    clarity_rating: 4,
    consistency_rating: 5,

    // Section 2
    desired_90_day_change: "Having 3 full-stack applications deployed and a consistent daily morning coding habit",
    single_most_important_result: "Landing my first contract developer role",
    why_it_matters: "Financial stability and doing purposeful technical work",
    cost_of_inaction: "Staying stuck in survival mode for another year",
    target_outcome_type: "employment",
    measurable_90_day_metric: "3 completed portfolio projects and 10 job applications submitted",

    // Section 3
    enjoyed_activities: "Building user interfaces, breaking down complex logic",
    existing_skills: "HTML, CSS, JavaScript basics",
    curious_subjects: "Frontend architecture, Next.js, design systems",
    strengths_archetype: ["builder_technical", "creator_visual"],

    // Section 4
    skill_readiness: "decided",
    target_skill_name: "Frontend Development (Next.js & TypeScript)",
    skill_interest_reason: "High market demand and creative satisfaction",
    has_researched_daily_work: true,
    knows_practitioner: true,
    single_skill_commitment_agreement: "yes_committed",

    // Section 5
    past_courses_started: "The Odin Project, freeCodeCamp",
    past_abandonment_reasons: ["tutorial_hell", "lack_of_accountability"],
    learning_style_preference: "project_based",
    has_existing_course: false,
    wants_course_recommendation: "yes_recommend",

    // Section 6
    weekly_hours_capacity: "10_to_15",
    daily_protected_window: "early_morning",
    primary_hardware_device: "personal_laptop",
    internet_reliability: "stable_mobile_data",
    primary_distractions: ["social_media_phone", "fatigue_brain_fog"],
    habits_to_cut_down: "Evening Instagram scrolling",

    // Section 7
    daily_sustainable_minutes: "60",
    working_days_per_week: "6",
    physical_work_location: "Desk in bedroom with noise-canceling headphones",
    emergency_minimum_action: "15 minutes of reviewing technical notes",
    missed_day_recovery_rule: "never_miss_twice",

    // Section 8
    weekly_evidence_output: "git_commits_code",
    day_30_milestone_project: "Interactive Accessible Component Library",
    day_60_milestone_project: "Full-stack E-commerce Storefront with Supabase",
    day_90_capstone_project: "Collaborative Project Management SaaS App",
    public_portfolio_location: ["github", "personal_website"],

    // Section 9
    has_updated_cv: "needs_revision",
    linkedin_profile_status: "basic",
    weekly_application_target: "3_to_5",
    willing_to_share_publicly: true,
    gap_to_first_opportunity: "Lack of public portfolio case studies",

    // Section 10
    accountability_partner: "ami_community",
    review_cadence: "weekly_sunday",
    weekly_evidence_commitment: true,
    commitment_score: 9,
    move_commitment_higher: "Having this structured roadmap",
    first_24_hour_action: "Set up GitHub repo and complete Git configuration"
  };

  // Step 3: Autosave progress after Step 5 (simulating pausing)
  const midwaySave = await saveAssessmentDraft(initialDraft.id, 5, participantAnswers);
  assert.equal(midwaySave.success, true);
  assert.ok(midwaySave.completionPercentage > 40);

  // Step 4: Participant refreshes and resumes
  const resumedDraft = await getAssessmentWithPlan(initialDraft.id);
  assert.equal(resumedDraft.assessment?.current_step, 5);
  assert.equal(resumedDraft.answers.target_skill_name, "Frontend Development (Next.js & TypeScript)");

  // Step 5: Validate all sections before submission
  for (const section of PROGRESS_BUILDER_SECTIONS) {
    const val = validateSectionAnswers(section.id, participantAnswers);
    assert.equal(val.valid, true, `Section ${section.title} should be valid`);
  }

  // Step 6: Submit assessment
  const submitResult = await submitAssessment(
    initialDraft.id,
    "Fisayo Longe",
    "fisayo@example.com",
    "1.0"
  );
  assert.equal(submitResult.success, true);

  // Step 7: Duplicate submission is blocked
  const duplicateResult = await submitAssessment(
    initialDraft.id,
    "Fisayo Longe",
    "fisayo@example.com",
    "1.0"
  );
  assert.equal(duplicateResult.success, false);

  // Step 8: AI Plan Generation
  const aiProvider = new DeterministicMockProvider();
  const { plan: generatedPlan, provider, model } = await aiProvider.generatePlan(
    "Fisayo Longe",
    participantAnswers
  );

  assert.equal(generatedPlan.weekly_plan.length, 12);
  assert.equal(generatedPlan.milestones.day_90_project, "Collaborative Project Management SaaS App");

  // Step 9: Save plan as 'needs_review' (private until reviewed)
  const savedPlan = await saveOrUpdatePlan(
    initialDraft.id,
    generatedPlan,
    provider,
    model,
    "1.0",
    false // private until admin releases
  );

  assert.equal(savedPlan.participant_visible, false);

  // Verify participant cannot access unreleased plan
  const preReleaseCheck = await getAssessmentWithPlan(initialDraft.id);
  assert.equal(preReleaseCheck.plan?.participant_visible, false);

  // Step 10: Admin reviews, adds reviewer notes, and releases plan
  const releasedPlan = await reviewAndReleasePlan(
    savedPlan.id,
    "mentor@alignmindset.org",
    "Great direction and ambitious capstone project. Recommended focusing on testing in Week 8.",
    undefined,
    true // Release to participant
  );

  assert.equal(releasedPlan.participant_visible, true);
  assert.equal(releasedPlan.reviewed_by, "mentor@alignmindset.org");
  assert.ok(releasedPlan.reviewer_notes?.includes("Week 8"));

  // Step 11: Participant views released plan & downloads PDF
  const postReleaseCheck = await getAssessmentWithPlan(initialDraft.id);
  assert.equal(postReleaseCheck.plan?.participant_visible, true);
  assert.equal(postReleaseCheck.assessment?.status, "completed");

  const pdfBytes = await generatePlanPdf("Fisayo Longe", postReleaseCheck.plan!.plan_json);
  assert.ok(pdfBytes instanceof Uint8Array);
  assert.ok(pdfBytes.length > 2000);

  const pdfHeader = String.fromCharCode(...pdfBytes.slice(0, 5));
  assert.equal(pdfHeader, "%PDF-");
});
