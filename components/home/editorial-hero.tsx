import Image from "next/image";
import Link from "next/link";

export function EditorialHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-wrap">
        {/* Left Column: Core Value Proposition */}
        <div className="hero-content">
          <div className="hero-kicker">
            <svg className="small-sun" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0.9l2.1 6.9 6.8-2.3-4.1 5.9 6.3 3.5-7.3.1 1.1 7.2-4.9-5.4-4.9 5.4 1.1-7.2-7.3-.1 6.3-3.5-4.1-5.9 6.8 2.3L12 .9z" />
            </svg>
            <b>A MOVEMENT FOR INTENTIONAL GROWTH</b>
          </div>

          <h1 id="hero-title">
            Stop drifting.
            <em>Start becoming.</em>
          </h1>

          <p className="hero-description">
            Your goals deserve more than good intentions. We help you align your identity,
            skills, systems, and everyday actions—so you can make meaningful progress toward
            the life you want to build.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-yellow" href="/progress-builder?start=true">
              <span>Find your starting point</span>
              <span className="arrow">↗</span>
            </Link>
            <Link className="btn btn-outline" href="#approach">
              <span>See how it works</span>
              <span className="arrow">↗</span>
            </Link>
          </div>

          <div className="hero-note">
            <span className="line" />
            <span>This is a place for the work between where you are and where you want to be.</span>
          </div>
        </div>

        {/* Right Column: Hero Image Frame with Stamp & Tag */}
        <div className="hero-image-frame">
          <div className="hero-art-fallback" aria-hidden="true">
            <span className="art-num">ALIGN / MOVE / BECOME</span>
            <div className="art-message">
              A direction<br />worth <em>following.</em>
            </div>
            <div className="art-line" />
          </div>

          <Image
            src="/images/focused-learning-duo.jpg"
            alt="Young adults learning and collaborating with intentional focus"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="hero-photo"
            priority
          />

          <div className="hero-stamp" aria-hidden="true">
            <svg viewBox="0 0 90 90">
              <defs>
                <path id="stamp-round" d="M45 45m-31 0a31 31 0 1 1 62 0a31 31 0 1 1-62 0" />
              </defs>
              <text font-size="7.9" font-weight="700" letter-spacing="1.25" fill="#1e2a22">
                <textPath href="#stamp-round">GROW WITH INTENTION • ACT WITH PURPOSE • </textPath>
              </text>
              <path d="M29 53L45 35L61 53M45 35V64" fill="none" stroke="#1e2a22" strokeWidth="2.7" />
            </svg>
          </div>

          <div className="photo-tag">
            <span className="tag-number">↗</span>
            <small>
              Less empty motivation.<br />
              More real movement.<br />
              One step at a time.
            </small>
          </div>

          <div className="hero-vertical">ALIGN WHAT YOU DO WITH WHERE YOU&apos;RE GOING</div>
        </div>
      </div>

      <div className="container hero-caption">
        <span>01 / A BETTER WAY FORWARD</span>
        <span>Identity &nbsp; / &nbsp; Direction &nbsp; / &nbsp; Action</span>
      </div>
    </section>
  );
}

