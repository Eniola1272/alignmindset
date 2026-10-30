import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import {
  reviewAndReleasePlan,
  updateBuilderSettings
} from "@/lib/progress-builder/db";

export async function POST(req: Request) {
  try {
    const isAuthed = await isAdminAuthenticated();
    if (!isAuthed) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      action,
      planId,
      reviewerEmail,
      reviewerNotes,
      editedPlanJson,
      releaseToParticipant,
      requireHumanReview,
      autoGenerateOnSubmit
    } = body;

    if (action === "update_settings") {
      const updated = await updateBuilderSettings(
        Boolean(requireHumanReview),
        Boolean(autoGenerateOnSubmit)
      );
      return NextResponse.json({ ok: true, settings: updated });
    }

    if (!planId) {
      return NextResponse.json({ ok: false, error: "planId is required." }, { status: 400 });
    }

    const updated = await reviewAndReleasePlan(
      planId,
      reviewerEmail || "Align Mindset Review Team",
      reviewerNotes || null,
      editedPlanJson,
      Boolean(releaseToParticipant)
    );

    return NextResponse.json({
      ok: true,
      plan: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to process review." },
      { status: 500 }
    );
  }
}
