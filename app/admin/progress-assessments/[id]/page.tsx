import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  Target,
  User
} from "lucide-react";
import { AdminReviewPanel } from "@/components/progress-builder/admin-review-panel";
import { getAssessmentWithPlan } from "@/lib/progress-builder/db";
import {
  PROGRESS_BUILDER_QUESTIONS,
  PROGRESS_BUILDER_SECTIONS
} from "@/lib/progress-builder/questions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminSubmissionDetailPage({ params }: PageProps) {
  const { id: assessmentId } = await params;
  const { assessment, answers, plan } = await getAssessmentWithPlan(assessmentId);

  if (!assessment) {
    notFound();
  }

  const p = plan?.plan_json;

  return (
    <div className="adminSubmissionDetailPage">
      <div className="adminDetailBack">
        <Link href="/admin/progress-assessments" className="adminBackLink">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to All Submissions</span>
        </Link>
      </div>

      {/* Header Info Banner */}
      <header className="adminDetailHeader">
        <div className="adminDetailHeaderLeft">
          <span className="adminDetailEyebrow">Intake Assessment Details</span>
          <h1 className="adminDetailTitle">
            {assessment.participant_name || "Anonymous Participant"}
          </h1>
          <p className="adminDetailMeta">
            Email: <strong>{assessment.email || "No email provided"}</strong> | Started:{" "}
            {new Date(assessment.started_at).toLocaleDateString()} | Submitted:{" "}
            {assessment.submitted_at
              ? new Date(assessment.submitted_at).toLocaleString()
              : "In progress"}
          </p>
        </div>

        <div className="adminDetailHeaderRight">
          <span className={`adminStatusBadge is-${assessment.status}`}>
            Status: {assessment.status.replace(/_/g, " ")}
          </span>
        </div>
      </header>

      {/* Admin Action and Review Panel */}
      <AdminReviewPanel
        assessment={assessment}
        initialPlan={plan}
        reviewerEmail="admin@alignmindset.org"
      />

      {/* Generated 90-Day Plan Viewer (if plan exists) */}
      {p ? (
        <section className="adminPlanReviewSection">
          <div className="adminSubSectionHeader">
            <Sparkles size={20} className="adminSparkleIcon" aria-hidden="true" />
            <h2>Synthesized 90-Day Blueprint ({plan?.model_provider} / {plan?.model_name})</h2>
          </div>

          <div className="adminPlanSummaryCard">
            <div className="adminPlanField">
              <span className="adminFieldLabel">90-Day Destination</span>
              <p className="adminFieldValue isHighlight">
                {p.recommended_direction.ninety_day_destination}
              </p>
            </div>

            <div className="adminPlanField">
              <span className="adminFieldLabel">Primary Skill Recommended</span>
              <p className="adminFieldValue">{p.recommended_direction.primary_skill}</p>
            </div>

            <div className="adminPlanField">
              <span className="adminFieldLabel">Strategic Rationale</span>
              <p className="adminFieldValue">
                {p.recommended_direction.reason_for_recommendation}
              </p>
            </div>

            {p.recommended_direction.assumptions?.length ? (
              <div className="adminPlanField">
                <span className="adminFieldLabel">Model Assumptions & Guardrails</span>
                <ul className="adminAssumptionsList">
                  {p.recommended_direction.assumptions.map((ass: string, i: number) => (
                    <li key={i}>{ass}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Milestones Card */}
          <div className="adminMilestonesSummary">
            <h3>Milestone Projects</h3>
            <div className="adminMilestonesRow">
              <div className="adminMilestoneItem">
                <span>First 24-Hour Action</span>
                <strong>{p.milestones.first_24_hour_action}</strong>
              </div>
              <div className="adminMilestoneItem">
                <span>Day 30 Project</span>
                <strong>{p.milestones.day_30_project}</strong>
              </div>
              <div className="adminMilestoneItem">
                <span>Day 60 Project</span>
                <strong>{p.milestones.day_60_project}</strong>
              </div>
              <div className="adminMilestoneItem">
                <span>Day 90 Capstone</span>
                <strong>{p.milestones.day_90_project}</strong>
              </div>
            </div>
          </div>

          {/* 12-Week Roadmap Accordion / Summary */}
          <div className="adminWeeksTableWrap">
            <h3>12-Week Execution Plan</h3>
            <table className="adminWeeksTable">
              <thead>
                <tr>
                  <th>Wk</th>
                  <th>Focus & Learning Target</th>
                  <th>Practice Target</th>
                  <th>Weekly Deliverable</th>
                </tr>
              </thead>
              <tbody>
                {p.weekly_plan.map((w) => (
                  <tr key={w.week_number}>
                    <td className="adminWkNum">W{w.week_number}</td>
                    <td>
                      <strong>{w.primary_focus}</strong>
                      <div className="adminSubTarget">{w.learning_target}</div>
                    </td>
                    <td>{w.practice_target}</td>
                    <td className="adminDeliverableCell">{w.deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* Submitted Intake Answers Section */}
      <section className="adminAnswersSection">
        <div className="adminSubSectionHeader">
          <FileCheck size={20} aria-hidden="true" />
          <h2>Submitted Intake Answers (10 Sections)</h2>
        </div>

        <div className="adminSectionsAccordion">
          {PROGRESS_BUILDER_SECTIONS.map((section) => {
            const sectionQuestions = PROGRESS_BUILDER_QUESTIONS.filter(
              (q) => q.section_id === section.id
            );

            return (
              <details key={section.id} className="adminSectionDetail" open={section.number <= 2}>
                <summary className="adminSectionSummary">
                  <span>
                    Section {section.number}: {section.title}
                  </span>
                  <span className="adminQuestionCount">
                    {sectionQuestions.length} questions
                  </span>
                </summary>

                <div className="adminQuestionsBody">
                  {sectionQuestions.map((q) => {
                    const ans = answers[q.question_id];
                    let displayAns = "No answer recorded";

                    if (ans !== undefined && ans !== null && ans !== "") {
                      if (Array.isArray(ans)) {
                        displayAns = ans.join(", ");
                      } else if (typeof ans === "boolean") {
                        displayAns = ans ? "Yes" : "No";
                      } else {
                        displayAns = String(ans);
                      }
                    }

                    return (
                      <div key={q.question_id} className="adminQuestionItem">
                        <span className="adminQuestionText">{q.label}</span>
                        <div className="adminAnswerText">{displayAns}</div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
