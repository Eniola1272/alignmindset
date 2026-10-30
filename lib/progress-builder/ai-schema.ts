import type { AiPlanOutput, WeeklyPlanItem } from "./types";

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  sanitizedPlan?: AiPlanOutput;
};

export function validateAiPlanOutput(data: any): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Data is null or not a valid object."] };
  }

  // Check participant_summary
  if (!data.participant_summary || typeof data.participant_summary !== "object") {
    errors.push("Missing participant_summary object.");
  } else {
    if (typeof data.participant_summary.current_situation !== "string") {
      errors.push("participant_summary.current_situation must be a string.");
    }
    if (typeof data.participant_summary.primary_challenge !== "string") {
      errors.push("participant_summary.primary_challenge must be a string.");
    }
    if (!Array.isArray(data.participant_summary.strengths)) {
      errors.push("participant_summary.strengths must be an array.");
    }
    if (!Array.isArray(data.participant_summary.constraints)) {
      errors.push("participant_summary.constraints must be an array.");
    }
    if (typeof data.participant_summary.motivation !== "string") {
      errors.push("participant_summary.motivation must be a string.");
    }
  }

  // Check recommended_direction
  if (!data.recommended_direction || typeof data.recommended_direction !== "object") {
    errors.push("Missing recommended_direction object.");
  } else {
    if (typeof data.recommended_direction.ninety_day_destination !== "string") {
      errors.push("recommended_direction.ninety_day_destination must be a string.");
    }
    if (typeof data.recommended_direction.primary_skill !== "string") {
      errors.push("recommended_direction.primary_skill must be a string.");
    }
    if (typeof data.recommended_direction.reason_for_recommendation !== "string") {
      errors.push("recommended_direction.reason_for_recommendation must be a string.");
    }
    if (!Array.isArray(data.recommended_direction.assumptions)) {
      errors.push("recommended_direction.assumptions must be an array.");
    }
  }

  // Check learning_plan
  if (!data.learning_plan || typeof data.learning_plan !== "object") {
    errors.push("Missing learning_plan object.");
  } else {
    if (!data.learning_plan.main_course || typeof data.learning_plan.main_course !== "object") {
      errors.push("learning_plan.main_course must be an object.");
    } else {
      if (typeof data.learning_plan.main_course.title !== "string") {
        errors.push("learning_plan.main_course.title must be a string.");
      }
    }
    if (!Array.isArray(data.learning_plan.supporting_resources)) {
      errors.push("learning_plan.supporting_resources must be an array.");
    }
  }

  // Check daily_system
  if (!data.daily_system || typeof data.daily_system !== "object") {
    errors.push("Missing daily_system object.");
  } else {
    if (typeof data.daily_system.daily_learning_minutes !== "number") {
      errors.push("daily_system.daily_learning_minutes must be a number.");
    }
    if (typeof data.daily_system.days_per_week !== "number") {
      errors.push("daily_system.days_per_week must be a number.");
    }
  }

  // Check milestones
  if (!data.milestones || typeof data.milestones !== "object") {
    errors.push("Missing milestones object.");
  } else {
    if (typeof data.milestones.first_24_hour_action !== "string") {
      errors.push("milestones.first_24_hour_action must be a string.");
    }
    if (typeof data.milestones.day_30_project !== "string") {
      errors.push("milestones.day_30_project must be a string.");
    }
    if (typeof data.milestones.day_60_project !== "string") {
      errors.push("milestones.day_60_project must be a string.");
    }
    if (typeof data.milestones.day_90_project !== "string") {
      errors.push("milestones.day_90_project must be a string.");
    }
  }

  // Check weekly_plan (must have 12 weeks)
  if (!Array.isArray(data.weekly_plan)) {
    errors.push("weekly_plan must be an array.");
  } else if (data.weekly_plan.length < 12) {
    errors.push(`weekly_plan must contain all 12 weeks (got ${data.weekly_plan.length}).`);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Ensure normalized structure
  const sanitizedPlan: AiPlanOutput = {
    participant_summary: {
      current_situation: String(data.participant_summary.current_situation || ""),
      primary_challenge: String(data.participant_summary.primary_challenge || ""),
      strengths: Array.isArray(data.participant_summary.strengths)
        ? data.participant_summary.strengths.map(String)
        : [],
      constraints: Array.isArray(data.participant_summary.constraints)
        ? data.participant_summary.constraints.map(String)
        : [],
      motivation: String(data.participant_summary.motivation || ""),
      commitment_score: Number(data.participant_summary.commitment_score || 8)
    },
    recommended_direction: {
      ninety_day_destination: String(data.recommended_direction.ninety_day_destination || ""),
      primary_skill: String(data.recommended_direction.primary_skill || ""),
      reason_for_recommendation: String(data.recommended_direction.reason_for_recommendation || ""),
      alternative_direction_if_needed: String(
        data.recommended_direction.alternative_direction_if_needed || ""
      ),
      assumptions: Array.isArray(data.recommended_direction.assumptions)
        ? data.recommended_direction.assumptions.map(String)
        : []
    },
    learning_plan: {
      main_course: {
        title: String(data.learning_plan?.main_course?.title || ""),
        provider: String(data.learning_plan?.main_course?.provider || ""),
        url: String(data.learning_plan?.main_course?.url || ""),
        estimated_duration: String(data.learning_plan?.main_course?.estimated_duration || ""),
        certificate_available: Boolean(data.learning_plan?.main_course?.certificate_available)
      },
      supporting_resources: Array.isArray(data.learning_plan?.supporting_resources)
        ? data.learning_plan.supporting_resources.map(String)
        : [],
      course_completion_deadline: String(data.learning_plan?.course_completion_deadline || "")
    },
    daily_system: {
      daily_learning_minutes: Number(data.daily_system?.daily_learning_minutes || 45),
      daily_practice_minutes: Number(data.daily_system?.daily_practice_minutes || 45),
      days_per_week: Number(data.daily_system?.days_per_week || 6),
      preferred_time: String(data.daily_system?.preferred_time || "Early morning"),
      preferred_location: String(data.daily_system?.preferred_location || "Dedicated desk"),
      minimum_action_on_busy_days: String(data.daily_system?.minimum_action_on_busy_days || "15 mins of review"),
      distractions_to_control: Array.isArray(data.daily_system?.distractions_to_control)
        ? data.daily_system.distractions_to_control.map(String)
        : [],
      recovery_rule: String(data.daily_system?.recovery_rule || "Never miss twice in a row")
    },
    milestones: {
      first_24_hour_action: String(data.milestones?.first_24_hour_action || ""),
      day_30_project: String(data.milestones?.day_30_project || ""),
      day_60_project: String(data.milestones?.day_60_project || ""),
      day_90_project: String(data.milestones?.day_90_project || ""),
      certificate_target: String(data.milestones?.certificate_target || "")
    },
    evidence_and_portfolio: {
      weekly_output_requirement: String(data.evidence_and_portfolio?.weekly_output_requirement || ""),
      portfolio_location: String(data.evidence_and_portfolio?.portfolio_location || "GitHub & Portfolio"),
      feedback_sources: Array.isArray(data.evidence_and_portfolio?.feedback_sources)
        ? data.evidence_and_portfolio.feedback_sources.map(String)
        : [],
      proof_of_progress: Array.isArray(data.evidence_and_portfolio?.proof_of_progress)
        ? data.evidence_and_portfolio.proof_of_progress.map(String)
        : []
    },
    opportunity_plan: {
      target_opportunities: Array.isArray(data.opportunity_plan?.target_opportunities)
        ? data.opportunity_plan.target_opportunities.map(String)
        : [],
      weekly_application_target: Number(data.opportunity_plan?.weekly_application_target || 3),
      networking_actions: Array.isArray(data.opportunity_plan?.networking_actions)
        ? data.opportunity_plan.networking_actions.map(String)
        : [],
      visibility_actions: Array.isArray(data.opportunity_plan?.visibility_actions)
        ? data.opportunity_plan.visibility_actions.map(String)
        : [],
      cv_actions: Array.isArray(data.opportunity_plan?.cv_actions)
        ? data.opportunity_plan.cv_actions.map(String)
        : [],
      linkedin_actions: Array.isArray(data.opportunity_plan?.linkedin_actions)
        ? data.opportunity_plan.linkedin_actions.map(String)
        : [],
      portfolio_actions: Array.isArray(data.opportunity_plan?.portfolio_actions)
        ? data.opportunity_plan.portfolio_actions.map(String)
        : []
    },
    accountability: {
      accountability_person: String(data.accountability?.accountability_person || "Accountability Partner"),
      weekly_review_day: String(data.accountability?.weekly_review_day || "Sunday evening"),
      check_in_method: String(data.accountability?.check_in_method || "WhatsApp / Email evidence"),
      evidence_required: String(data.accountability?.evidence_required || "Weekly project links & commits"),
      response_to_missed_commitments: String(data.accountability?.response_to_missed_commitments || "Reset next morning")
    },
    weekly_plan: (data.weekly_plan as WeeklyPlanItem[]).slice(0, 12).map((w, idx) => ({
      week_number: idx + 1,
      primary_focus: String(w.primary_focus || `Week ${idx + 1} Foundation`),
      learning_target: String(w.learning_target || ""),
      practice_target: String(w.practice_target || ""),
      deliverable: String(w.deliverable || ""),
      opportunity_action: String(w.opportunity_action || ""),
      review_question: String(w.review_question || "")
    })),
    risks_and_interventions: Array.isArray(data.risks_and_interventions)
      ? data.risks_and_interventions.map((item: any) => ({
          risk: String(item?.risk || ""),
          recommended_intervention: String(item?.recommended_intervention || "")
        }))
      : [],
    closing_guidance: String(data.closing_guidance || "Stay consistent and protect your daily focus window."),
    disclaimer: String(
      data.disclaimer ||
        "Align Mindset Initiative provides personalized guidance and systems. AMI does not guarantee employment, income, certification or specific corporate results."
    )
  };

  return { valid: true, errors: [], sanitizedPlan };
}
