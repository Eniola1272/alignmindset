import { NextResponse } from "next/server";
import {
  getOrCreateAssessment,
  saveAssessmentDraft
} from "@/lib/progress-builder/db";
import { getOrCreateAnonymousToken } from "@/lib/progress-builder/session";

export async function GET() {
  try {
    const { tokenHash } = await getOrCreateAnonymousToken();
    const { assessment, answers } = await getOrCreateAssessment(tokenHash);

    return NextResponse.json({
      ok: true,
      assessment,
      answers
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to retrieve draft." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { assessmentId, currentStep, answers } = body;

    if (!assessmentId || typeof currentStep !== "number" || !answers) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload parameters." },
        { status: 400 }
      );
    }

    const { success, completionPercentage } = await saveAssessmentDraft(
      assessmentId,
      currentStep,
      answers
    );

    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Could not save draft. Assessment may already be submitted." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      ok: true,
      completionPercentage,
      lastSavedAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to save draft." },
      { status: 500 }
    );
  }
}
