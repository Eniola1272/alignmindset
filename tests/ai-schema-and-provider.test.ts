import test from "node:test";
import assert from "node:assert/strict";
import { validateAiPlanOutput } from "@/lib/progress-builder/ai-schema";
import { DeterministicMockProvider } from "@/lib/progress-builder/ai-provider";

test("AI Schema Validation: rejects malformed data or missing sections", () => {
  assert.equal(validateAiPlanOutput(null).valid, false);
  assert.equal(validateAiPlanOutput("string").valid, false);
  assert.equal(validateAiPlanOutput({}).valid, false);

  const missingWeeklyPlan = {
    participant_summary: {
      current_situation: "Test",
      primary_challenge: "Test",
      strengths: ["Code"],
      constraints: ["Time"],
      motivation: "Growth",
      commitment_score: 9
    },
    recommended_direction: {
      ninety_day_destination: "Dev",
      primary_skill: "React",
      reason_for_recommendation: "Fit",
      assumptions: []
    },
    learning_plan: {
      main_course: { title: "Course" },
      supporting_resources: []
    },
    daily_system: {
      daily_learning_minutes: 45,
      days_per_week: 6
    },
    milestones: {
      first_24_hour_action: "Step 1",
      day_30_project: "P1",
      day_60_project: "P2",
      day_90_project: "P3"
    },
    weekly_plan: [
      // Only 3 weeks instead of 12
      { week_number: 1, primary_focus: "W1" },
      { week_number: 2, primary_focus: "W2" },
      { week_number: 3, primary_focus: "W3" }
    ]
  };

  const result = validateAiPlanOutput(missingWeeklyPlan);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("all 12 weeks")));
});

test("Deterministic Mock Provider: synthesizes a valid 12-week plan reflecting participant answers", async () => {
  const provider = new DeterministicMockProvider();
  const mockAnswers = {
    target_skill_name: "Frontend Development (React & TypeScript)",
    current_status: "employed_fulltime",
    weekly_hours_capacity: "10_to_15",
    day_30_milestone_project: "Interactive Product Showcase",
    day_60_milestone_project: "Full-stack Task Board with Supabase",
    day_90_capstone_project: "Production SaaS Client Dashboard",
    first_24_hour_action: "Initialize GitHub repo and configure Vite setup",
    accountability_partner: "mentor",
    commitment_score: 8
  };

  const { plan, provider: providerName } = await provider.generatePlan("David Adeleke", mockAnswers);

  assert.equal(providerName, "deterministic_mock");
  assert.ok(plan.participant_summary);
  assert.equal(plan.recommended_direction.primary_skill, "Frontend Development (React & TypeScript)");
  assert.equal(plan.milestones.day_30_project, "Interactive Product Showcase");
  assert.equal(plan.milestones.day_60_project, "Full-stack Task Board with Supabase");
  assert.equal(plan.milestones.day_90_project, "Production SaaS Client Dashboard");
  assert.equal(plan.milestones.first_24_hour_action, "Initialize GitHub repo and configure Vite setup");

  // Verify all 12 weeks are present and sequential
  assert.equal(plan.weekly_plan.length, 12);
  plan.weekly_plan.forEach((week, idx) => {
    assert.equal(week.week_number, idx + 1);
    assert.ok(week.primary_focus.length > 0);
    assert.ok(week.learning_target.length > 0);
    assert.ok(week.deliverable.length > 0);
    assert.ok(week.review_question.length > 0);
  });

  // Verify validation passes
  const validation = validateAiPlanOutput(plan);
  assert.equal(validation.valid, true);
  assert.equal(validation.errors.length, 0);
});
