import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Download,
  FileCheck,
  FileText,
  Flame,
  HelpCircle,
  Hourglass,
  Layers,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target
} from "lucide-react";
import { getAssessmentWithPlan, getOrCreateAssessment } from "@/lib/progress-builder/db";
import { getExistingTokenHash } from "@/lib/progress-builder/session";

export const metadata: Metadata = {
  title: "My 90-Day Progress Plan | Align Mindset Initiative",
  description: "View and execute your personalized Align Mindset 90-Day Progress Plan."
};

type PageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ParticipantPlanPage({ searchParams }: PageProps) {
  const { id: queryId } = await searchParams;
  let assessmentId = queryId;

  if (!assessmentId) {
    const tokenHash = await getExistingTokenHash();
    if (tokenHash) {
      const { assessment } = await getOrCreateAssessment(tokenHash);
      assessmentId = assessment.id;
    }
  }

  if (!assessmentId) {
    return (
      <div className="shell pbPlanPageContainer">
        <div className="pbEmptyCard">
          <Compass size={36} className="pbEmptyIcon" aria-hidden="true" />
          <h2>No Assessment Found</h2>
          <p>You have not started an intake assessment yet.</p>
          <Link href="/progress-builder" className="primaryButton">
            Start My 90-Day Assessment
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const { assessment, plan } = await getAssessmentWithPlan(assessmentId);

  if (!assessment) {
    return (
      <div className="shell pbPlanPageContainer">
        <div className="pbEmptyCard">
          <h2>Assessment Not Found</h2>
          <p>We could not find an assessment associated with this link.</p>
          <Link href="/progress-builder" className="primaryButton">
            Start a New Assessment
          </Link>
        </div>
      </div>
    );
  }

  // State 1: Incomplete Draft
  if (assessment.status === "draft") {
    return (
      <div className="shell pbPlanPageContainer">
        <div className="pbStatusCard isDraft">
          <div className="pbStatusHeader">
            <span className="pbStatusPill isDraft">Draft In Progress</span>
            <span className="pbStatusProgress">{assessment.completion_percentage}% completed</span>
          </div>

          <h1 className="pbStatusTitle">Your 90-Day Assessment is Waiting</h1>
          <p className="pbStatusText">
            You began your assessment on {new Date(assessment.started_at).toLocaleDateString()}.
            Resume now to turn your answers into a clear, individualized 90-day action plan.
          </p>

          <div className="pbStatusActions">
            <Link
              href="/progress-builder?resume=true"
              className="primaryButton pbResumeBtn"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Resume Assessment from Step {assessment.current_step}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Under Review or Generating
  const isAwaitingRelease = !plan || !plan.participant_visible;

  if (isAwaitingRelease) {
    return (
      <div className="shell pbPlanPageContainer">
        <div className="pbStatusCard isReview">
          <div className="pbStatusHeader">
            <span className="pbStatusPill isReview">
              <Hourglass size={14} className="pbSpinSlow" aria-hidden="true" />
              Under Mentorship Review
            </span>
          </div>

          <h1 className="pbStatusTitle">Your Assessment Has Been Received</h1>
          <p className="pbStatusText">
            Thank you, <strong>{assessment.participant_name}</strong>. Our team is carefully reviewing your
            responses to verify your daily systems, project milestones, and primary direction.
          </p>

          <div className="pbReviewInfoBox">
            <CheckCircle2 size={18} className="pbCheckIcon" aria-hidden="true" />
            <span>
              Your plan will be released here as soon as human review is complete. You will also receive an
              email notification at <strong>{assessment.email}</strong>.
            </span>
          </div>

          <div className="pbStatusActions">
            <Link href="/" className="secondaryButton">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Released Plan View
  const p = plan.plan_json;

  return (
    <div className="shell pbPlanPageContainer">
      {/* Blueprint Header */}
      <header className="pbPlanHeader">
        <div className="pbPlanBadge">
          <Sparkles size={16} aria-hidden="true" />
          <span>Active 90-Day Blueprint</span>
        </div>

        <h1 className="pbPlanMainTitle">
          {assessment.participant_name ? `${assessment.participant_name}’s` : "Your"} 90-Day Development Blueprint
        </h1>

        <p className="pbPlanDestination">
          <strong>90-Day Target:</strong> {p.recommended_direction.ninety_day_destination}
        </p>

        {/* Download Action Buttons */}
        <div className="pbPlanDownloadBar">
          <a
            href={`/api/progress-builder/document/${assessment.id}?format=pdf`}
            className="primaryButton pbDownloadPdfBtn"
            download
          >
            <Download size={16} aria-hidden="true" />
            Download PDF Blueprint
          </a>

          <a
            href={`/api/progress-builder/document/${assessment.id}?format=docx`}
            className="secondaryButton pbDownloadDocxBtn"
            download
          >
            <FileText size={16} aria-hidden="true" />
            Download Word (DOCX)
          </a>

          <a
            href={`/api/progress-builder/document/${assessment.id}?format=json`}
            className="secondaryButton pbDownloadJsonBtn"
            download
          >
            Download JSON
          </a>
        </div>
      </header>

      {/* Immediate 24-Hour Callout */}
      <section className="pbImmediateActionBox">
        <div className="pbActionIconWrap">
          <Flame size={24} aria-hidden="true" />
        </div>
        <div className="pbActionTextWrap">
          <span className="pbActionEyebrow">First Action Within 24 Hours</span>
          <h2 className="pbActionHeading">{p.milestones.first_24_hour_action}</h2>
          <p>
            Do not let another day pass without momentum. Complete this single step today to activate
            your commitment.
          </p>
        </div>
      </section>

      {/* Milestones Grid */}
      <section className="pbPlanSection">
        <h2 className="pbSectionHeaderTitle">
          <Target size={20} aria-hidden="true" />
          Project Milestones & Deliverables
        </h2>

        <div className="pbMilestonesGrid">
          <div className="pbMilestoneCard">
            <span className="pbMilestoneTag">Day 30 Milestone</span>
            <h3>{p.milestones.day_30_project}</h3>
            <p className="pbMilestoneDesc">Foundational proof of concept demonstrating core mechanics.</p>
          </div>

          <div className="pbMilestoneCard">
            <span className="pbMilestoneTag">Day 60 Milestone</span>
            <h3>{p.milestones.day_60_project}</h3>
            <p className="pbMilestoneDesc">Intermediate full-feature solution solving a real user challenge.</p>
          </div>

          <div className="pbMilestoneCard isCapstone">
            <span className="pbMilestoneTag isCapstoneTag">Day 90 Capstone</span>
            <h3>{p.milestones.day_90_project}</h3>
            <p className="pbMilestoneDesc">Flagship public project backed by a detailed case study.</p>
          </div>
        </div>
      </section>

      {/* Daily Progress System */}
      <section className="pbPlanSection">
        <h2 className="pbSectionHeaderTitle">
          <Clock size={20} aria-hidden="true" />
          Your Daily Progress System
        </h2>

        <div className="pbSystemGrid">
          <div className="pbSystemCard">
            <span className="pbSystemLabel">Daily Practice Breakdown</span>
            <p className="pbSystemValue">
              {p.daily_system.daily_learning_minutes} mins study + {p.daily_system.daily_practice_minutes} mins building ({p.daily_system.days_per_week} days/week)
            </p>
          </div>

          <div className="pbSystemCard">
            <span className="pbSystemLabel">Protected Window & Location</span>
            <p className="pbSystemValue">
              {p.daily_system.preferred_time} at {p.daily_system.preferred_location}
            </p>
          </div>

          <div className="pbSystemCard">
            <span className="pbSystemLabel">Emergency Minimum on Busy Days</span>
            <p className="pbSystemValue">{p.daily_system.minimum_action_on_busy_days}</p>
          </div>

          <div className="pbSystemCard">
            <span className="pbSystemLabel">Non-Negotiable Recovery Rule</span>
            <p className="pbSystemValue">{p.daily_system.recovery_rule}</p>
          </div>
        </div>
      </section>

      {/* 12-Week Progression Timeline */}
      <section className="pbPlanSection">
        <h2 className="pbSectionHeaderTitle">
          <Calendar size={20} aria-hidden="true" />
          12-Week Execution Roadmap
        </h2>

        <div className="pbWeeksTimeline">
          {p.weekly_plan.map((week) => (
            <div key={week.week_number} className="pbWeekCard">
              <div className="pbWeekHeader">
                <span className="pbWeekPill">Week {week.week_number}</span>
                <h3 className="pbWeekTitle">{week.primary_focus}</h3>
              </div>

              <div className="pbWeekDetailsGrid">
                <div className="pbWeekCol">
                  <span className="pbColLabel">Learning Target</span>
                  <p>{week.learning_target}</p>
                </div>

                <div className="pbWeekCol">
                  <span className="pbColLabel">Practice Drill</span>
                  <p>{week.practice_target}</p>
                </div>

                <div className="pbWeekCol isDeliverable">
                  <span className="pbColLabel">Deliverable</span>
                  <p>{week.deliverable}</p>
                </div>
              </div>

              <div className="pbWeekFooter">
                <span className="pbReviewQ">
                  <strong>Sunday Review Question:</strong> {week.review_question}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phase 1 Weekly Reflection Interactive Check-in */}
      <section className="pbPlanSection">
        <h2 className="pbSectionHeaderTitle">
          <FileCheck size={20} aria-hidden="true" />
          Weekly Reflection & Evidence Check-in
        </h2>

        <div className="pbReflectionCard">
          <h3>Record Your Current Week Reflection</h3>
          <p>
            Accountability requires visible evidence. Log what you built and committed this week.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Weekly reflection recorded! Keep up the momentum.");
            }}
            className="pbReflectionForm"
          >
            <div className="pbReflectionField">
              <label htmlFor="reflection-week">Select Week</label>
              <select id="reflection-week" defaultValue="1">
                {p.weekly_plan.map((w) => (
                  <option key={w.week_number} value={w.week_number}>
                    Week {w.week_number}: {w.primary_focus}
                  </option>
                ))}
              </select>
            </div>

            <div className="pbReflectionField">
              <label htmlFor="reflection-evidence">Evidence / Project Link</label>
              <input
                id="reflection-evidence"
                type="url"
                placeholder="https://github.com/... or Figma / Loom demo link"
              />
            </div>

            <div className="pbReflectionField">
              <label htmlFor="reflection-notes">What did you complete this week?</label>
              <textarea
                id="reflection-notes"
                rows={3}
                placeholder="Summary of drills completed, lessons learned, and next week's focus..."
              />
            </div>

            <button type="submit" className="primaryButton pbSaveReflectionBtn">
              Save Weekly Reflection
            </button>
          </form>
        </div>
      </section>

      {/* Accountability and Disclaimer */}
      <footer className="pbPlanFooter">
        <div className="pbDisclaimerCard">
          <ShieldAlert size={22} aria-hidden="true" />
          <div>
            <h4>Align Mindset Commitment</h4>
            <p>{p.disclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
