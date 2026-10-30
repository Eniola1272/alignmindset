import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { getAssessmentWithPlan } from "@/lib/progress-builder/db";
import { generatePlanDocx } from "@/lib/progress-builder/docx-generator";
import { generatePlanPdf } from "@/lib/progress-builder/pdf-generator";
import { getExistingTokenHash } from "@/lib/progress-builder/session";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: assessmentId } = await params;
    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "pdf";

    const { assessment, plan } = await getAssessmentWithPlan(assessmentId);

    if (!assessment || !plan) {
      return NextResponse.json(
        { ok: false, error: "Assessment or generated plan not found." },
        { status: 404 }
      );
    }

    // Authorization check
    const tokenHash = await getExistingTokenHash();
    const isAdmin = await isAdminAuthenticated();
    const isOwner = tokenHash && assessment.anonymous_token_hash === tokenHash;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { ok: false, error: "Access denied. You do not have permission to view this document." },
        { status: 403 }
      );
    }

    // Participant visibility check
    if (!isAdmin && !plan.participant_visible) {
      return NextResponse.json(
        {
          ok: false,
          error: "This plan is currently undergoing human review by the Align Mindset team and has not yet been released."
        },
        { status: 403 }
      );
    }

    const safeName = (assessment.participant_name || "Participant")
      .replace(/[^a-zA-Z0-9]/g, "_");
    const filenameBase = `AMI_90Day_Plan_${safeName}`;

    if (format === "json") {
      return new NextResponse(JSON.stringify(plan.plan_json, null, 2), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${filenameBase}.json"`
        }
      });
    }

    if (format === "docx") {
      const docxBuffer = await generatePlanDocx(
        assessment.participant_name,
        plan.plan_json
      );

      return new Response(new Blob([Uint8Array.from(docxBuffer)]), {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${filenameBase}.docx"`
        }
      });
    }

    // PDF default
    const pdfBytes = await generatePlanPdf(
      assessment.participant_name,
      plan.plan_json
    );

    return new Response(new Blob([pdfBytes as any]), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filenameBase}.pdf"`
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to generate document." },
      { status: 500 }
    );
  }
}
