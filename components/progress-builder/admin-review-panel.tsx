"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  Save,
  Send,
  Sparkles
} from "lucide-react";
import type { ProgressAssessmentRecord, ProgressPlanRecord } from "@/lib/progress-builder/types";

type AdminReviewPanelProps = {
  assessment: ProgressAssessmentRecord;
  initialPlan: ProgressPlanRecord | null;
  reviewerEmail: string;
};

export function AdminReviewPanel({
  assessment,
  initialPlan,
  reviewerEmail
}: AdminReviewPanelProps) {
  const router = useRouter();
  const [plan, setPlan] = useState<ProgressPlanRecord | null>(initialPlan);
  const [reviewerNotes, setReviewerNotes] = useState(initialPlan?.reviewer_notes || "");
  const [isEditingJson, setIsEditingJson] = useState(false);
  const [jsonText, setJsonText] = useState(
    initialPlan ? JSON.stringify(initialPlan.plan_json, null, 2) : ""
  );

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleRegenerate = async () => {
    if (!confirm("Regenerate plan? This will synthesize a new plan with the AI provider.")) {
      return;
    }

    setIsLoading(true);
    setStatusMessage("Synthesizing plan with AI provider...");

    try {
      const res = await fetch("/api/progress-builder/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId: assessment.id })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Regeneration failed.");

      setPlan(data.plan);
      setJsonText(JSON.stringify(data.plan.plan_json, null, 2));
      setStatusMessage("Plan regenerated successfully!");
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Failed to regenerate plan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!plan) return;
    setIsLoading(true);

    try {
      let parsedJson = undefined;
      if (isEditingJson) {
        parsedJson = JSON.parse(jsonText);
      }

      const res = await fetch("/api/progress-builder/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          reviewerEmail,
          reviewerNotes,
          editedPlanJson: parsedJson,
          releaseToParticipant: false
        })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to save.");

      setPlan(data.plan);
      setStatusMessage("Reviewer notes and edits saved.");
      setIsEditingJson(false);
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Failed to save notes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReleaseToParticipant = async () => {
    if (!plan) return;

    if (
      !confirm(
        "Release this 90-day plan to the participant? They will immediately be able to view and download their blueprint."
      )
    ) {
      return;
    }

    setIsLoading(true);

    try {
      let parsedJson = undefined;
      if (isEditingJson) {
        parsedJson = JSON.parse(jsonText);
      }

      const res = await fetch("/api/progress-builder/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          reviewerEmail,
          reviewerNotes,
          editedPlanJson: parsedJson,
          releaseToParticipant: true
        })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to release.");

      setPlan(data.plan);
      setStatusMessage("Plan successfully released to the participant!");
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Failed to release plan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="adminReviewPanelCard">
      <div className="adminReviewHeader">
        <div>
          <h3>Mentorship Review & Action</h3>
          <p>
            Reviewer: <strong>{reviewerEmail}</strong>
            {plan?.reviewed_at ? ` | Last reviewed: ${new Date(plan.reviewed_at).toLocaleString()}` : ""}
          </p>
        </div>

        <div className="adminReviewStatusBadgeWrap">
          {plan?.participant_visible ? (
            <span className="adminStatusBadge isCompleted">
              <CheckCircle2 size={14} aria-hidden="true" />
              Released to Participant
            </span>
          ) : (
            <span className="adminStatusBadge isReview">
              <AlertCircle size={14} aria-hidden="true" />
              Private / Under Review
            </span>
          )}
        </div>
      </div>

      {statusMessage ? (
        <div className="adminSuccessAlert" role="status">
          <CheckCircle2 size={16} aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="adminActionButtonsRow">
        <button
          type="button"
          className="secondaryButton adminBtnSm"
          onClick={handleRegenerate}
          disabled={isLoading}
        >
          <RefreshCw size={14} aria-hidden="true" />
          Regenerate AI Plan
        </button>

        <button
          type="button"
          className="secondaryButton adminBtnSm"
          onClick={() => setIsEditingJson(!isEditingJson)}
        >
          <FileText size={14} aria-hidden="true" />
          {isEditingJson ? "Close JSON Editor" : "Edit Plan JSON"}
        </button>

        <a
          href={`/api/progress-builder/document/${assessment.id}?format=pdf`}
          className="secondaryButton adminBtnSm"
          target="_blank"
          rel="noreferrer"
        >
          <Download size={14} aria-hidden="true" />
          Download PDF
        </a>

        <a
          href={`/api/progress-builder/document/${assessment.id}?format=docx`}
          className="secondaryButton adminBtnSm"
          target="_blank"
          rel="noreferrer"
        >
          <Download size={14} aria-hidden="true" />
          Download DOCX
        </a>

        <a
          href={`/api/progress-builder/document/${assessment.id}?format=json`}
          className="secondaryButton adminBtnSm"
          target="_blank"
          rel="noreferrer"
        >
          Download JSON
        </a>
      </div>

      {/* In-place JSON Editor */}
      {isEditingJson ? (
        <div className="adminJsonEditBox">
          <label htmlFor="planJsonArea">Structured Plan JSON (Editable)</label>
          <textarea
            id="planJsonArea"
            rows={12}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
        </div>
      ) : null}

      {/* Reviewer Private Notes */}
      <div className="adminNotesField">
        <label htmlFor="reviewerNotes">Private Reviewer Notes (Internal only)</label>
        <textarea
          id="reviewerNotes"
          rows={3}
          placeholder="Notes about specific advice, recommended adjustments, or follow-up check-ins..."
          value={reviewerNotes}
          onChange={(e) => setReviewerNotes(e.target.value)}
        />
      </div>

      {/* Final Action Controls */}
      <div className="adminReviewFooterActions">
        <button
          type="button"
          className="secondaryButton"
          onClick={handleSaveNotes}
          disabled={isLoading}
        >
          <Save size={16} aria-hidden="true" />
          Save Notes
        </button>

        {!plan?.participant_visible ? (
          <button
            type="button"
            className="primaryButton adminReleaseBtn"
            onClick={handleReleaseToParticipant}
            disabled={isLoading || !plan}
          >
            {isLoading ? (
              <Loader2 size={16} className="pbSpinner" aria-hidden="true" />
            ) : (
              <Send size={16} aria-hidden="true" />
            )}
            Release Plan to Participant
          </button>
        ) : (
          <button
            type="button"
            className="secondaryButton"
            onClick={handleReleaseToParticipant}
            disabled={isLoading}
          >
            Update Released Plan
          </button>
        )}
      </div>
    </div>
  );
}
