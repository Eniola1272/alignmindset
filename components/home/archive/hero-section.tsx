import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="edHero" aria-labelledby="ed-hero-title">
      <div className="shell">
        <div className="edHeroGrid">
          {/* Left Column: Editorial Statement */}
          <div className="edHeroText">
            <div className="edEyebrowRow">
              <span className="edEyebrowTag">Align Mindset Initiative</span>
              <span className="edEyebrowDivider" aria-hidden="true">/</span>
              <span className="edEyebrowMeta">Est. 2024 • A Practical Growth Environment</span>
            </div>

            <h1 id="ed-hero-title" className="edHeroHeading">
              Your goals need more than good intentions.
            </h1>

            <p className="edHeroLead">
              Mediocrity is rarely a lack of talent. It is what happens when real ambition has no
              structure, daily systems are fragile, and execution is left to mood. We help you align
              your identity, goals, skills, and routines so you can stop drifting and build verifiable
              proof of progress.
            </p>

            <div className="edHeroActions">
              <Link href="#starting-point" className="edPrimaryBtn" id="hero-find-starting-point">
                <span>Find Your Starting Point</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="#framework" className="edSecondaryLink">
                <span>How the Framework Works</span>
                <span className="edArrow" aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Editorial Rule Ledger */}
            <div className="edHeroLedger">
              <div className="edLedgerItem">
                <span className="edLedgerNum">01</span>
                <div>
                  <strong>Diagnostic Intake</strong>
                  <p>Identify your actual friction point in 15 minutes.</p>
                </div>
              </div>
              <div className="edLedgerItem">
                <span className="edLedgerNum">02</span>
                <div>
                  <strong>Individualized 90-Day Plan</strong>
                  <p>One primary track with 30/60/90-day deliverables.</p>
                </div>
              </div>
              <div className="edLedgerItem">
                <span className="edLedgerNum">03</span>
                <div>
                  <strong>Weekly Evidence Cadence</strong>
                  <p>Friday proof-of-work check-ins with peer review.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Documentary Figure & Archival Card */}
          <div className="edHeroFigureCol">
            <figure className="edHeroFigure">
              <div className="edPhotoMat">
                <img
                  src="/images/focused-learning-duo.jpg"
                  alt="Align Mindset Initiative participants engaged in deliberate study and discussion"
                  className="edHeroImg"
                  width={640}
                  height={420}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="edHeroFigcaption">
                <span className="figcaptionIndex">Figure 1.0</span>
                <span className="figcaptionSep">—</span>
                <span className="figcaptionText">
                  Align Mindset Cohort Session. Turning scattered ambition into weekly verifiable artifacts.
                </span>
              </figcaption>
            </figure>

            {/* Embedded Ledger Manifest */}
            <div className="edHeroManifest">
              <div className="manifestHeader">
                <span className="manifestTitle">The 90-Day Execution Standard</span>
                <span className="manifestBadge">Active</span>
              </div>
              <div className="manifestBody">
                <div className="manifestRow">
                  <span className="manifestLabel">Primary Destination</span>
                  <span className="manifestValue">Move from tutorial paralysis to 2 shipped production case studies</span>
                </div>
                <div className="manifestRow">
                  <span className="manifestLabel">Daily Protected Focus</span>
                  <span className="manifestValue">60 minutes deliberate practice before 7:30 AM (Emergency Min: 15 mins)</span>
                </div>
                <div className="manifestRow">
                  <span className="manifestLabel">Weekly Review</span>
                  <span className="manifestValue">Sunday at 6:00 PM: Git commits, diff logs & calendar blocks</span>
                </div>
              </div>
              <div className="manifestFooter">
                <Link href="/progress-builder" className="manifestLink">
                  <span>Build your personalized progress blueprint</span>
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
