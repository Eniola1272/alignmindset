"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import {
  calculateCompletionPercentage,
  getVisibleQuestionsForSection,
  PROGRESS_BUILDER_QUESTIONS,
  PROGRESS_BUILDER_SECTIONS,
  validateSectionAnswers
} from "@/lib/progress-builder/questions";
import type { ProgressAssessmentRecord } from "@/lib/progress-builder/types";
import { ExitWarningModal } from "./exit-warning-modal";
import { QuestionInput } from "./question-input";

type ProgressWizardProps = {
  initialAssessment: ProgressAssessmentRecord;
  initialAnswers: Record<string, any>;
};

export function ProgressWizard({
  initialAssessment,
  initialAnswers
}: ProgressWizardProps) {
  const router = useRouter();

  const [assessmentId, setAssessmentId] = useState(initialAssessment.id);
  const [currentStep, setCurrentStep] = useState(
    Math.min(10, Math.max(1, initialAssessment.current_step || 1))
  );
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [completionPercentage, setCompletionPercentage] = useState(
    initialAssessment.completion_percentage || calculateCompletionPercentage(initialAnswers)
  );

  // Autosave status states
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("Progress saved");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Errors for current step
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  // Review step state
  const [isReviewStep, setIsReviewStep] = useState(false);
  const [participantName, setParticipantName] = useState(initialAssessment.participant_name || "");
  const [participantEmail, setParticipantEmail] = useState(initialAssessment.email || "");
  const [consentGiven, setConsentGiven] = useState(Boolean(initialAssessment.consented_at));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    assessmentId: string;
    requiresHumanReview: boolean;
  }>(null);

  // In-app exit modal state
  const [showExitModal, setShowExitModal] = useState(false);

  // Autosave debounce timer
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update completion percentage whenever answers change
  useEffect(() => {
    const pct = calculateCompletionPercentage(answers);
    setCompletionPercentage(pct);
  }, [answers]);

  // Browser beforeunload handler
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !submissionSuccess) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, submissionSuccess]);

  // Trigger debounced autosave
  const triggerAutosave = (newAnswers: Record<string, any>, step: number) => {
    setHasUnsavedChanges(true);
    setSaveStatus("saving");

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/progress-builder/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assessmentId,
            currentStep: step,
            answers: newAnswers
          })
        });

        if (!res.ok) throw new Error("Autosave response not OK");

        const data = await res.json();
        setSaveStatus("saved");
        setLastSavedTime("Progress saved");
        setHasUnsavedChanges(false);
        if (data.completionPercentage !== undefined) {
          setCompletionPercentage(data.completionPercentage);
        }
      } catch (err) {
        console.error("Autosave error:", err);
        setSaveStatus("error");
      }
    }, 1500);
  };

  const handleAnswerChange = (questionId: string, val: any) => {
    const updated = { ...answers, [questionId]: val };
    setAnswers(updated);

    // Clear validation error on change
    if (stepErrors[questionId]) {
      const copy = { ...stepErrors };
      delete copy[questionId];
      setStepErrors(copy);
    }

    triggerAutosave(updated, currentStep);
  };

  const currentSection = PROGRESS_BUILDER_SECTIONS[currentStep - 1];
  const visibleQuestions = getVisibleQuestionsForSection(currentSection.id, answers);

  const handleNextStep = () => {
    // Validate current step
    const validation = validateSectionAnswers(currentSection.id, answers);
    if (!validation.valid) {
      setStepErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`q-card-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStepErrors({});
    if (currentStep < 10) {
      const next = currentStep + 1;
      setCurrentStep(next);
      triggerAutosave(answers, next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsReviewStep(true);
      triggerAutosave(answers, 10);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (isReviewStep) {
      setIsReviewStep(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setStepErrors({});
      triggerAutosave(answers, prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!participantName.trim()) {
      alert("Please provide your name.");
      return;
    }

    if (!participantEmail.trim() || !participantEmail.includes("@")) {
      alert("Please provide a valid email address.");
      return;
    }

    if (!consentGiven) {
      alert("Please accept the consent terms before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/progress-builder/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId,
          participantName,
          email: participantEmail,
          consentGiven,
          answers
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed. Please check required fields.");
      }

      setSubmissionSuccess({
        assessmentId: data.assessmentId,
        requiresHumanReview: Boolean(data.requiresHumanReview)
      });
      setHasUnsavedChanges(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      alert(err?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estimated minutes remaining (10 sections total)
  const remainingSteps = 10 - currentStep;
  const estimatedMinsRemaining = Math.max(1, remainingSteps * 2);

  // If successfully submitted, show confirmation view
  if (submissionSuccess) {
    return (
      <div className="pbSuccessContainer">
        <div className="pbSuccessCard">
          <div className="pbSuccessIconWrap">
            <CheckCircle2 size={42} className="pbSuccessIcon" aria-hidden="true" />
          </div>

          <h1 className="pbSuccessTitle">Your Assessment Has Been Submitted</h1>

          <p className="pbSuccessText">
            Thank you, <strong>{participantName}</strong>. Your answers have been securely recorded.
            {submissionSuccess.requiresHumanReview ? (
              <>
                {" "}Our mentorship team is reviewing your assessment to ensure your 12-week roadmap,
                daily systems, and projects are realistic and high-leverage.
              </>
            ) : (
              <>
                {" "}Your customized 90-day progress blueprint has been synthesized and is now available.
              </>
            )}
          </p>

          <div className="pbSuccessActionBox">
            <Link
              href={`/dashboard/progress-plan?id=${submissionSuccess.assessmentId}`}
              className="primaryButton pbSuccessCta"
            >
              <Sparkles size={18} aria-hidden="true" />
              View My 90-Day Blueprint
            </Link>

            <Link href="/" className="secondaryButton pbSuccessSecondaryBtn">
              Return to Align Mindset Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pbWizardWrapper">
      {/* Top sticky progress header */}
      <div className="pbWizardHeader">
        <div className="shell pbWizardHeaderInner">
          <div className="pbHeaderLeft">
            <button
              type="button"
              className="pbBackLink"
              onClick={() => {
                if (currentStep > 1 || isReviewStep) {
                  handlePrevStep();
                } else {
                  setShowExitModal(true);
                }
              }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>{isReviewStep ? "Back to Step 10" : currentStep > 1 ? "Previous" : "Exit"}</span>
            </button>

            <div className="pbStepMeta">
              <span className="pbStepBadge">
                {isReviewStep ? "Review & Confirmation" : `Step ${currentStep} of 10`}
              </span>
              <span className="pbTimeEstimate">
                <Clock size={14} aria-hidden="true" />
                ~{isReviewStep ? "1 min" : `${estimatedMinsRemaining} mins`}
              </span>
            </div>
          </div>

          <div className="pbHeaderRight">
            {/* Autosave status indicator */}
            <div className={`pbSaveIndicator is-${saveStatus}`} role="status">
              {saveStatus === "saving" ? (
                <>
                  <Loader2 size={14} className="pbSpinner" aria-hidden="true" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === "error" ? (
                <button
                  type="button"
                  className="pbRetryBtn"
                  onClick={() => triggerAutosave(answers, currentStep)}
                >
                  <RefreshCw size={14} aria-hidden="true" />
                  <span>Save failed — retry</span>
                </button>
              ) : (
                <>
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>{lastSavedTime}</span>
                </>
              )}
            </div>

            <button
              type="button"
              className="pbSaveLeaveBtn"
              onClick={() => setShowExitModal(true)}
            >
              Save & Leave
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="pbProgressBarTrack" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="pbProgressBarFill"
            style={{ width: `${Math.max(5, completionPercentage)}%` }}
          />
        </div>
      </div>

      {/* Main Form Body */}
      <div className="shell pbWizardBody">
        {!isReviewStep ? (
          <div className="pbStepSection">
            <div className="pbSectionHeader">
              <span className="pbSectionSubtitle">{currentSection.subtitle}</span>
              <h1 className="pbSectionTitle">{currentSection.title}</h1>
              <p className="pbSectionDescription">{currentSection.description}</p>
            </div>

            <div className="pbQuestionsList">
              {visibleQuestions.map((q) => (
                <QuestionInput
                  key={q.question_id}
                  question={q}
                  value={answers[q.question_id]}
                  error={stepErrors[q.question_id]}
                  onChange={(val) => handleAnswerChange(q.question_id, val)}
                />
              ))}
            </div>

            <div className="pbNavActions">
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="secondaryButton pbPrevBtn"
                  onClick={handlePrevStep}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                className="primaryButton pbNextBtn"
                onClick={handleNextStep}
              >
                {currentStep === 10 ? "Review My Assessment" : "Save & Continue"}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          /* Review and Submit Screen */
          <div className="pbReviewSection">
            <div className="pbSectionHeader">
              <span className="pbSectionSubtitle">Final Step</span>
              <h1 className="pbSectionTitle">Review & Generate Your 90-Day Plan</h1>
              <p className="pbSectionDescription">
                Confirm your answers below. Once submitted, our AI engine synthesizes your custom plan
                with actionable 12-week milestones, daily schedules, and project deliverables.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="pbSubmitForm">
              <div className="pbReviewDetailsCard">
                <h2 className="pbReviewSummaryTitle">Participant Information</h2>

                <div className="pbFormRow">
                  <div className="pbFormField">
                    <label htmlFor="participantName">Your Full Name *</label>
                    <input
                      id="participantName"
                      type="text"
                      required
                      placeholder="e.g. Eniola Balogun"
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                    />
                  </div>

                  <div className="pbFormField">
                    <label htmlFor="participantEmail">Your Email Address *</label>
                    <input
                      id="participantEmail"
                      type="email"
                      required
                      placeholder="e.g. eniola@example.com"
                      value={participantEmail}
                      onChange={(e) => setParticipantEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pbAnswersRecap">
                  <h3>Assessment Snapshot</h3>
                  <div className="pbRecapGrid">
                    <div className="pbRecapItem">
                      <span className="pbRecapLabel">Target Skill</span>
                      <span className="pbRecapValue">
                        {answers.target_skill_name || "General Practical Skill"}
                      </span>
                    </div>
                    <div className="pbRecapItem">
                      <span className="pbRecapLabel">Target Outcome</span>
                      <span className="pbRecapValue">
                        {String(answers.target_outcome_type || "Skill Development").replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="pbRecapItem">
                      <span className="pbRecapLabel">Weekly Hours</span>
                      <span className="pbRecapValue">
                        {String(answers.weekly_hours_capacity || "10 to 15").replace(/_/g, " ")} hrs/wk
                      </span>
                    </div>
                    <div className="pbRecapItem">
                      <span className="pbRecapLabel">Day 90 Capstone</span>
                      <span className="pbRecapValue">
                        {answers.day_90_capstone_project || "Public capstone project"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pbConsentBox">
                  <div className="pbPrivacyNote">
                    <ShieldCheck size={18} className="pbShieldIcon" aria-hidden="true" />
                    <span>
                      <strong>Privacy Assurance:</strong> Your answers are strictly private and used
                      solely to construct your development plan.
                    </span>
                  </div>

                  <label className="pbConsentLabel">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      required
                    />
                    <span>
                      I consent to Align Mindset Initiative processing my answers to create a personalized
                      90-day development plan. I understand that the plan provides guidance and does not
                      guarantee employment, income, certification or any specific outcome.
                    </span>
                  </label>
                </div>
              </div>

              <div className="pbNavActions">
                <button
                  type="button"
                  className="secondaryButton pbPrevBtn"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Edit Answers
                </button>

                <button
                  type="submit"
                  className="primaryButton pbSubmitBtn"
                  disabled={isSubmitting || !consentGiven}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="pbSpinner" aria-hidden="true" />
                      Synthesizing Your 90-Day Blueprint...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} aria-hidden="true" />
                      Build My 90-Day Progress Plan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Exit Warning Modal */}
      <ExitWarningModal
        isOpen={showExitModal}
        completionPercentage={completionPercentage}
        onContinue={() => setShowExitModal(false)}
        onSaveAndLeave={() => {
          setShowExitModal(false);
          router.push("/");
        }}
      />
    </div>
  );
}
