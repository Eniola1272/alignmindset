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
    question: "Who must I become to make this standard of execution natural?",
    summary:
      "Before setting another ambitious goal, examine your self-respect and daily standards. When you see yourself as a disciplined builder rather than someone hoping for a breakthrough, execution ceases to be an emotional debate.",
    icon: UserCheck
  },
  {
    num: "02",
    name: "Clarity",
    enables: "Enables precise, realistic goals",
    question: "Where am I actually heading, and what am I deliberately eliminating?",
    summary:
      "Clarity is not having twenty exciting ideas; it is the discipline to say no to nineteen good things so you can finish the one that counts. Eliminating ambiguity removes the mental fatigue of constant second-guessing.",
    icon: Compass
  },
  {
    num: "03",
    name: "Goals",
    enables: "Enables structured daily systems",
    question: "What is my concrete 90-day finish line?",
    summary:
      "Vague ambitions produce scattered effort. A real goal defines a specific destination, clear criteria for completion, and 30/60/90-day deliverables that measure tangible output, not hours spent daydreaming.",
    icon: Sparkles
  },
  {
    num: "04",
    name: "Systems",
    enables: "Enables consistent skill acquisition",
    question: "What is my repeatable daily structure?",
    summary:
      "You do not rise to the level of your goals; you fall to the level of your systems. Protected calendar blocks, distraction-free workspaces, and emergency 15-minute minimums ensure you execute even on your lowest-energy days.",
    icon: Cpu
  },
  {
    num: "05",
    name: "Skills",
    enables: "Enables valuable, high-leverage action",
    question: "What capability am I deliberately practicing to solve real problems?",
    summary:
      "Mediocrity hides behind passive tutorial consumption. Real skill is forged through deliberate, unglamorous practice on authentic problems. Competence cannot be faked, and genuine confidence only comes from competence.",
    icon: Layers
  },
  {
    num: "06",
    name: "Actions",
    enables: "Enables durable assets and proof",
    question: "What is my single concrete move within the next 24 hours?",
    summary:
      "Execution without drama. High performers do not negotiate with their calendar when the alarm rings. They sit down, open the workspace, and complete today's protected assignment without waiting for ideal conditions.",
    icon: Flame
  },
  {
    num: "07",
    name: "Assets",
    enables: "Enables long-term compounding leverage",
    question: "What tangible proof of work have I left behind?",
    summary:
      "Don't just consume knowledge; package it. Turn lessons into public repositories, documented case studies, published articles, and working tools. Tangible assets speak for you when you are not in the room.",
    icon: Boxes
  },
  {
    num: "08",
    name: "Leverage",
    enables: "Compounds back into self-respect and identity",
    question: "How does my compounding proof open real opportunities?",
    summary:
      "Reputation, trust, career opportunities, and meaningful partnerships do not come from aggressive self-promotion; they compound naturally from indisputable evidence of usefulness. Real proof creates its own gravity.",
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
            <span className="editorialEyebrow">The Architecture of Progress</span>
            <h2 id="framework-heading" className="frameworkTitle">
              Growth is not a mood. It is an interconnected system.
            </h2>
            <p className="frameworkLead">
              Wanting change is easy. Anyone can desire a better future on a good day. Building a life
              that supports change requires aligning who you are with what you do each morning.
              Progress fails when these elements are fragmented; it compounds when one unlocks the next:
            </p>
          </div>

          <div className="frameworkFeedbackCallout">
            <div className="frameworkFeedbackIcon">
              <RotateCcw size={18} aria-hidden="true" />
            </div>
            <div>
              <strong>The Weekly Feedback Loop:</strong>
              <p>A system without reflection quietly decays. Weekly reviews feed evidence back into Identity, calibrating your standards and strengthening execution.</p>
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
              Click any stage above to inspect how each discipline enables the next.
            </span>
            <Link href="/progress-builder" className="editorialLink">
              Apply this framework to your personal 90-day plan
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
