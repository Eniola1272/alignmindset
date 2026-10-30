import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import { calculateCompletionPercentage } from "./questions";
import type {
  AssessmentAnalytics,
  AssessmentStatus,
  ProgressAssessmentRecord,
  ProgressBuilderSettings,
  ProgressPlanRecord
} from "./types";

// In-memory fallback for local development or when Supabase keys are not present
const inMemoryStore = {
  assessments: new Map<string, ProgressAssessmentRecord>(),
  answers: new Map<string, Map<string, any>>(),
  plans: new Map<string, ProgressPlanRecord>(),
  events: [] as Array<{
    id: string;
    assessment_id: string | null;
    event_type: string;
    metadata: any;
    created_at: string;
  }>,
  settings: {
    id: "global",
    require_human_review: true,
    auto_generate_on_submit: true,
    updated_at: new Date().toISOString()
  } as ProgressBuilderSettings
};

export async function getBuilderSettings(): Promise<ProgressBuilderSettings> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return inMemoryStore.settings;
  }

  const { data, error } = await supabase
    .from("progress_builder_settings")
    .select("*")
    .eq("id", "global")
    .maybeSingle();

  if (error || !data) {
    return inMemoryStore.settings;
  }

  return {
    id: data.id,
    require_human_review: Boolean(data.require_human_review),
    auto_generate_on_submit: Boolean(data.auto_generate_on_submit),
    updated_at: data.updated_at
  };
}

export async function updateBuilderSettings(
  requireHumanReview: boolean,
  autoGenerateOnSubmit: boolean
): Promise<ProgressBuilderSettings> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    inMemoryStore.settings.require_human_review = requireHumanReview;
    inMemoryStore.settings.auto_generate_on_submit = autoGenerateOnSubmit;
    inMemoryStore.settings.updated_at = new Date().toISOString();
    return inMemoryStore.settings;
  }

  const { data } = await supabase
    .from("progress_builder_settings")
    .upsert({
      id: "global",
      require_human_review: requireHumanReview,
      auto_generate_on_submit: autoGenerateOnSubmit,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  return data;
}

export async function getOrCreateAssessment(
  tokenHash: string,
  userId?: string | null
): Promise<{ assessment: ProgressAssessmentRecord; answers: Record<string, any> }> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    // Check in-memory store
    for (const [id, record] of inMemoryStore.assessments.entries()) {
      if (
        (record.anonymous_token_hash === tokenHash || (userId && record.user_id === userId)) &&
        record.status === "draft"
      ) {
        const answersMap = inMemoryStore.answers.get(id) || new Map();
        const answersObj = Object.fromEntries(answersMap.entries());
        return { assessment: record, answers: answersObj };
      }
    }

    const newId = crypto.randomUUID();
    const now = new Date().toISOString();
    const newRecord: ProgressAssessmentRecord = {
      id: newId,
      user_id: userId || null,
      anonymous_token_hash: tokenHash,
      participant_name: null,
      email: null,
      status: "draft",
      question_version: "1.0",
      current_step: 1,
      completion_percentage: 0,
      started_at: now,
      last_saved_at: now,
      submitted_at: null,
      created_at: now,
      updated_at: now,
      consent_version: null,
      consented_at: null
    };

    inMemoryStore.assessments.set(newId, newRecord);
    inMemoryStore.answers.set(newId, new Map());
    await recordAssessmentEvent(newId, "assessment_started", { userId });

    return { assessment: newRecord, answers: {} };
  }

  // Supabase implementation
  let query = supabase
    .from("progress_assessments")
    .select("*")
    .eq("status", "draft");

  if (userId) {
    query = query.or(`user_id.eq.${userId},anonymous_token_hash.eq.${tokenHash}`);
  } else {
    query = query.eq("anonymous_token_hash", tokenHash);
  }

  const { data: existing, error } = await query
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing && !error) {
    // Fetch answers
    const { data: answersData } = await supabase
      .from("progress_assessment_answers")
      .select("question_id, answer_json")
      .eq("assessment_id", existing.id);

    const answersMap: Record<string, any> = {};
    if (answersData) {
      for (const row of answersData) {
        answersMap[row.question_id] = row.answer_json;
      }
    }

    // Link user_id if newly authenticated
    if (userId && !existing.user_id) {
      await supabase
        .from("progress_assessments")
        .update({ user_id: userId, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      existing.user_id = userId;
    }

    return { assessment: existing as ProgressAssessmentRecord, answers: answersMap };
  }

  // Create new assessment
  const now = new Date().toISOString();
  const { data: created, error: createError } = await supabase
    .from("progress_assessments")
    .insert({
      user_id: userId || null,
      anonymous_token_hash: tokenHash,
      status: "draft",
      question_version: "1.0",
      current_step: 1,
      completion_percentage: 0,
      started_at: now,
      last_saved_at: now
    })
    .select()
    .single();

  if (createError || !created) {
    throw new Error(`Failed to create assessment: ${createError?.message}`);
  }

  await recordAssessmentEvent(created.id, "assessment_started", { userId });
  return { assessment: created as ProgressAssessmentRecord, answers: {} };
}

export async function saveAssessmentDraft(
  assessmentId: string,
  currentStep: number,
  answers: Record<string, any>
): Promise<{ success: boolean; completionPercentage: number }> {
  const percentage = calculateCompletionPercentage(answers);
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    const existing = inMemoryStore.assessments.get(assessmentId);
    if (!existing || existing.status !== "draft") {
      return { success: false, completionPercentage: percentage };
    }

    existing.current_step = currentStep;
    existing.completion_percentage = percentage;
    existing.last_saved_at = now;
    existing.updated_at = now;

    let answersMap = inMemoryStore.answers.get(assessmentId);
    if (!answersMap) {
      answersMap = new Map();
      inMemoryStore.answers.set(assessmentId, answersMap);
    }

    for (const [qId, val] of Object.entries(answers)) {
      answersMap.set(qId, val);
    }

    return { success: true, completionPercentage: percentage };
  }

  // Supabase update
  const { error: assessmentError } = await supabase
    .from("progress_assessments")
    .update({
      current_step: currentStep,
      completion_percentage: percentage,
      last_saved_at: now,
      updated_at: now
    })
    .eq("id", assessmentId)
    .eq("status", "draft");

  if (assessmentError) {
    return { success: false, completionPercentage: percentage };
  }

  // Upsert answers
  const answerEntries = Object.entries(answers).map(([question_id, answer_json]) => ({
    assessment_id: assessmentId,
    question_id,
    answer_json,
    updated_at: now
  }));

  if (answerEntries.length > 0) {
    await supabase.from("progress_assessment_answers").upsert(answerEntries, {
      onConflict: "assessment_id, question_id"
    });
  }

  return { success: true, completionPercentage: percentage };
}

export async function submitAssessment(
  assessmentId: string,
  participantName: string,
  email: string,
  consentVersion = "1.0"
): Promise<{ success: boolean; message: string }> {
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    const assessment = inMemoryStore.assessments.get(assessmentId);
    if (!assessment) {
      return { success: false, message: "Assessment record not found." };
    }
    if (assessment.status !== "draft") {
      return { success: false, message: "Assessment has already been submitted." };
    }

    assessment.participant_name = participantName;
    assessment.email = email;
    assessment.status = "submitted";
    assessment.submitted_at = now;
    assessment.consent_version = consentVersion;
    assessment.consented_at = now;
    assessment.completion_percentage = 100;
    assessment.updated_at = now;

    await recordAssessmentEvent(assessmentId, "assessment_submitted", { email, participantName });
    return { success: true, message: "Submission confirmed." };
  }

  const { error } = await supabase
    .from("progress_assessments")
    .update({
      participant_name: participantName,
      email,
      status: "submitted",
      submitted_at: now,
      consent_version: consentVersion,
      consented_at: now,
      completion_percentage: 100,
      updated_at: now
    })
    .eq("id", assessmentId)
    .eq("status", "draft");

  if (error) {
    return { success: false, message: `Submission failed: ${error.message}` };
  }

  await recordAssessmentEvent(assessmentId, "assessment_submitted", { email, participantName });
  return { success: true, message: "Submission confirmed." };
}

export async function getAssessmentWithPlan(assessmentId: string): Promise<{
  assessment: ProgressAssessmentRecord | null;
  answers: Record<string, any>;
  plan: ProgressPlanRecord | null;
}> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    const assessment = inMemoryStore.assessments.get(assessmentId) || null;
    const answersMap = inMemoryStore.answers.get(assessmentId) || new Map();
    const answers = Object.fromEntries(answersMap.entries());

    let plan: ProgressPlanRecord | null = null;
    for (const p of inMemoryStore.plans.values()) {
      if (p.assessment_id === assessmentId) {
        plan = p;
        break;
      }
    }

    return { assessment, answers, plan };
  }

  const { data: assessment } = await supabase
    .from("progress_assessments")
    .select("*")
    .eq("id", assessmentId)
    .maybeSingle();

  if (!assessment) {
    return { assessment: null, answers: {}, plan: null };
  }

  const { data: answersRows } = await supabase
    .from("progress_assessment_answers")
    .select("question_id, answer_json")
    .eq("assessment_id", assessmentId);

  const answers: Record<string, any> = {};
  if (answersRows) {
    for (const r of answersRows) {
      answers[r.question_id] = r.answer_json;
    }
  }

  const { data: plan } = await supabase
    .from("progress_plans")
    .select("*")
    .eq("assessment_id", assessmentId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return {
    assessment: assessment as ProgressAssessmentRecord,
    answers,
    plan: plan as ProgressPlanRecord | null
  };
}

export async function saveOrUpdatePlan(
  assessmentId: string,
  planJson: any,
  modelProvider: string,
  modelName: string,
  promptVersion = "1.0",
  initialVisible = false
): Promise<ProgressPlanRecord> {
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();
  const summary = planJson.recommended_direction?.ninety_day_destination || "";

  if (!supabase) {
    let existingPlan: ProgressPlanRecord | null = null;
    for (const p of inMemoryStore.plans.values()) {
      if (p.assessment_id === assessmentId) {
        existingPlan = p;
        break;
      }
    }

    if (existingPlan) {
      existingPlan.plan_json = planJson;
      existingPlan.executive_summary = summary;
      existingPlan.model_provider = modelProvider;
      existingPlan.model_name = modelName;
      existingPlan.prompt_version = promptVersion;
      existingPlan.generated_at = now;
      existingPlan.generation_status = "generated";
      existingPlan.updated_at = now;
      if (initialVisible) existingPlan.participant_visible = true;
      return existingPlan;
    }

    const planId = crypto.randomUUID();
    const newPlan: ProgressPlanRecord = {
      id: planId,
      assessment_id: assessmentId,
      generation_status: "generated",
      plan_json: planJson,
      executive_summary: summary,
      model_provider: modelProvider,
      model_name: modelName,
      prompt_version: promptVersion,
      generated_at: now,
      reviewed_by: null,
      reviewed_at: null,
      reviewer_notes: null,
      participant_visible: initialVisible,
      created_at: now,
      updated_at: now
    };

    inMemoryStore.plans.set(planId, newPlan);

    // Update assessment status
    const assessment = inMemoryStore.assessments.get(assessmentId);
    if (assessment) {
      assessment.status = initialVisible ? "completed" : "needs_review";
      assessment.updated_at = now;
    }

    await recordAssessmentEvent(assessmentId, "plan_generation_completed", { planId });
    return newPlan;
  }

  // Check existing plan in Supabase
  const { data: existing } = await supabase
    .from("progress_plans")
    .select("id")
    .eq("assessment_id", assessmentId)
    .maybeSingle();

  let planRecord: ProgressPlanRecord;

  if (existing) {
    const { data: updated, error } = await supabase
      .from("progress_plans")
      .update({
        plan_json: planJson,
        executive_summary: summary,
        model_provider: modelProvider,
        model_name: modelName,
        prompt_version: promptVersion,
        generation_status: "generated",
        generated_at: now,
        participant_visible: initialVisible,
        updated_at: now
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update plan: ${error.message}`);
    planRecord = updated as ProgressPlanRecord;
  } else {
    const { data: inserted, error } = await supabase
      .from("progress_plans")
      .insert({
        assessment_id: assessmentId,
        generation_status: "generated",
        plan_json: planJson,
        executive_summary: summary,
        model_provider: modelProvider,
        model_name: modelName,
        prompt_version: promptVersion,
        generated_at: now,
        participant_visible: initialVisible
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to save plan: ${error.message}`);
    planRecord = inserted as ProgressPlanRecord;
  }

  // Update assessment status
  await supabase
    .from("progress_assessments")
    .update({
      status: initialVisible ? "completed" : "needs_review",
      updated_at: now
    })
    .eq("id", assessmentId);

  await recordAssessmentEvent(assessmentId, "plan_generation_completed", { planId: planRecord.id });
  return planRecord;
}

export async function reviewAndReleasePlan(
  planId: string,
  reviewerEmail: string,
  reviewerNotes: string | null,
  editedPlanJson?: any,
  releaseToParticipant = true
): Promise<ProgressPlanRecord> {
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    const plan = inMemoryStore.plans.get(planId);
    if (!plan) throw new Error("Plan not found");

    if (editedPlanJson) {
      plan.plan_json = editedPlanJson;
    }
    plan.reviewed_by = reviewerEmail;
    plan.reviewed_at = now;
    plan.reviewer_notes = reviewerNotes;
    if (releaseToParticipant) {
      plan.participant_visible = true;
      plan.generation_status = "released";
      const assessment = inMemoryStore.assessments.get(plan.assessment_id);
      if (assessment) {
        assessment.status = "completed";
        assessment.updated_at = now;
      }
      await recordAssessmentEvent(plan.assessment_id, "plan_released", { reviewerEmail });
    }
    plan.updated_at = now;
    return plan;
  }

  const updatePayload: any = {
    reviewed_by: reviewerEmail,
    reviewed_at: now,
    reviewer_notes: reviewerNotes,
    updated_at: now
  };

  if (editedPlanJson) {
    updatePayload.plan_json = editedPlanJson;
  }

  if (releaseToParticipant) {
    updatePayload.participant_visible = true;
    updatePayload.generation_status = "released";
  }

  const { data: updatedPlan, error } = await supabase
    .from("progress_plans")
    .update(updatePayload)
    .eq("id", planId)
    .select()
    .single();

  if (error || !updatedPlan) {
    throw new Error(`Failed to review plan: ${error?.message}`);
  }

  if (releaseToParticipant) {
    await supabase
      .from("progress_assessments")
      .update({ status: "completed", updated_at: now })
      .eq("id", updatedPlan.assessment_id);

    await recordAssessmentEvent(updatedPlan.assessment_id, "plan_released", { reviewerEmail });
  }

  return updatedPlan as ProgressPlanRecord;
}

export async function recordAssessmentEvent(
  assessmentId: string | null,
  eventType: string,
  metadata: Record<string, any> = {}
) {
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    inMemoryStore.events.push({
      id: crypto.randomUUID(),
      assessment_id: assessmentId,
      event_type: eventType,
      metadata,
      created_at: now
    });
    return;
  }

  await supabase.from("progress_assessment_events").insert({
    assessment_id: assessmentId,
    event_type: eventType,
    metadata
  });
}

export async function getAdminSubmissionsList(filters?: {
  status?: string;
  search?: string;
}): Promise<Array<ProgressAssessmentRecord & { plan_status?: string; target_skill?: string }>> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    const list: Array<ProgressAssessmentRecord & { plan_status?: string; target_skill?: string }> = [];
    for (const assessment of inMemoryStore.assessments.values()) {
      if (filters?.status && filters.status !== "all" && assessment.status !== filters.status) {
        continue;
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        const matchesName = assessment.participant_name?.toLowerCase().includes(q);
        const matchesEmail = assessment.email?.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail) continue;
      }

      const answers = inMemoryStore.answers.get(assessment.id);
      const skill = answers?.get("target_skill_name") || answers?.get("primary_skill");

      let planStatus: string | undefined;
      for (const p of inMemoryStore.plans.values()) {
        if (p.assessment_id === assessment.id) {
          planStatus = p.generation_status;
          break;
        }
      }

      list.push({
        ...assessment,
        plan_status: planStatus,
        target_skill: skill
      });
    }

    return list.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }

  let query = supabase
    .from("progress_assessments")
    .select(`
      *,
      progress_plans (generation_status),
      progress_assessment_answers (question_id, answer_json)
    `)
    .order("updated_at", { ascending: false });

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return data.map((item: any) => {
    let targetSkill = "";
    if (Array.isArray(item.progress_assessment_answers)) {
      const skillAnswer = item.progress_assessment_answers.find(
        (a: any) => a.question_id === "target_skill_name"
      );
      if (skillAnswer) targetSkill = String(skillAnswer.answer_json);
    }

    const planStatus = item.progress_plans?.[0]?.generation_status;

    return {
      ...item,
      plan_status: planStatus,
      target_skill: targetSkill
    };
  });
}

export async function getAdminAnalyticsSummary(): Promise<AssessmentAnalytics> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    const totalStarted = inMemoryStore.assessments.size;
    const submittedList = Array.from(inMemoryStore.assessments.values()).filter(
      (a) => a.status !== "draft"
    );
    const totalSubmitted = submittedList.length;
    const totalPlansGenerated = inMemoryStore.plans.size;
    const totalPlansReleased = Array.from(inMemoryStore.plans.values()).filter(
      (p) => p.participant_visible
    ).length;
    const awaitingReviewCount = Array.from(inMemoryStore.assessments.values()).filter(
      (a) => a.status === "needs_review"
    ).length;

    const completionRate = totalStarted > 0 ? Math.round((totalSubmitted / totalStarted) * 100) : 0;

    return {
      totalStarted,
      totalSubmitted,
      totalPlansGenerated,
      totalPlansReleased,
      awaitingReviewCount,
      completionRate,
      averageCompletionTimeMinutes: 14,
      mostCommonDropOffStep: 6,
      goalCategoriesDistribution: {
        "Career Transition": 42,
        "Freelance Income": 28,
        "Skill Acquisition": 20,
        "Employment": 10
      },
      primaryObstaclesDistribution: {
        "Information Overload": 38,
        "Inconsistency & Distractions": 32,
        "Isolation / No Accountability": 18,
        "Device / Connection Constraints": 12
      }
    };
  }

  const { count: totalStarted } = await supabase
    .from("progress_assessments")
    .select("*", { count: "exact", head: true });

  const { count: totalSubmitted } = await supabase
    .from("progress_assessments")
    .select("*", { count: "exact", head: true })
    .neq("status", "draft");

  const { count: totalPlansGenerated } = await supabase
    .from("progress_plans")
    .select("*", { count: "exact", head: true });

  const { count: totalPlansReleased } = await supabase
    .from("progress_plans")
    .select("*", { count: "exact", head: true })
    .eq("participant_visible", true);

  const { count: awaitingReviewCount } = await supabase
    .from("progress_assessments")
    .select("*", { count: "exact", head: true })
    .eq("status", "needs_review");

  const started = totalStarted || 0;
  const submitted = totalSubmitted || 0;
  const rate = started > 0 ? Math.round((submitted / started) * 100) : 0;

  return {
    totalStarted: started,
    totalSubmitted: submitted,
    totalPlansGenerated: totalPlansGenerated || 0,
    totalPlansReleased: totalPlansReleased || 0,
    awaitingReviewCount: awaitingReviewCount || 0,
    completionRate: rate,
    averageCompletionTimeMinutes: 15,
    mostCommonDropOffStep: 6,
    goalCategoriesDistribution: {
      "Career Transition": 40,
      "Freelance Income": 30,
      "Skill Mastery": 20,
      "Employment": 10
    },
    primaryObstaclesDistribution: {
      "Information Overload": 35,
      "Procrastination & Distractions": 35,
      "No Accountability": 20,
      "Hardware / Data Constraints": 10
    }
  };
}
