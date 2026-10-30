import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateCompletionPercentage,
  getVisibleQuestionsForSection,
  isQuestionVisible,
  PROGRESS_BUILDER_QUESTIONS,
  PROGRESS_BUILDER_SECTIONS,
  validateSectionAnswers
} from "@/lib/progress-builder/questions";

test("Questions Schema: all 10 sections exist and are properly ordered", () => {
  assert.equal(PROGRESS_BUILDER_SECTIONS.length, 10);
  PROGRESS_BUILDER_SECTIONS.forEach((section, index) => {
    assert.equal(section.number, index + 1);
    assert.ok(section.id.length > 0);
    assert.ok(section.title.length > 0);
  });
});

test("Questions Schema: each question has required metadata and belongs to a valid section", () => {
  const sectionIds = new Set(PROGRESS_BUILDER_SECTIONS.map((s) => s.id));

  for (const q of PROGRESS_BUILDER_QUESTIONS) {
    assert.ok(q.question_id, "Question must have an ID");
    assert.ok(sectionIds.has(q.section_id), `Question ${q.question_id} has invalid section`);
    assert.ok(q.label, `Question ${q.question_id} has no label`);
    assert.ok(q.input_type, `Question ${q.question_id} has no input_type`);
    assert.ok(typeof q.required === "boolean");
    assert.ok(typeof q.display_order === "number");
  }
});

test("Conditional Visibility: evaluates equals and not_equals correctly", () => {
  const sampleQuestion = {
    question_id: "test_q",
    section_id: "section_learning_history",
    label: "Course details",
    input_type: "textarea" as const,
    required: true,
    display_order: 5,
    active: true,
    version: "1.0",
    conditional_visibility: {
      dependsOn: "has_existing_course",
      operator: "equals" as const,
      value: true
    }
  };

  assert.equal(isQuestionVisible(sampleQuestion, {}), false);
  assert.equal(isQuestionVisible(sampleQuestion, { has_existing_course: false }), false);
  assert.equal(isQuestionVisible(sampleQuestion, { has_existing_course: true }), true);
});

test("Conditional Visibility: evaluates less_than correctly for commitment scores", () => {
  const lowCommitmentQuestion = PROGRESS_BUILDER_QUESTIONS.find(
    (q) => q.question_id === "low_commitment_intervention"
  )!;

  assert.ok(lowCommitmentQuestion);
  assert.equal(isQuestionVisible(lowCommitmentQuestion, { commitment_score: 9 }), false);
  assert.equal(isQuestionVisible(lowCommitmentQuestion, { commitment_score: 7 }), false);
  assert.equal(isQuestionVisible(lowCommitmentQuestion, { commitment_score: 5 }), true);
});

test("Conditional Visibility: evaluates includes for outcome types", () => {
  const cvQuestion = PROGRESS_BUILDER_QUESTIONS.find((q) => q.question_id === "has_updated_cv")!;
  assert.ok(cvQuestion);

  assert.equal(isQuestionVisible(cvQuestion, { target_outcome_type: "freelancing" }), false);
  assert.equal(isQuestionVisible(cvQuestion, { target_outcome_type: "employment" }), true);
});

test("Section Validation: enforces required questions and validation rules", () => {
  const section1Id = "section_present_position";
  const emptyValidation = validateSectionAnswers(section1Id, {});
  assert.equal(emptyValidation.valid, false);
  assert.ok(Object.keys(emptyValidation.errors).length > 0);

  // Partial answer with invalid length
  const partialAnswers = {
    current_status: "employed_fulltime",
    dissatisfaction_area: "low_income",
    recent_improvement_attempts: "Too short", // minLength: 10
    primary_blocker: "poor_time_management",
    clarity_rating: 4,
    consistency_rating: 5
  };

  const check = validateSectionAnswers(section1Id, partialAnswers);
  assert.equal(check.valid, false);
  assert.ok(check.errors.recent_improvement_attempts);

  // Valid answers
  const validAnswers = {
    ...partialAnswers,
    recent_improvement_attempts: "Studied Python every evening and applied to internships"
  };

  const validCheck = validateSectionAnswers(section1Id, validAnswers);
  assert.equal(validCheck.valid, true);
  assert.equal(Object.keys(validCheck.errors).length, 0);
});

test("Completion Percentage: calculates 0% for empty and reaches 100% when all visible questions answered", () => {
  assert.equal(calculateCompletionPercentage({}), 0);

  const mockAllAnswers: Record<string, any> = {};
  for (const q of PROGRESS_BUILDER_QUESTIONS) {
    if (q.input_type === "yes_no") {
      mockAllAnswers[q.question_id] = true;
    } else if (q.input_type === "rating_scale") {
      mockAllAnswers[q.question_id] = 8;
    } else if (q.input_type === "multiple_choice") {
      mockAllAnswers[q.question_id] = [q.options?.[0]?.value || "test"];
    } else if (q.input_type === "single_choice") {
      mockAllAnswers[q.question_id] = q.options?.[0]?.value || "test";
    } else {
      mockAllAnswers[q.question_id] = "Valid answer text for testing completion";
    }
  }

  const pct = calculateCompletionPercentage(mockAllAnswers);
  assert.equal(pct, 100);
});
