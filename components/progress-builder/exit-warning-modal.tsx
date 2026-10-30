"use client";

import { AlertCircle, ArrowRight, Save } from "lucide-react";

type ExitWarningModalProps = {
  isOpen: boolean;
  completionPercentage: number;
  onContinue: () => void;
  onSaveAndLeave: () => void;
};

export function ExitWarningModal({
  isOpen,
  completionPercentage,
  onContinue,
  onSaveAndLeave
}: ExitWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="pbModalOverlay" role="dialog" aria-modal="true" aria-labelledby="pb-exit-title">
      <div className="pbModalCard">
        <div className="pbModalIconWrap">
          <AlertCircle size={32} className="pbModalIcon" aria-hidden="true" />
        </div>

        <h2 id="pb-exit-title" className="pbModalTitle">
          You’re closer than you think.
        </h2>

        <p className="pbModalMessage">
          You have already completed <strong>{completionPercentage}%</strong> of your 90-day assessment.
          Finishing it now will help us turn your answers into a clear action plan.
          Leaving may make it easier to postpone the progress you have already started.
        </p>

        <div className="pbModalActions">
          <button
            type="button"
            className="primaryButton pbModalPrimaryBtn"
            onClick={onContinue}
          >
            Continue My Assessment
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="secondaryButton pbModalSecondaryBtn"
            onClick={onSaveAndLeave}
          >
            <Save size={16} aria-hidden="true" />
            Save and Leave
          </button>
        </div>
      </div>
    </div>
  );
}
