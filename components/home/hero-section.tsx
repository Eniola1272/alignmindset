import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Flame,
  Layers,
  Sparkles,
  Target
} from "lucide-react";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="homeHero" aria-labelledby="home-hero-title">
      <div className="homeHeroBackdrop">
        <img
          src="/images/community-reading-session.jpg"
          alt="Align Mindset Initiative members gathered in a focused study and learning session"
          className="homeHeroImage"
        />
        <div className="homeHeroOverlay" aria-hidden="true" />
      </div>

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
              href="#pathways"
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
              <CheckCircle2 size={16} className="textBrandYellow" aria-hidden="true" />
              <span>Grounded in Systems, Not Hype</span>
            </div>
            <div className="homeHeroProofItem">
              <CheckCircle2 size={16} className="textBrandYellow" aria-hidden="true" />
              <span>Individualized 90-Day Blueprint</span>
            </div>
            <div className="homeHeroProofItem">
              <CheckCircle2 size={16} className="textBrandYellow" aria-hidden="true" />
              <span>Weekly Evidence Cadence</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tangible Progress Blueprint Teaser */}
        <div className="homeHeroVisual">
          <div className="homeHeroCard">
            <div className="homeHeroCardHeader">
              <div className="homeHeroCardTag">
                <Sparkles size={14} aria-hidden="true" />
                <span>90-Day Progress Plan • Live Architecture</span>
              </div>
              <span className="homeHeroCardStatus">Active System</span>
            </div>

            <div className="homeHeroCardBody">
              <span className="homeHeroCardEyebrow">Sample 90-Day Destination</span>
              <h3 className="homeHeroCardHeading">
                Move from Tutorial Hell to 3 Shipped Production Apps
              </h3>

              <div className="homeHeroMiniMilestones">
                <div className="homeHeroMiniStep isDone">
                  <div className="homeHeroMiniIcon">
                    <Target size={14} />
                  </div>
                  <div>
                    <strong>Day 30 Milestone (Completed)</strong>
                    <p>Documented component system with 100% test coverage</p>
                  </div>
                </div>

                <div className="homeHeroMiniStep isCurrent">
                  <div className="homeHeroMiniIcon">
                    <Layers size={14} />
                  </div>
                  <div>
                    <strong>Day 60 Milestone (In Execution)</strong>
                    <p>Full-stack web application with authenticated database</p>
                  </div>
                </div>
              </div>

              {/* Today's Daily System Callout */}
              <div className="homeHeroSystemBox">
                <div className="homeHeroSystemIcon">
                  <Flame size={16} aria-hidden="true" />
                </div>
                <div>
                  <small>Protected Daily Non-Negotiable</small>
                  <strong>45 mins deliberate practice before 7:30 AM</strong>
                </div>
              </div>
            </div>

            <div className="homeHeroCardFooter">
              <Link
                href="/progress-builder"
                className="homeHeroCardLink"
              >
                <span>Build your personal 90-day progress plan</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
