"use client";

import { useState } from "react";
import Link from "next/link";

type PathKey = "clarity" | "consistency" | "growth";

type Recommendation = {
  title: string;
  copy: string;
  href: string;
  cta: string;
};

const RECOMMENDATIONS: Record<PathKey, Recommendation> = {
  clarity: {
    title: "Start with clarity.",
    copy: "Name the area of life where you want meaningful change, describe what progress would look like, and identify one small action you can take this week.",
    href: "/progress-builder?start=true&focus=clarity",
    cta: "Build your clarity plan"
  },
  consistency: {
    title: "Build a rhythm you can repeat.",
    copy: "Choose fewer priorities, turn them into weekly commitments, and create a simple review routine. A smaller system you follow beats a perfect plan you abandon.",
    href: "/progress-builder?start=true&focus=consistency",
    cta: "Explore the 90-day system"
  },
  growth: {
    title: "Grow through learning and community.",
    copy: "Pair a skill worth developing with a practical project, useful reading, and people who will challenge you to apply what you learn.",
    href: "/progress-builder?start=true&focus=growth",
    cta: "Explore our experiences"
  }
};

export function EditorialStartingPoint() {
  const [selectedPath, setSelectedPath] = useState<PathKey | null>("clarity");

  const handleToggle = (path: PathKey) => {
    setSelectedPath((prev) => (prev === path ? null : path));
  };

  const rec = selectedPath ? RECOMMENDATIONS[selectedPath] : null;

  return (
    <section className="start-section" id="start" aria-labelledby="start-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">EVERY JOURNEY BEGINS SOMEWHERE</div>
            <h2 id="start-title" className="section-title" style={{ marginTop: "21px" }}>
              Where are you<br />
              <em>right now?</em>
            </h2>
          </div>
          <div className="copy">
            <p>
              You don&apos;t need to have everything figured out. Choose the sentence that sounds most like you,
              and we&apos;ll show you a useful place to begin.
            </p>
          </div>
        </div>

        <div className="paths" role="tablist" aria-label="Choose your starting point">
          <button
            className="path"
            type="button"
            role="tab"
            aria-pressed={selectedPath === "clarity"}
            onClick={() => handleToggle("clarity")}
          >
            <span className="path-index">01</span>
            <span className="path-title">I feel stuck or unsure where to begin.</span>
            <span className="path-desc">
              You know there&apos;s more you could do. You just need help finding the right direction.
            </span>
            <span className="path-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            className="path"
            type="button"
            role="tab"
            aria-pressed={selectedPath === "consistency"}
            onClick={() => handleToggle("consistency")}
          >
            <span className="path-index">02</span>
            <span className="path-title">I have goals, but I keep losing momentum.</span>
            <span className="path-desc">
              You know what matters. What&apos;s missing is a structure you can actually stick with.
            </span>
            <span className="path-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            className="path"
            type="button"
            role="tab"
            aria-pressed={selectedPath === "growth"}
            onClick={() => handleToggle("growth")}
          >
            <span className="path-index">03</span>
            <span className="path-title">I&apos;m ready to grow beyond where I am.</span>
            <span className="path-desc">
              You&apos;re looking for skills, practical experiences, and people who take growth seriously.
            </span>
            <span className="path-arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        {rec && (
          <div className="recommendation open" role="status" aria-live="polite">
            <div>
              <small>Your recommended first step</small>
              <h3>{rec.title}</h3>
            </div>
            <p>{rec.copy}</p>
            <Link className="btn btn-dark" href={rec.href}>
              <span>{rec.cta}</span>
              <span className="arrow">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

