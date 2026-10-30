import { validateAiPlanOutput } from "./ai-schema";
import { AMI_PLAN_SYSTEM_PROMPT, buildParticipantAssessmentPrompt, PROMPT_VERSION } from "./prompt";
import type { AiPlanOutput, WeeklyPlanItem } from "./types";

export interface AiPlanProvider {
  name: string;
  generatePlan(
    participantName: string | null,
    answers: Record<string, any>
  ): Promise<{ plan: AiPlanOutput; provider: string; model: string }>;
}

/**
 * Deterministic generator that produces a rich, realistic, fully personalized 12-week plan
 * based directly on the participant's specific assessment answers.
 */
export class DeterministicMockProvider implements AiPlanProvider {
  name = "deterministic_mock";

  async generatePlan(
    participantName: string | null,
    answers: Record<string, any>
  ): Promise<{ plan: AiPlanOutput; provider: string; model: string }> {
    const skill = answers.target_skill_name || "Modern Practical Skills & Applied Projects";
    const status = answers.current_status || "Career transition";
    const hours = answers.weekly_hours_capacity || "10_to_15";
    const day30 = answers.day_30_milestone_project || "Foundational proof-of-concept project";
    const day60 = answers.day_60_milestone_project || "Intermediate full-stack / multi-feature prototype";
    const day90 = answers.day_90_capstone_project || "Complete production-ready capstone project with public case study";
    const first24 = answers.first_24_hour_action || "Set up local workspace and complete Module 1 onboarding";
    const accountabilityPerson = answers.accountability_partner || "Align Mindset accountability community";
    const location = answers.physical_work_location || "Dedicated quiet desk space";
    const metric = answers.measurable_90_day_metric || "3 completed public projects with live deployments";
    const primaryOutcome = answers.target_outcome_type || "skill_development";
    const commitment = Number(answers.commitment_score || 8);

    const weeklyMinutes = hours === "20_plus" ? 120 : hours === "15_to_20" ? 90 : hours === "10_to_15" ? 60 : 45;

    // Generate all 12 weeks
    const weeklyPlan: WeeklyPlanItem[] = [
      {
        week_number: 1,
        primary_focus: `Foundations & Environment Setup for ${skill}`,
        learning_target: "Master core syntax, development tools, and mental models",
        practice_target: "Complete 5 small hands-on drills and configure local workspace",
        deliverable: "Working development environment and initial GitHub repository initialized",
        opportunity_action: "Research 5 industry leaders in this field and review their public portfolios",
        review_question: "Did I protect my daily practice window without skipping two days in a row?"
      },
      {
        week_number: 2,
        primary_focus: "Core Mechanics and Problem Decomposition",
        learning_target: "Deep dive into core primitives and structural patterns",
        practice_target: "Build 3 isolated component or logic exercises",
        deliverable: "First public code commit demonstrating core logic execution",
        opportunity_action: "Update LinkedIn headline to reflect target skill track",
        review_question: "Where did I hesitate or get stuck, and how did I break the blocker down?"
      },
      {
        week_number: 3,
        primary_focus: "Building Under Guidance (Guided Mini-Project)",
        learning_target: "Understand end-to-end project workflow from blank canvas to completion",
        practice_target: "Rebuild an existing industry solution from scratch with personal adaptations",
        deliverable: "Functional prototype of Milestone 1 component",
        opportunity_action: "Document one technical breakthrough in a short public note or tweet",
        review_question: "Am I coding and building more than passively watching tutorials?"
      },
      {
        week_number: 4,
        primary_focus: `Milestone 1 Completion: ${day30}`,
        learning_target: "Polishing, error handling, responsive adaptation, and basic documentation",
        practice_target: "Code cleanup, user testing, and deployment to a live URL",
        deliverable: `Day 30 Project live and published: ${day30}`,
        opportunity_action: "Share Milestone 1 demo with accountability partner and request candid critique",
        review_question: "Did I ship my Day 30 project on time, and what does the feedback tell me?"
      },
      {
        week_number: 5,
        primary_focus: "Intermediate Architecture and State Management",
        learning_target: "Learn data flow, asynchronous operations, or advanced tooling",
        practice_target: "Implement complex data fetching and error states in isolated modules",
        deliverable: "Architecture diagram and database / state flow for Milestone 2",
        opportunity_action: "Identify 3 companies or freelance niches where this capability is sought",
        review_question: "Is my daily routine feeling more habitual or still draining?"
      },
      {
        week_number: 6,
        primary_focus: "Building for Others (User-Centered Realism)",
        learning_target: "Incorporate authentic user feedback, edge cases, and accessibility",
        practice_target: "Build core feature set for the Day 60 project",
        deliverable: "Alpha version of Day 60 project with functional interactive flow",
        opportunity_action: "Reach out to 1 practitioner for a 15-minute asynchronous portfolio feedback request",
        review_question: "Have I fallen into perfectionism, or am I keeping momentum moving forward?"
      },
      {
        week_number: 7,
        primary_focus: "Integration and Robustness",
        learning_target: "API integration, performance optimization, and clean refactoring",
        practice_target: "Stress-test project under slow connection or edge cases",
        deliverable: "Beta release of Day 60 project running on staging",
        opportunity_action: "Draft a comprehensive case study outlining problem, process, and solution",
        review_question: "How well did I protect my emergency minimum on my hardest day this week?"
      },
      {
        week_number: 8,
        primary_focus: `Milestone 2 Completion: ${day60}`,
        learning_target: "Final polish, documentation, README writing, and demo recording",
        practice_target: "Create a 90-second video demo explaining the project architecture",
        deliverable: `Day 60 Project complete and live: ${day60}`,
        opportunity_action: "Post project walkthrough on LinkedIn / professional profile",
        review_question: "What did I learn building Milestone 2 that will make the Capstone smoother?"
      },
      {
        week_number: 9,
        primary_focus: `Capstone Architecture: ${day90}`,
        learning_target: "Design system, business logic, and professional standards for flagship work",
        practice_target: "Build foundational scaffold and database schema for Day 90 capstone",
        deliverable: "Live repository and core features of Capstone Project in progress",
        opportunity_action: "Revise CV and portfolio layout to feature Milestones 1 and 2 prominently",
        review_question: "Is the capstone focused on solving a real problem rather than generic fluff?"
      },
      {
        week_number: 10,
        primary_focus: "Capstone Feature Completion & Real Data",
        learning_target: "Security, performance audit, and production deployment pipeline",
        practice_target: "Complete remaining user flows and polish UI/UX micro-interactions",
        deliverable: "Fully functional version of Capstone Project undergoing user testing",
        opportunity_action: "Begin warm networking outreach to 5 professionals in the target field",
        review_question: "Did I stay within scope to guarantee a high-quality finish by Day 90?"
      },
      {
        week_number: 11,
        primary_focus: "Packaging Proof of Competence",
        learning_target: "Technical storytelling, metrics extraction, and case study writing",
        practice_target: "Write detailed case study with before/after diagrams, screenshots, and live demo links",
        deliverable: "Complete public case study and polished portfolio presentation",
        opportunity_action: "Submit 3 tailored applications or send 3 customized client proposals with project proof",
        review_question: "Can an outsider look at my work and instantly verify my skill within 30 seconds?"
      },
      {
        week_number: 12,
        primary_focus: `Capstone Launch & 90-Day Review: ${metric}`,
        learning_target: "Reviewing 90-day progress, identifying next leverage point, and solidifying identity",
        practice_target: "Live public launch of Capstone Project and distribution across networks",
        deliverable: `Final 90-Day Capstone Project shipped: ${day90}`,
        opportunity_action: "Hold formal review with accountability partner and celebrate completion",
        review_question: "How has my identity changed over the last 90 days, and what is my next 90-day target?"
      }
    ];

    const plan: AiPlanOutput = {
      participant_summary: {
        current_situation: `Currently in ${status.replace(/_/g, " ")}. Seeking clear direction and practical consistency.`,
        primary_challenge: answers.dissatisfaction_area
          ? String(answers.dissatisfaction_area).replace(/_/g, " ")
          : "Overcoming inconsistency and building credible project proof",
        strengths: answers.existing_skills
          ? [String(answers.existing_skills), "Natural curiosity and willingness to practice"]
          : ["Persistent curiosity", "Practical interest in building"],
        constraints: [
          `Weekly capacity: ${hours.replace(/_/g, " ")} hours`,
          `Device & connection: ${String(answers.primary_hardware_device || "Personal laptop")} with ${String(answers.internet_reliability || "Standard data")}`
        ],
        motivation: answers.why_it_matters
          ? String(answers.why_it_matters)
          : "Desire for purposeful growth, financial stability, and self-mastery",
        commitment_score: commitment
      },
      recommended_direction: {
        ninety_day_destination: `A confident, competent practitioner in ${skill} with 3 verified public projects, an updated portfolio, and active market outreach.`,
        primary_skill: skill,
        reason_for_recommendation: `Aligns directly with your interest in ${skill}, your capacity of ${hours.replace(/_/g, " ")} hours weekly, and your desire to create visible proof of work.`,
        alternative_direction_if_needed: "Adjacent technical or digital operations track if primary hardware demands require pivot.",
        assumptions: [
          `Assumes participant protects their designated time window daily.`,
          `Assumes minimum internet access for project deployments and resource downloads.`,
          `Assumes adherence to non-zero minimum on exceptionally busy days.`
        ]
      },
      learning_plan: {
        main_course: {
          title: answers.existing_course_details
            ? String(answers.existing_course_details).slice(0, 80)
            : `Comprehensive Curriculum: Practical ${skill}`,
          provider: "Open Source / Curated Industry Standard Curriculum",
          url: "https://alignmindset.org/resources",
          estimated_duration: "80 – 120 hours of applied study & building",
          certificate_available: Boolean(answers.has_existing_course)
        },
        supporting_resources: [
          "Official documentation and API reference guides",
          "Align Mindset Initiative Systems & Daily Habit Framework",
          "Public GitHub open-source repositories for code review and best practices"
        ],
        course_completion_deadline: "Day 60 (with remaining 30 days dedicated to Capstone & Outreach)"
      },
      daily_system: {
        daily_learning_minutes: Math.round(weeklyMinutes * 0.4),
        daily_practice_minutes: Math.round(weeklyMinutes * 0.6),
        days_per_week: Number(answers.working_days_per_week || 6),
        preferred_time: String(answers.daily_protected_window || "Early morning").replace(/_/g, " "),
        preferred_location: location,
        minimum_action_on_busy_days: String(answers.emergency_minimum_action || "15 minutes of reviewing notes or committing 1 small fix"),
        distractions_to_control: Array.isArray(answers.primary_distractions)
          ? answers.primary_distractions.map((d: string) => d.replace(/_/g, " "))
          : ["Social media phone notifications", "Mindless evening browsing"],
        recovery_rule: answers.missed_day_recovery_rule
          ? String(answers.missed_day_recovery_rule).replace(/_/g, " ")
          : "Never miss twice in a row — next day session is non-negotiable"
      },
      milestones: {
        first_24_hour_action: first24,
        day_30_project: day30,
        day_60_project: day60,
        day_90_project: day90,
        certificate_target: answers.has_existing_course
          ? "Complete primary curriculum evaluation"
          : "Proof of competence through 3 deployed public projects"
      },
      evidence_and_portfolio: {
        weekly_output_requirement: answers.weekly_evidence_output
          ? String(answers.weekly_evidence_output).replace(/_/g, " ")
          : "Weekly GitHub commits, deployed demo link, and short learning log",
        portfolio_location: Array.isArray(answers.public_portfolio_location)
          ? answers.public_portfolio_location.join(", ")
          : "GitHub & Personal Website",
        feedback_sources: [
          "Align Mindset community accountability partners",
          "Senior practitioners via social / community critique channels"
        ],
        proof_of_progress: [
          "Milestone 1 public code repository and deployed preview",
          "Milestone 2 intermediate multi-feature application",
          "Milestone 3 flagship capstone with comprehensive case study"
        ]
      },
      opportunity_plan: {
        target_opportunities: [
          `Target: ${primaryOutcome.replace(/_/g, " ")} in ${skill}`,
          "Internships, junior contractor roles, or verified freelance client projects"
        ],
        weekly_application_target: 3,
        networking_actions: [
          "Follow and engage thoughtfully with 10 senior practitioners in your target domain",
          "Attend 1 virtual community tech / career meetup monthly"
        ],
        visibility_actions: [
          "Publish 1 short technical lesson or project breakthrough every two weeks on LinkedIn",
          "Document lessons learned and share demo videos"
        ],
        cv_actions: [
          "Restructure CV around project outcomes, technologies used, and measurable results"
        ],
        linkedin_actions: [
          "Update headline, summary, and featured section with direct links to live projects"
        ],
        portfolio_actions: [
          "Ensure each project has a clear README with problem statement, tech stack, and live demo link"
        ]
      },
      accountability: {
        accountability_person: accountabilityPerson.replace(/_/g, " "),
        weekly_review_day: answers.review_cadence
          ? String(answers.review_cadence).replace(/_/g, " ")
          : "Weekly Sunday evening",
        check_in_method: "Weekly asynchronous evidence check-in with project links and reflection note",
        evidence_required: "Live link, commit log, or screen demo showing what was built that week",
        response_to_missed_commitments: "Conduct honest post-mortem, reset environment, and do an emergency 20-min session the next morning"
      },
      weekly_plan: weeklyPlan,
      risks_and_interventions: [
        {
          risk: "Mid-way loss of motivation or tutorial-hell stagnation (Weeks 4–6)",
          recommended_intervention:
            "Enforce project-first rule: never watch a tutorial without immediately writing code in a separate window."
        },
        {
          risk: "Busy work or family emergency disrupting daily schedule",
          recommended_intervention:
            "Activate emergency minimum: protect 15 minutes of low-friction review rather than taking zero action."
        },
        {
          risk: "Imposter syndrome preventing public sharing of work",
          recommended_intervention:
            "Frame work as 'notes from a learner' rather than claiming expert authority. Share what you learned today."
        }
      ],
      closing_guidance:
        "Consistency compounds. You do not need 8 uninterrupted hours a day to make life-changing progress. Protect your daily window, build in public, and never allow one bad day to turn into a lost month.",
      disclaimer:
        "Align Mindset Initiative provides personalized development frameworks, systems, and practical roadmaps. AMI does not guarantee employment, income, certification, or commercial outcomes."
    };

    return {
      plan,
      provider: this.name,
      model: "deterministic-v1"
    };
  }
}

/**
 * External LLM Provider (OpenAI, Anthropic, or Gemini)
 */
export class ExternalLlmProvider implements AiPlanProvider {
  name: string;
  private apiKey: string;
  private providerType: "openai" | "anthropic" | "gemini";

  constructor(providerType: "openai" | "anthropic" | "gemini", apiKey: string) {
    this.providerType = providerType;
    this.apiKey = apiKey;
    this.name = `${providerType}_llm`;
  }

  async generatePlan(
    participantName: string | null,
    answers: Record<string, any>
  ): Promise<{ plan: AiPlanOutput; provider: string; model: string }> {
    const userPrompt = buildParticipantAssessmentPrompt(participantName, answers);

    let rawJson = "";
    let modelName = "";

    if (this.providerType === "openai") {
      modelName = process.env.OPENAI_MODEL || "gpt-4o";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelName,
          temperature: 0.3,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: AMI_PLAN_SYSTEM_PROMPT },
            { role: "user", content: userPrompt }
          ]
        })
      });

      if (!res.ok) {
        throw new Error(`OpenAI API returned status ${res.status}: ${await res.text()}`);
      }

      const json = await res.json();
      rawJson = json.choices?.[0]?.message?.content || "";
    } else if (this.providerType === "gemini") {
      modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: AMI_PLAN_SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: { response_mime_type: "application/json", temperature: 0.3 }
        })
      });

      if (!res.ok) {
        throw new Error(`Gemini API returned status ${res.status}: ${await res.text()}`);
      }

      const json = await res.json();
      rawJson = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } else if (this.providerType === "anthropic") {
      modelName = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelName,
          max_tokens: 4096,
          temperature: 0.3,
          system: AMI_PLAN_SYSTEM_PROMPT,
          messages: [{ role: "user", content: userPrompt }]
        })
      });

      if (!res.ok) {
        throw new Error(`Anthropic API returned status ${res.status}: ${await res.text()}`);
      }

      const json = await res.json();
      rawJson = json.content?.[0]?.text || "";
    }

    // Parse and validate
    let parsed: any;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      // Try stripping markdown fences
      const match = rawJson.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) {
        parsed = JSON.parse(match[1]);
      } else {
        throw new Error("Failed to parse JSON response from AI provider.");
      }
    }

    const validation = validateAiPlanOutput(parsed);
    if (!validation.valid || !validation.sanitizedPlan) {
      throw new Error(`AI generated plan failed schema validation: ${validation.errors.join(", ")}`);
    }

    return {
      plan: validation.sanitizedPlan,
      provider: this.name,
      model: modelName
    };
  }
}

export function getAiPlanProvider(): AiPlanProvider {
  if (process.env.OPENAI_API_KEY) {
    return new ExternalLlmProvider("openai", process.env.OPENAI_API_KEY);
  }
  if (process.env.GEMINI_API_KEY) {
    return new ExternalLlmProvider("gemini", process.env.GEMINI_API_KEY);
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return new ExternalLlmProvider("anthropic", process.env.ANTHROPIC_API_KEY);
  }
  return new DeterministicMockProvider();
}
