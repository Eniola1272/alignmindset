import { NextResponse } from "next/server";
import { getAiPlanProvider } from "@/lib/progress-builder/ai-provider";
import {
  getAssessmentWithPlan,
  getBuilderSettings,
  saveAssessmentDraft,
  saveOrUpdatePlan,
  submitAssessment
} from "@/lib/progress-builder/db";
import {
  PROGRESS_BUILDER_SECTIONS,
  validateSectionAnswers
} from "@/lib/progress-builder/questions";
import { isResendConfigured, sendResendEmail } from "@/lib/resend";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { assessmentId, participantName, email, consentGiven, answers } = body;

    if (!assessmentId) {
      return NextResponse.json(
        { ok: false, error: "Assessment ID is required." },
        { status: 400 }
      );
    }

    if (!participantName || !participantName.trim()) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name so we can personalize your plan." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "A valid email address is required to receive your plan." },
        { status: 400 }
      );
    }

    if (!consentGiven) {
      return NextResponse.json(
        {
          ok: false,
          error: "You must consent to Align Mindset Initiative processing your answers to generate your plan."
        },
        { status: 400 }
      );
    }

    // Validate all sections
    const sectionErrors: Record<string, any> = {};
    for (const section of PROGRESS_BUILDER_SECTIONS) {
      const validation = validateSectionAnswers(section.id, answers);
      if (!validation.valid) {
        sectionErrors[section.id] = validation.errors;
      }
    }

    if (Object.keys(sectionErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Some required questions are incomplete.",
          sectionErrors
        },
        { status: 422 }
      );
    }

    // Save final answers state
    await saveAssessmentDraft(assessmentId, 10, answers);

    // Lock submission
    const submitResult = await submitAssessment(
      assessmentId,
      participantName.trim(),
      email.trim().toLowerCase(),
      "1.0"
    );

    if (!submitResult.success) {
      return NextResponse.json(
        { ok: false, error: submitResult.message },
        { status: 409 }
      );
    }

    // Check settings
    const settings = await getBuilderSettings();
    let generatedPlan = null;
    let planError = null;

    if (settings.auto_generate_on_submit) {
      try {
        const provider = getAiPlanProvider();
        const { plan, provider: providerName, model } = await provider.generatePlan(
          participantName,
          answers
        );

        const initialVisible = !settings.require_human_review;
        generatedPlan = await saveOrUpdatePlan(
          assessmentId,
          plan,
          providerName,
          model,
          "1.0",
          initialVisible
        );
      } catch (err: any) {
        planError = err?.message || "Plan generation failed";
        console.error("AI Generation failed on submit:", err);
      }
    }

    // Send confirmation email if configured
    if (isResendConfigured() && email) {
      try {
        const planReadyText = settings.require_human_review
          ? "Our team is reviewing your assessment to ensure your 90-day trajectory is rigorous and achievable. You will receive an update once released."
          : "Your personalized 90-day progress plan has been synthesized and is ready on your dashboard.";

        await sendResendEmail({
          to: [email],
          subject: "Your Align Mindset 90-Day Assessment Has Been Received",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #171421;">
              <h2 style="color: #177b42;">Align Mindset Initiative</h2>
              <p>Hello <strong>${participantName}</strong>,</p>
              <p>Thank you for completing your 90-Day Progress Builder assessment.</p>
              <p>${planReadyText}</p>
              <p>You can track your progress and view your blueprint here:</p>
              <p><a href="${site.url}/dashboard/progress-plan?id=${assessmentId}" style="display: inline-block; padding: 12px 24px; background: #177b42; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">View My 90-Day Blueprint</a></p>
              <hr style="border: none; border-top: 1px solid #ded8ca; margin: 24px 0;" />
              <p style="font-size: 12px; color: #625f6d;">Align Mindset Initiative helps people align identity, systems, skills, and daily action.</p>
            </div>
          `
        });
      } catch (emailErr) {
        console.error("Failed to send confirmation email:", emailErr);
      }
    }

    return NextResponse.json({
      ok: true,
      assessmentId,
      planId: generatedPlan?.id,
      requiresHumanReview: settings.require_human_review,
      status: settings.require_human_review ? "needs_review" : "completed",
      planError
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Submission failed unexpectedly." },
      { status: 500 }
    );
  }
}
