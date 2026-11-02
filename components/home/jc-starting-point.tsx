"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

type PathKey = "clarity" | "consistency" | "accountability";

type StartingPoint = {
  key: PathKey;
  num: string;
  tabTitle: string;
  bottleneck: string;
  diagnosis: string;
  primaryAction: string;
  milestone1: string;
  routine: string;
  ctaUrl: string;
};

const PATHS: Record<PathKey, StartingPoint> = {
  clarity: {
    key: "clarity",
    num: "01",
    tabTitle: "Direction & Focus",
    bottleneck: "I have ambition, but it's scattered across too many open tabs, tutorials, and uncommitted ideas.",
    diagnosis:
      "You don't lack talent; you lack a singular destination. Trying to pursue five paths simultaneously guarantees shallow progress in all of them. The solution is to choose ONE primary track for 90 days and eliminate the other nineteen.",
    primaryAction: "Pick ONE primary craft and define your Day 90 shipped project.",
    milestone1: "Month 1: Core foundations & technical case study outline.",
    routine: "60-minute protected morning block before opening communications.",
    ctaUrl: "/progress-builder?start=true&focus=clarity"
  },
  consistency: {
    key: "consistency",
    num: "02",
    tabTitle: "Daily Consistency",
    bottleneck: "I know what I need to do, but discipline evaporates by midweek and routines keep collapsing.",
    diagnosis:
      "You are relying on willpower instead of systems. Willpower is an emotional battery that drains by Wednesday afternoon. The solution is calendar-protected focus blocks, zero startup friction, and a 15-minute emergency minimum for low-energy days.",
    primaryAction: "Establish a 15-minute emergency minimum so you never record a zero day.",
    milestone1: "Month 1: Complete 20 consecutive weekday focus blocks without breaking the chain.",
    routine: "Protected 45-minute daily window + 15-min emergency backup.",
    ctaUrl: "/progress-builder?start=true&focus=consistency"
  },
  accountability: {
    key: "accountability",
    num: "03",
    tabTitle: "Structure & Accountability",
    bottleneck: "I can work in private, but without deadlines, external expectations, or feedback, I drift.",
    diagnosis:
      "Mediocrity thrives in isolation where no one notices when you quietly quit. When you commit to a weekly public checkpoint, your brain stops debating whether to work and starts asking how to finish.",
    primaryAction: "Join a weekly proof circle where you post verifiable artifacts every Friday.",
    milestone1: "Month 1: Ship and publicly share your first live milestone demo.",
    routine: "Monday focus declaration • Friday public evidence drop.",
    ctaUrl: "/progress-builder?start=true&focus=accountability"
  }
};

export function JcStartingPoint() {
  const [activeKey, setActiveKey] = useState<PathKey>("clarity");
  const current = PATHS[activeKey];

  return (
    <section className="jcStartingSection" id="starting-point" aria-labelledby="jc-starting-heading">
      <div className="shell jcNarrowShell">
        <div className="jcSectionHeader">
          <span className="jcEyebrow">Find Your Starting Point</span>
          <h2 id="jc-starting-heading" className="jcSectionTitle">
            Where are you feeling stuck right now?
          </h2>
          <p className="jcSectionLead">
            Choose the challenge that best describes your situation to view your recommended starting system.
          </p>
        </div>

        {/* 3 Minimal Tabs */}
        <div className="jcTabsTrack" role="tablist" aria-label="Starting challenges">
          {(["clarity", "consistency", "accountability"] as PathKey[]).map((k) => {
            const item = PATHS[k];
            const isActive = activeKey === k;
            return (
              <button
                key={k}
                role="tab"
                aria-selected={isActive}
                type="button"
                className={`jcTabBtn ${isActive ? "isActive" : ""}`}
                onClick={() => setActiveKey(k)}
              >
                <span className="jcTabNum">{item.num}</span>
                <span className="jcTabLabel">{item.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Card */}
        <div className="jcPathwayCard" role="tabpanel">
          <div className="jcPathwayHeader">
            <span className="jcPathwayTag">The Bottleneck</span>
            <p className="jcPathwayBottleneck">&ldquo;{current.bottleneck}&rdquo;</p>
          </div>

          <div className="jcPathwayBody">
            <div className="jcDiagnosisBlock">
              <span className="jcSublabel">The Diagnosis</span>
              <p className="jcDiagnosisText">{current.diagnosis}</p>
            </div>

            <div className="jcStrategyGrid">
              <div className="jcStrategyItem">
                <span className="jcSublabel">Key Action</span>
                <p>{current.primaryAction}</p>
              </div>
              <div className="jcStrategyItem">
                <span className="jcSublabel">30-Day Milestone</span>
                <p>{current.milestone1}</p>
              </div>
              <div className="jcStrategyItem">
                <span className="jcSublabel">Daily Rhythm</span>
                <p>{current.routine}</p>
              </div>
            </div>
          </div>

          <div className="jcPathwayFooter">
            <Link href={current.ctaUrl} className="jcPrimaryBtn">
              <span>Start 10-Step Assessment with This Focus</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

