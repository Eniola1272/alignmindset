import Link from "next/link";
import { ArrowRight, Check, Flame, Layers, Sparkles, Target } from "lucide-react";

export function ModernHero() {
  return (
    <section className="modHero" aria-labelledby="hero-heading">
      <div className="shell modHeroGrid">
        {/* Left Column: Core Value Proposition */}
        <div className="modHeroCopy">
          <div className="modBadge">
            <span className="modBadgeDot" aria-hidden="true" />
            <span>Align Mindset Initiative</span>
            <span className="modBadgeSep" aria-hidden="true">•</span>
            <span className="modBadgeSub">Practical Growth Platform</span>
          </div>

          <h1 id="hero-heading" className="modHeroTitle">
            Stop drifting. Build your 90-day progress plan.
          </h1>

          <p className="modHeroLead">
            We help ambitious people align their identity, daily habits, and skills so they can stop
            starting over, eliminate scattered distractions, and build verifiable proof of progress.
          </p>

          <div className="modHeroActions">
            <Link href="/progress-builder?start=true" className="modPrimaryBtn">
              <span>Build Your 90-Day Plan</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <Link href="#starting-point" className="modSecondaryBtn">
              <span>Find Your Starting Point</span>
            </Link>
          </div>

          <div className="modHeroTrust">
            <div className="trustTag">
              <Check size={14} className="trustCheck" aria-hidden="true" />
              <span>Free Guided 10-Step Intake</span>
            </div>
            <div className="trustTag">
              <Check size={14} className="trustCheck" aria-hidden="true" />
              <span>Grounded in Systems, Not Hype</span>
            </div>
            <div className="trustTag">
              <Check size={14} className="trustCheck" aria-hidden="true" />
              <span>Weekly Proof of Work</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Modern Product Card */}
        <div className="modHeroVisual">
          <div className="modHeroCard">
            <div className="cardHeader">
              <div className="cardHeaderTag">
                <Sparkles size={14} aria-hidden="true" />
                <span>90-Day Blueprint Preview</span>
              </div>
              <span className="statusPill">In Progress</span>
            </div>

            <div className="cardBody">
              <div className="destinationGroup">
                <span className="groupLabel">Target Destination</span>
                <h3 className="destinationText">
                  Frontend Engineer with 2 Deployed Production Apps
                </h3>
                <span className="trackBadge">Next.js • TypeScript • UI Systems</span>
              </div>

              {/* Milestones Progress Timeline */}
              <div className="milestonesTrack">
                <div className="milestoneRow isDone">
                  <div className="rowIcon">
                    <Check size={12} aria-hidden="true" />
                  </div>
                  <div className="rowContent">
                    <strong>Month 1 (Day 30)</strong>
                    <p>Accessible design system & component library</p>
                  </div>
                  <span className="milestoneCheckTag">Done</span>
                </div>

                <div className="milestoneRow isCurrent">
                  <div className="rowIcon">
                    <Layers size={12} aria-hidden="true" />
                  </div>
                  <div className="rowContent">
                    <strong>Month 2 (Day 60)</strong>
                    <p>Full-stack web app with database & auth</p>
                  </div>
                  <span className="milestoneCheckTag isCurrent">Active</span>
                </div>

                <div className="milestoneRow isUpcoming">
                  <div className="rowIcon">
                    <Target size={12} aria-hidden="true" />
                  </div>
                  <div className="rowContent">
                    <strong>Month 3 (Day 90 Capstone)</strong>
                    <p>Live production SaaS tool & public case study</p>
                  </div>
                  <span className="milestoneCheckTag isMuted">Upcoming</span>
                </div>
              </div>

              {/* Daily Protected Focus */}
              <div className="dailyFocusBox">
                <div className="focusIconWrap">
                  <Flame size={16} aria-hidden="true" />
                </div>
                <div>
                  <span className="focusLabel">Today&apos;s Protected Window</span>
                  <strong className="focusValue">6:30 AM – 7:30 AM (45m Deliberate Coding)</strong>
                </div>
              </div>
            </div>

            <div className="cardFooter">
              <Link href="/progress-builder?start=true" className="cardFooterLink">
                <span>Customize your 12-week blueprint</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

