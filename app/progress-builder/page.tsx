import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Flame,
  Layers,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target
} from "lucide-react";
import { ProgressWizard } from "@/components/progress-builder/progress-wizard";
import { getOrCreateAssessment } from "@/lib/progress-builder/db";
import { getExistingTokenHash, getOrCreateAnonymousToken } from "@/lib/progress-builder/session";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AMI 90-Day Progress Builder | Align Mindset Initiative",
  description:
    "Turn career and learning confusion into a practical, personalized 90-day development plan with daily systems, project milestones, and accountability."
};

type PageProps = {
  searchParams: Promise<{ start?: string; resume?: string }>;
};

export default async function ProgressBuilderPage({ searchParams }: PageProps) {
  const { start, resume } = await searchParams;
  const existingTokenHash = await getExistingTokenHash();

  let assessment = null;
  let answers: Record<string, any> = {};

  if (existingTokenHash) {
    const data = await getOrCreateAssessment(existingTokenHash);
    assessment = data.assessment;
    answers = data.answers;
  } else if (start === "true" || resume === "true") {
    const { tokenHash } = await getOrCreateAnonymousToken();
    const data = await getOrCreateAssessment(tokenHash);
    assessment = data.assessment;
    answers = data.answers;
  }

  const isStarted = Boolean(
    start === "true" ||
    resume === "true" ||
    (assessment && assessment.completion_percentage > 0 && assessment.status === "draft")
  );

  if (isStarted && assessment && assessment.status === "draft") {
    return <ProgressWizard initialAssessment={assessment} initialAnswers={answers} />;
  }

  return (
    <div className="pbLandingPage">
      {/* Intro Hero Section */}
      <section className="pbHeroSection">
        <div className="shell pbHeroInner">
          <div className="pbHeroBadge">
            <Compass size={16} aria-hidden="true" />
            <span>AMI 90-Day Progress Builder</span>
          </div>

          <h1 className="pbHeroTitle">
            Move from confusion to a clear, actionable 90-day plan.
          </h1>

          <p className="pbHeroLead">
            If you feel stuck, overwhelmed by tutorial hell, or directionless in your career, this guided
            intake assessment turns honest answers into an individualized 12-week development roadmap covering
            deliberate practice, proof of work, accountability, and real opportunities.
          </p>

          <div className="pbHeroCtaGroup">
            <Link
              href="/progress-builder?start=true"
              className="primaryButton pbPrimaryCta"
              id="start-progress-builder-cta"
            >
              Build My 90-Day Progress Plan
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            {assessment && assessment.completion_percentage > 0 && assessment.status === "draft" ? (
              <Link
                href="/progress-builder?resume=true"
                className="secondaryButton pbResumeCta"
              >
                <RotateCcw size={16} aria-hidden="true" />
                Resume Draft ({assessment.completion_percentage}% saved)
              </Link>
            ) : null}
          </div>

          {/* Quick Expectations Pill Bar */}
          <div className="pbExpectationsBar">
            <div className="pbExpectationItem">
              <Clock size={16} aria-hidden="true" />
              <span>Takes approx. 15–20 minutes</span>
            </div>
            <div className="pbExpectationItem">
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>Progress is saved automatically</span>
            </div>
            <div className="pbExpectationItem">
              <FileCheck size={16} aria-hidden="true" />
              <span>Includes downloadable PDF blueprint</span>
            </div>
          </div>
        </div>
      </section>

      {/* What the Intake Covers */}
      <section className="pbOverviewSection">
        <div className="shell">
          <div className="pbSectionHeadingCenter">
            <span className="pbEyebrow">Structured Reflection</span>
            <h2 className="pbHeadingTitle">What this assessment explores</h2>
            <p className="pbHeadingSubtitle">
              Honest answers produce an authentic, actionable trajectory. You will be guided through 10
              focused sections designed to strip away distraction and focus on high-leverage execution.
            </p>
          </div>

          <div className="pbPillarsGrid">
            <div className="pbPillarCard">
              <div className="pbPillarIconWrap isGreen">
                <Target size={22} aria-hidden="true" />
              </div>
              <h3>1. Where You Are Now</h3>
              <p>Identify your baseline situation, honest frustrations, and what has stopped you in the past.</p>
            </div>

            <div className="pbPillarCard">
              <div className="pbPillarIconWrap isGold">
                <Sparkles size={22} aria-hidden="true" />
              </div>
              <h3>2. Desired 90-Day Result</h3>
              <p>Clarify your singular target, the cost of inaction, and what measurable success looks like.</p>
            </div>

            <div className="pbPillarCard">
              <div className="pbPillarIconWrap isBlue">
                <Layers size={22} aria-hidden="true" />
              </div>
              <h3>3. Strengths & Skill Focus</h3>
              <p>Choose ONE primary high-value skill track that builds upon your natural curiosities and abilities.</p>
            </div>

            <div className="pbPillarCard">
              <div className="pbPillarIconWrap isCoral">
                <Flame size={22} aria-hidden="true" />
              </div>
              <h3>4. Daily Progress System</h3>
              <p>Establish sustainable daily minutes, protected focus windows, and an emergency minimum rule.</p>
            </div>

            <div className="pbPillarCard">
              <div className="pbPillarIconWrap isLavender">
                <Award size={22} aria-hidden="true" />
              </div>
              <h3>5. Proof of Work & Projects</h3>
              <p>Define Day 30, Day 60, and Day 90 projects that prove your competence beyond paper certificates.</p>
            </div>

            <div className="pbPillarCard">
              <div className="pbPillarIconWrap isGreen">
                <CheckCircle2 size={22} aria-hidden="true" />
              </div>
              <h3>6. Accountability Rhythms</h3>
              <p>Lock in a weekly review cadence, evidence submission, and your first concrete 24-hour action.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer Notice */}
      <section className="pbDisclaimerSection">
        <div className="shell">
          <div className="pbDisclaimerCard">
            <div className="pbDisclaimerIcon">
              <ShieldAlert size={28} aria-hidden="true" />
            </div>
            <div>
              <h3>Important Align Mindset Initiative Commitment & Disclaimer</h3>
              <p>
                Align Mindset Initiative provides personalized development frameworks, systems, habits, and
                strategic guidance. <strong>AMI does not promise or guarantee employment, certificates,
                income, admission, or any commercial result.</strong> Your real-world outcome depends entirely
                upon your disciplined daily execution, practical project quality, and market conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="pbBottomCtaSection">
        <div className="shell pbBottomCtaInner">
          <h2>Ready to align your daily action with purposeful growth?</h2>
          <p>
            Begin the assessment today. Pause whenever you need to — your progress is safely preserved.
          </p>
          <Link
            href="/progress-builder?start=true"
            className="primaryButton pbBottomCtaBtn"
          >
            Build My 90-Day Progress Plan
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
