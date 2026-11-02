import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
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
            How a vague ambition becomes an unstoppable reality.
          </h2>
          <p className="practiceSubtitle">
            Good intentions crumble under ambiguity. Here is the concrete translation that happens when
            you run your goals through the Align Mindset progress architecture:
          </p>
        </div>

        {/* Before vs After Contrast Banner */}
        <div className="practiceContrastGrid">
          <div className="practiceContrastCard isBefore">
            <span className="practiceContrastBadge">The Vague Ambition (Before)</span>
            <blockquote className="practiceQuote">
              &ldquo;I want to get better at tech, stop procrastinating on tutorials, and finally find a
              good developer role or freelance gig this year.&rdquo;
            </blockquote>
            <p className="practiceProblemNote">
              Result: Endless bookmarks, zero deployed projects, constant guilt, and silent drift.
            </p>
          </div>

          <div className="practiceContrastCard isAfter">
            <span className="practiceContrastBadge isSuccess">The Aligned Structure (After)</span>
            <blockquote className="practiceQuote">
              &ldquo;Deploy 3 production full-stack apps, write 3 public case studies, and maintain a 60-minute
              morning practice window 5 days a week.&rdquo;
            </blockquote>
            <p className="practiceSuccessNote">
              Result: Visible proof of work, daily momentum, verifiable competence, and undeniable confidence.
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
                <span>1. Specific 90-Day Destination</span>
              </div>
              <h3 className="practiceTileTitle">
                Frontend Developer with 3 Deployed SaaS Case Studies
              </h3>
              <p className="practiceTileMeta">
                <strong>Primary Track:</strong> Next.js, TypeScript & Accessible UI Systems
              </p>
            </div>

            {/* Step 2: Daily System */}
            <div className="practiceTile isSystem">
              <div className="practiceTileHeader">
                <Clock size={18} className="practiceTileIcon" aria-hidden="true" />
                <span>2. Repeatable Daily Progress System</span>
              </div>
              <div className="practiceSystemMetrics">
                <div className="practiceMetric">
                  <strong>45 mins</strong>
                  <span>Deliberate Coding</span>
                </div>
                <div className="practiceMetric">
                  <strong>15 mins</strong>
                  <span>Notes & Git Commit</span>
                </div>
                <div className="practiceMetric">
                  <strong>6:30 AM</strong>
                  <span>Protected Window</span>
                </div>
              </div>
              <p className="practiceRecoveryRule">
                <strong>Emergency Minimum:</strong> 15 mins reviewing PR diffs if exhausted. Never miss twice.
              </p>
            </div>

            {/* Step 3: Project Milestones */}
            <div className="practiceTile isMilestones">
              <div className="practiceTileHeader">
                <Layers size={18} className="practiceTileIcon" aria-hidden="true" />
                <span>3. Tangible Project Deliverables</span>
              </div>
              <div className="practiceMilestonesList">
                <div className="practiceMilestoneItem isDone">
                  <span className="milestoneBadge">Day 30</span>
                  <div>
                    <strong>Interactive Component Library</strong>
                    <p>Documented in Storybook with 100% test coverage</p>
                  </div>
                </div>

                <div className="practiceMilestoneItem isDone">
                  <span className="milestoneBadge">Day 60</span>
                  <div>
                    <strong>Full-Stack E-Commerce Storefront</strong>
                    <p>Supabase database, Stripe checkout, automated emails</p>
                  </div>
                </div>

                <div className="practiceMilestoneItem isCapstone">
                  <span className="milestoneBadge isGold">Day 90 Capstone</span>
                  <div>
                    <strong>Collaborative SaaS Workspace</strong>
                    <p>Live production deployment with video walkthrough</p>
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
                <strong>Initialize GitHub repository and write Day 30 component specification.</strong>
                <p>Do not wait for another Monday. Activate the commitment today.</p>
              </div>

              <div className="practiceReviewBox">
                <FileCheck size={16} aria-hidden="true" />
                <span>Sunday Review: Submit commit log and demo link to mentor channel.</span>
              </div>
            </div>
          </div>

          <div className="practiceBlueprintFooter">
            <div>
              <h4>Ready to build your personalized 90-day progress plan?</h4>
              <p>Takes 15–20 minutes. Saves automatically. Generates your customized 12-week blueprint.</p>
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

