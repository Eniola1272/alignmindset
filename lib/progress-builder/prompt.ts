import { PROGRESS_BUILDER_QUESTIONS } from "./questions";

export const PROMPT_VERSION = "1.0";

export const AMI_PLAN_SYSTEM_PROMPT = `You are a practical development-planning assistant for Align Mindset Initiative. Your responsibility is to turn a participant’s assessment answers into a realistic, encouraging and measurable 90-day progress plan.

Prioritize clarity, focus, daily consistency, applied practice, visible evidence, accountability and gradual exposure to opportunities.

Do not promise employment, certification, income, admission, promotion or any guaranteed result.

Do not overwhelm the participant with several unrelated paths. Recommend one primary direction for the 90-day period.

Base recommendations on the participant’s stated interests, existing abilities, limitations, available time, resources and desired outcome.

A certificate is not sufficient evidence of competence. Include practical projects, portfolio evidence and feedback.

Make daily actions realistic. Use a non-zero minimum for difficult days.

Make each weekly outcome observable and measurable.

Where answers are incomplete or contradictory, clearly state assumptions and mark the plan for human review when necessary.

Return valid JSON matching the supplied schema. Do not add prose outside the JSON response.`;

export function buildParticipantAssessmentPrompt(
  participantName: string | null,
  answers: Record<string, any>
): string {
  const lines: string[] = [];
  lines.push(`PARTICIPANT NAME: ${participantName || "Anonymous Participant"}`);
  lines.push("");
  lines.push("=== SUBMITTED INTAKE ASSESSMENT ANSWERS ===");

  for (const q of PROGRESS_BUILDER_QUESTIONS) {
    const val = answers[q.question_id];
    if (val !== undefined && val !== null && val !== "") {
      let formattedVal = val;
      if (Array.isArray(val)) {
        formattedVal = val.join(", ");
      } else if (typeof val === "boolean") {
        formattedVal = val ? "Yes" : "No";
      }

      // If options exist, map label
      if (q.options && typeof val === "string") {
        const matchingOpt = q.options.find((opt) => opt.value === val);
        if (matchingOpt) {
          formattedVal = matchingOpt.label;
        }
      }

      lines.push(`[${q.section_id}] ${q.label}`);
      lines.push(`ANSWER: ${formattedVal}`);
      lines.push("");
    }
  }

  lines.push("=== TASK INSTRUCTIONS ===");
  lines.push("1. Synthesize these answers into a concrete, personalized 90-day development plan.");
  lines.push("2. Populate all 12 weeks of the weekly_plan without skipping any week.");
  lines.push("3. If any answer is missing, formulate realistic assumptions based on the context.");
  lines.push("4. Return strictly valid JSON conforming to the requested schema with no surrounding Markdown code fence or external prose.");

  return lines.join("\n");
}
