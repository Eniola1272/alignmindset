import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { getAiPlanProvider } from "@/lib/progress-builder/ai-provider";
import {
  getAssessmentWithPlan,
  getBuilderSettings,
  saveOrUpdatePlan
} from "@/lib/progress-builder/db";

export async function POST(req: Request) {
  try {
    const isAuthed = await isAdminAuthenticated();
    if (!isAuthed) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { assessmentId } = body;

    if (!assessmentId) {
      return NextResponse.json(
        { ok: false, error: "assessmentId is required." },
        { status: 400 }
      );
    }

    const { assessment, answers } = await getAssessmentWithPlan(assessmentId);
    if (!assessment) {
      return NextResponse.json(
        { ok: false, error: "Assessment not found." },
        { status: 404 }
      );
    }

    const provider = getAiPlanProvider();
    const { plan, provider: providerName, model } = await provider.generatePlan(
      assessment.participant_name,
      answers
    );

    const settings = await getBuilderSettings();
    const updatedPlan = await saveOrUpdatePlan(
      assessmentId,
      plan,
      providerName,
      model,
      "1.0",
      !settings.require_human_review
    );

    return NextResponse.json({
      ok: true,
      plan: updatedPlan
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to generate plan." },
      { status: 500 }
    );
  }
}
