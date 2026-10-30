export type AssessmentStatus =
  | "draft"
  | "submitted"
  | "processing"
  | "completed"
  | "needs_review"
  | "failed";

export type PlanGenerationStatus =
  | "pending"
  | "generating"
  | "generated"
  | "needs_review"
  | "failed"
  | "released";

export type QuestionInputType =
  | "text"
  | "textarea"
  | "single_choice"
  | "multiple_choice"
  | "rating_scale"
  | "number"
  | "time"
  | "date"
  | "yes_no"
  | "url"
  | "ranked_choice";

export type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

export type ConditionalOperator =
  | "equals"
  | "not_equals"
  | "includes"
  | "less_than"
  | "greater_than"
  | "not_empty";

export type ConditionalVisibility = {
  dependsOn: string;
  operator: ConditionalOperator;
  value?: string | number | boolean;
};

export type ValidationRules = {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customMessage?: string;
};

export type QuestionDefinition = {
  question_id: string;
  section_id: string;
  label: string;
  helper_text?: string;
  input_type: QuestionInputType;
  options?: QuestionOption[];
  required: boolean;
  display_order: number;
  conditional_visibility?: ConditionalVisibility;
  validation_rules?: ValidationRules;
  active: boolean;
  version: string;
  placeholder?: string;
};

export type SectionDefinition = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
};

export type ProgressAssessmentRecord = {
  id: string;
  user_id: string | null;
  anonymous_token_hash: string | null;
  participant_name: string | null;
  email: string | null;
  status: AssessmentStatus;
  question_version: string;
  current_step: number;
  completion_percentage: number;
  started_at: string;
  last_saved_at: string;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  consent_version: string | null;
  consented_at: string | null;
};

export type ProgressAnswerRecord = {
  id: string;
  assessment_id: string;
  question_id: string;
  answer_json: any;
  created_at: string;
  updated_at: string;
};

export type WeeklyPlanItem = {
  week_number: number;
  primary_focus: string;
  learning_target: string;
  practice_target: string;
  deliverable: string;
  opportunity_action: string;
  review_question: string;
};

export type RiskAndIntervention = {
  risk: string;
  recommended_intervention: string;
};

export type AiPlanOutput = {
  participant_summary: {
    current_situation: string;
    primary_challenge: string;
    strengths: string[];
    constraints: string[];
    motivation: string;
    commitment_score: number;
  };
  recommended_direction: {
    ninety_day_destination: string;
    primary_skill: string;
    reason_for_recommendation: string;
    alternative_direction_if_needed: string;
    assumptions: string[];
  };
  learning_plan: {
    main_course: {
      title: string;
      provider: string;
      url: string;
      estimated_duration: string;
      certificate_available: boolean;
    };
    supporting_resources: string[];
    course_completion_deadline: string;
  };
  daily_system: {
    daily_learning_minutes: number;
    daily_practice_minutes: number;
    days_per_week: number;
    preferred_time: string;
    preferred_location: string;
    minimum_action_on_busy_days: string;
    distractions_to_control: string[];
    recovery_rule: string;
  };
  milestones: {
    first_24_hour_action: string;
    day_30_project: string;
    day_60_project: string;
    day_90_project: string;
    certificate_target: string;
  };
  evidence_and_portfolio: {
    weekly_output_requirement: string;
    portfolio_location: string;
    feedback_sources: string[];
    proof_of_progress: string[];
  };
  opportunity_plan: {
    target_opportunities: string[];
    weekly_application_target: number;
    networking_actions: string[];
    visibility_actions: string[];
    cv_actions: string[];
    linkedin_actions: string[];
    portfolio_actions: string[];
  };
  accountability: {
    accountability_person: string;
    weekly_review_day: string;
    check_in_method: string;
    evidence_required: string;
    response_to_missed_commitments: string;
  };
  weekly_plan: WeeklyPlanItem[];
  risks_and_interventions: RiskAndIntervention[];
  closing_guidance: string;
  disclaimer: string;
};

export type ProgressPlanRecord = {
  id: string;
  assessment_id: string;
  generation_status: PlanGenerationStatus;
  plan_json: AiPlanOutput;
  executive_summary: string | null;
  model_provider: string | null;
  model_name: string | null;
  prompt_version: string;
  generated_at: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  participant_visible: boolean;
  created_at: string;
  updated_at: string;
};

export type ProgressAssessmentEvent = {
  id: string;
  assessment_id: string | null;
  event_type: string;
  metadata: Record<string, any>;
  created_at: string;
};

export type ProgressBuilderSettings = {
  id: string;
  require_human_review: boolean;
  auto_generate_on_submit: boolean;
  updated_at: string;
};

export type AssessmentAnalytics = {
  totalStarted: number;
  totalSubmitted: number;
  totalPlansGenerated: number;
  totalPlansReleased: number;
  awaitingReviewCount: number;
  completionRate: number;
  averageCompletionTimeMinutes: number;
  mostCommonDropOffStep: number;
  goalCategoriesDistribution: Record<string, number>;
  primaryObstaclesDistribution: Record<string, number>;
};
