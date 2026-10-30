import { NextResponse } from "next/server";
import { recordAssessmentEvent } from "@/lib/progress-builder/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { assessmentId, eventType, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ ok: false, error: "eventType is required." }, { status: 400 });
    }

    await recordAssessmentEvent(assessmentId || null, eventType, metadata || {});
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message }, { status: 500 });
  }
}
