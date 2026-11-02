"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Compass,
  Cpu,
  Flame,
  Layers,
  RotateCcw,
  Sparkles,
  TrendingUp,
  UserCheck
} from "lucide-react";

type FrameworkStep = {
  num: string;
  name: string;
  enables: string;
  question: string;
  summary: string;
  icon: typeof UserCheck;
};

const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    num: "01",
    name: "Identity",
    enables: "Enables authentic clarity",
    question: "Who must I become to make this growth natural?",
    summary:
      "Clarify your standard, self-respect, and principles before chasing arbitrary targets. Identity gives daily discipline a durable anchor.",
    icon: UserCheck
  },
  {
    num: "02",
    name: "Clarity",
    enables: "Enables precise goals",
    question: "Where exactly am I heading, and what am I saying no to?",
    summary:
      "Strip away shiny distractions. Naming ONE singular destination eliminates the fatigue of endless second-guessing.",
    icon: Compass
  },
  {
    num: "03",
    name: "Goals",
    enables: "Enables structured systems",
    question: "What is my measurable 90-day finish line?",
    summary:
      "Translate vague hopes into tangible 30, 60, and 90-day deliverables with clear criteria for completion.",
    icon: Sparkles
  },
  {
    num: "04",
    name: "Systems",
    enables: "Enables consistent skills",
    question: "What is my daily non-negotiable routine?",
    summary:
      "Protected focus windows, friction-free workspaces, and an emergency 15-minute minimum rule for exhausted days.",
    icon: Cpu
  },
  {
    num: "05",
    name: "Skills",
    enables: "Enables valuable action",
    question: "What high-value capability am I deliberately practicing?",
    summary:
      "Deep, repetitive drills on real problems instead of passive tutorial consumption. Competence builds genuine confidence.",
    icon: Layers
  },
  {
    num: "06",
    name: "Actions",
    enables: "Enables tangible assets",
    question: "What is my next concrete move within the next 24 hours?",
    summary:
      "Execution without drama. Turning intentions into completed commits, published pages, and submitted work today.",
    icon: Flame
  },
  {
    num: "07",
    name: "Assets",
    enables: "Enables long-term leverage",
    question: "What proof of work have I left behind?",
    summary:
      "Packaging lessons and projects into public case studies, code repositories, writing, and functional solutions.",
    icon: Boxes
  },
  {
    num: "08",
    name: "Leverage",
    enables: "Compounds back into Identity",
    question: "How does my compounding output open real opportunities?",
    summary:
      "Reputation, trusted networks, community standing, and career opportunities compound naturally from indisputable evidence.",
    icon: TrendingUp
  }
];

export function AlignmentFramework() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = FRAMEWORK_STEPS[activeStep];

  return (
    <section className="sectionPad frameworkSection" id="framework" aria-labelledby="framework-heading">
      <div id="about" className="scrollAnchor" aria-hidden="true" />
      <div className="shell">
        <div className="frameworkHeader">
          <div className="frameworkHeaderCopy">
            <span className="editorialEyebrow">The Method</span>
            <h2 id="framework-heading" className="frameworkTitle">
              Growth that moves from identity to leverage.
            </h2>
            <p className="frameworkLead">
              Progress is not an accident of luck or a temporary burst of emotion. It is an interconnected
              chain where each element unlocks the next — reinforced by weekly feedback and deliberate reflection.
            </p>
          </div>

          <div className="frameworkFeedbackCallout">
            <div className="frameworkFeedbackIcon">
              <RotateCcw size={18} aria-hidden="true" />
            </div>
            <div>
              <strong>The Continuous Feedback Loop:</strong>
              <p>Weekly Sunday reviews feed evidence back into Identity, refining systems and accelerating compounding growth.</p>
            </div>
          </div>
        </div>

        {/* The 8-Step Interactive Pipeline Flow */}
        <div className="frameworkChainTrack" role="list" aria-label="Alignment Framework Pipeline">
          {FRAMEWORK_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;
            return (
              <button
                key={step.num}
                type="button"
                role="listitem"
                aria-pressed={isActive}
                className={`frameworkChainNode ${isActive ? "isActive" : ""}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="frameworkNodeTop">
                  <span className="frameworkNodeNum">{step.num}</span>
                  <Icon size={16} className="frameworkNodeIcon" aria-hidden="true" />
                </div>
                <strong className="frameworkNodeName">{step.name}</strong>
                <span className="frameworkNodeArrow" aria-hidden="true">→</span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Detail Card */}
        <div className="frameworkDetailCard">
          <div className="frameworkDetailHeader">
            <div className="frameworkDetailBadge">
              <span>Stage {current.num}</span>
              <strong className="frameworkDetailName">{current.name}</strong>
            </div>
            <span className="frameworkDetailEnables">
              <CheckCircle2 size={15} aria-hidden="true" />
              {current.enables}
            </span>
          </div>

          <div className="frameworkDetailBody">
            <h3 className="frameworkDetailQuestion">&ldquo;{current.question}&rdquo;</h3>
            <p className="frameworkDetailSummary">{current.summary}</p>
          </div>

          <div className="frameworkDetailFooter">
            <span className="frameworkDetailHint">
              Click any stage above to inspect how each step unlocks the next.
            </span>
            <Link href="/progress-builder" className="editorialLink">
              Apply this framework in your 90-day plan
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
