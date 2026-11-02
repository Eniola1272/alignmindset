import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Layers,
  Sparkles,
  Target
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="homeHero" aria-labelledby="home-hero-title">
      <div className="shell homeHeroGrid">
        {/* Left Column: Mission & Priming Copy */}
        <div className="homeHeroCopy">
          <div className="homeHeroBadge">
            <span className="homeHeroBadgeDot" aria-hidden="true" />
            <span>Align Mindset Initiative</span>
          </div>

          <h1 id="home-hero-title" className="homeHeroTitle">
            Your goals need more than good intentions.
          </h1>

          <p className="homeHeroLead">
            Mediocrity is rarely a lack of talent. It is what happens when real ambition has no
            structure, daily systems are fragile, and execution is left to mood. We help you align
            your identity, goals, skills, and routines so you can stop drifting and build verifiable
            proof of progress.
          </p>

          <div className="homeHeroActions">
            <Link
              href="#starting-point"
              className="primaryButton homeHeroPrimaryBtn"
              id="hero-find-starting-point"
            >
              Find Your Starting Point
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link href="#framework" className="secondaryButton homeHeroSecondaryBtn">
              How Align Mindset Works
            </Link>
          </div>

          {/* Proof Badges */}
          <div className="homeHeroProofBar">
            <div className="homeHeroProofItem">
              <CheckCircle2 size={16} className="heroProofIcon" aria-hidden="true" />
              <span>Grounded in Systems, Not Hype</span>
            </div>
            <div className="homeHeroProofItem">
              <CheckCircle2 size={16} className="heroProofIcon" aria-hidden="true" />
              <span>Individualized 90-Day Blueprint</span>
            </div>
            <div className="homeHeroProofItem">
              <CheckCircle2 size={16} className="heroProofIcon" aria-hidden="true" />
              <span>Weekly Evidence Cadence</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Editorial Photo & Live Plan Artifact */}
        <div className="homeHeroVisual">
          <div className="homeHeroVisualStack">
            {/* Documentary Learning Photo */}
            <div className="homeHeroPhotoFrame">
              <img
                src="/images/focused-learning-duo.jpg"
                alt="Align Mindset participants in a focused study and discussion session"
                className="homeHeroPhoto"
                width={600}
                height={375}
                loading="eager"
                fetchPriority="high"
              />
              <div className="homeHeroPhotoCaption">
                <span>Authentic Learning Environment</span>
                <p>Real study, peer discussion, and deliberate skill acquisition.</p>
              </div>
            </div>

            {/* Overlaid Live 90-Day Plan Blueprint Card */}
            <div className="homeHeroBlueprintCard">
              <div className="blueprintCardHeader">
                <div className="blueprintCardTag">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>90-Day Progress Plan • Live System</span>
                </div>
                <span className="blueprintCardStatus">Active</span>
              </div>

              <div className="blueprintCardBody">
                <span className="blueprintCardEyebrow">Sample Destination</span>
                <h3 className="blueprintCardHeading">
                  Move from Tutorial Hell to 2 Shipped Production Apps
                </h3>

                <div className="blueprintMiniSteps">
                  <div className="blueprintMiniStep isDone">
                    <div className="blueprintStepIcon isSuccess">
                      <Target size={13} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>Day 30 Milestone (Completed)</strong>
                      <p>Component library with 100% test coverage</p>
                    </div>
                  </div>

                  <div className="blueprintMiniStep isCurrent">
                    <div className="blueprintStepIcon isProgress">
                      <Layers size={13} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>Day 60 Milestone (In Execution)</strong>
                      <p>Full-stack web app with authenticated database</p>
                    </div>
                  </div>
                </div>

                {/* Today's Daily Routine Protected Window */}
                <div className="blueprintSystemBox">
                  <Flame size={16} className="blueprintSystemIcon" aria-hidden="true" />
                  <div>
                    <small>Protected Daily Non-Negotiable</small>
                    <strong>45 mins deliberate practice before 7:30 AM</strong>
                  </div>
                </div>
              </div>

              <div className="blueprintCardFooter">
                <Link href="/progress-builder" className="blueprintFooterLink">
                  <span>Build your personal 90-day progress plan</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
