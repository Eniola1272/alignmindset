import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileCheck,
  Flame,
  Layers,
  Sparkles,
  Target
} from "lucide-react";

export function ProgressPreview() {
  return (
    <section className="sectionPad progressPracticeSection" id="practice" aria-labelledby="practice-heading">
      <div className="shell">
        <div className="practiceHeaderCenter">
          <span className="editorialEyebrow">Progress in Practice</span>
          <h2 id="practice-heading" className="practiceMainHeading">
            The difference between wanting change and building a life that supports change.
          </h2>
          <p className="practiceSubtitle">
            Ambition without structure is just wishful thinking. Notice what happens when you stop
            relying on vague intentions and translate your goals into a clear, non-negotiable operational architecture:
          </p>
        </div>

        {/* Before vs After Contrast Banner */}
        <div className="practiceContrastGrid">
          <div className="practiceContrastCard isBefore">
            <span className="practiceContrastBadge">Wishful Thinking (Left to Chance)</span>
            <blockquote className="practiceQuote">
              &ldquo;I want to get serious about tech, stop procrastinating on online courses, read more
              books, and finally land a better role or freelance client this year.&rdquo;
            </blockquote>
            <p className="practiceProblemNote">
              The Reality: 40 open browser tabs, constant low-grade guilt, zero deployed work, and another six months lost to passive drift.
            </p>
          </div>

          <div className="practiceContrastCard isAfter">
            <span className="practiceContrastBadge isSuccess">Aligned Architecture (Engineered for Execution)</span>
            <blockquote className="practiceQuote">
              &ldquo;Ship 2 production web apps and publish 2 case studies in 90 days. Protect 60 minutes
              at 6:30 AM before checking messages. 15-minute emergency minimum if overwhelmed.&rdquo;
            </blockquote>
            <p className="practiceSuccessNote">
              The Reality: Verifiable proof of competence, calm daily consistency, undeniable skills, and compounding momentum.
            </p>
          </div>
        </div>

        {/* Live Plan Artifact Mockup (Sample Blueprint) */}
        <div className="practiceBlueprintContainer">
          <div className="practiceBlueprintHeaderBar">
            <div className="practiceBlueprintTag">
              <Sparkles size={15} aria-hidden="true" />
              <span>Sample 90-Day Blueprint • Real Participant Schema</span>
            </div>
            <span className="practiceIllustrativeBadge">Illustrative Sample</span>
          </div>

          <div className="practiceBlueprintGrid">
            {/* Step 1: Destination & Focus */}
            <div className="practiceTile isDestination">
              <div className="practiceTileHeader">
                <Target size={18} className="practiceTileIcon" aria-hidden="true" />
                <span>1. Concrete 90-Day Finish Line</span>
              </div>
              <h3 className="practiceTileTitle">
                Frontend Engineer with 2 Documented Production Case Studies
              </h3>
              <p className="practiceTileMeta">
                <strong>Primary Skill Track:</strong> Next.js, TypeScript & Component Architecture
              </p>
            </div>

            {/* Step 2: Daily System */}
            <div className="practiceTile isSystem">
              <div className="practiceTileHeader">
                <Clock size={18} className="practiceTileIcon" aria-hidden="true" />
                <span>2. Repeatable Daily Execution Routine</span>
              </div>
              <div className="practiceSystemMetrics">
                <div className="practiceMetric">
                  <strong>45 mins</strong>
                  <span>Deliberate Coding</span>
                </div>
                <div className="practiceMetric">
                  <strong>15 mins</strong>
                  <span>Git Commit & Notes</span>
                </div>
                <div className="practiceMetric">
                  <strong>6:30 AM</strong>
                  <span>Protected Window</span>
                </div>
              </div>
              <p className="practiceRecoveryRule">
                <strong>The Emergency Minimum:</strong> If exhausted or overwhelmed, spend 15 mins reviewing PR diffs. Never miss twice.
              </p>
            </div>

            {/* Step 3: Project Milestones */}
            <div className="practiceTile isMilestones">
              <div className="practiceTileHeader">
                <Layers size={18} className="practiceTileIcon" aria-hidden="true" />
                <span>3. Verifiable Project Milestones</span>
              </div>
              <div className="practiceMilestonesList">
                <div className="practiceMilestoneItem isDone">
                  <span className="milestoneBadge">Day 30</span>
                  <div>
                    <strong>Accessible Component Library</strong>
                    <p>Documented in Storybook with 100% test coverage</p>
                  </div>
                </div>

                <div className="practiceMilestoneItem isDone">
                  <span className="milestoneBadge">Day 60</span>
                  <div>
                    <strong>Full-Stack Production Application</strong>
                    <p>Authenticated database, payment gateway, and automated email flows</p>
                  </div>
                </div>

                <div className="practiceMilestoneItem isCapstone">
                  <span className="milestoneBadge isGold">Day 90 Capstone</span>
                  <div>
                    <strong>Interactive SaaS Case Study</strong>
                    <p>Live production deployment with documented technical architecture</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Next 24-Hour Action & Accountability */}
            <div className="practiceTile isExecution">
              <div className="practiceTileHeader">
                <Flame size={18} className="practiceTileIcon" aria-hidden="true" />
                <span>4. First 24-Hour Commitment</span>
              </div>
              <div className="practiceActionBox">
                <strong>Initialize the GitHub repository, configure dependencies, and write the Day 30 component specification.</strong>
                <p>Stop waiting for next Monday or ideal circumstances. Momentum begins with one completed task today.</p>
              </div>

              <div className="practiceReviewBox">
                <FileCheck size={16} aria-hidden="true" />
                <span>Sunday Audit Cadence: Submit commit log and milestone review to mentor channel.</span>
              </div>
            </div>
          </div>

          <div className="practiceBlueprintFooter">
            <div>
              <h4>Take responsibility for where you are going.</h4>
              <p>Our diagnostic takes 15–20 minutes, autosaves your answers, and outputs your customized 12-week blueprint.</p>
            </div>
            <Link href="/progress-builder?start=true" className="primaryButton practiceCtaBtn">
              Build My 90-Day Progress Plan
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
