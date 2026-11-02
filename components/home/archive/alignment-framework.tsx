"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";

type FrameworkStep = {
  num: string;
  name: string;
  enables: string;
  question: string;
  summary: string;
};

const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    num: "01",
    name: "Identity",
    enables: "Authentic Clarity",
    question: "Who must I become to make this standard of execution natural?",
    summary:
      "Before setting another ambitious goal, examine your self-respect and daily standards. When you see yourself as a disciplined builder rather than someone hoping for a breakthrough, execution ceases to be an emotional debate."
  },
  {
    num: "02",
    name: "Clarity",
    enables: "Precise, Realistic Goals",
    question: "Where am I actually heading, and what am I deliberately eliminating?",
    summary:
      "Clarity is not having twenty exciting ideas; it is the discipline to say no to nineteen good things so you can finish the one that counts. Eliminating ambiguity removes the mental fatigue of constant second-guessing."
  },
  {
    num: "03",
    name: "Goals",
    enables: "Structured Daily Systems",
    question: "What is my concrete 90-day finish line?",
    summary:
      "Vague ambitions produce scattered effort. A real goal defines a specific destination, clear criteria for completion, and 30/60/90-day deliverables that measure tangible output, not hours spent daydreaming."
  },
  {
    num: "04",
    name: "Systems",
    enables: "Consistent Skill Acquisition",
    question: "What is my repeatable daily structure?",
    summary:
      "You do not rise to the level of your goals; you fall to the level of your systems. Protected calendar blocks, distraction-free workspaces, and emergency 15-minute minimums ensure you execute even on your lowest-energy days."
  },
  {
    num: "05",
    name: "Skills",
    enables: "High-Leverage Action",
    question: "What capability am I deliberately practicing to solve real problems?",
    summary:
      "Mediocrity hides behind passive tutorial consumption. Real skill is forged through deliberate, unglamorous practice on authentic problems. Competence cannot be faked, and genuine confidence only comes from competence."
  },
  {
    num: "06",
    name: "Actions",
    enables: "Durable Assets & Proof",
    question: "What is my single concrete move within the next 24 hours?",
    summary:
      "Execution without drama. High performers do not negotiate with their calendar when the alarm rings. They sit down, open the workspace, and complete today's protected assignment without waiting for ideal conditions."
  },
  {
    num: "07",
    name: "Assets",
    enables: "Compounding Leverage",
    question: "What tangible proof of work have I left behind?",
    summary:
      "Don't just consume knowledge; package it. Turn lessons into public repositories, documented case studies, published articles, and working tools. Tangible assets speak for you when you are not in the room."
  },
  {
    num: "08",
    name: "Leverage",
    enables: "Self-Respect & Identity",
    question: "How does my compounding proof open real opportunities?",
    summary:
      "Reputation, trust, career opportunities, and meaningful partnerships do not come from aggressive self-promotion; they compound naturally from indisputable evidence of usefulness. Real proof creates its own gravity."
  }
];

export function AlignmentFramework() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = FRAMEWORK_STEPS[activeStep];

  return (
    <section className="edSection edFrameworkSection" id="framework" aria-labelledby="framework-heading">
      <div id="about" className="scrollAnchor" aria-hidden="true" />
      <div className="shell">
        {/* Editorial Section Header */}
        <div className="edSectionHeader">
          <div className="edSectionMeta">
            <span>The Operating Philosophy</span>
            <span className="edDot" aria-hidden="true">•</span>
            <span>Section 03</span>
          </div>
          <h2 id="framework-heading" className="edSectionHeading">
            Growth is not a mood. It is an interconnected system.
          </h2>
          <p className="edSectionLead">
            Wanting change is easy. Anyone can desire a better future on a good day. Building a life
            that supports change requires aligning who you are with what you do each morning.
            Progress compounds when one discipline unlocks the next:
          </p>
        </div>

        {/* 8-Stage Sequential Chain */}
        <div className="edFrameworkChain" role="list" aria-label="Alignment Framework Pipeline">
          {FRAMEWORK_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={step.num}
                type="button"
                role="listitem"
                aria-pressed={isActive}
                className={`edChainNode ${isActive ? "isActive" : ""}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="nodeHeader">
                  <span className="nodeNum">{step.num}</span>
                  <span className="nodeArrow" aria-hidden="true">→</span>
                </div>
                <strong className="nodeTitle">{step.name}</strong>
                <span className="nodeEnables">Unlocks {step.enables}</span>
              </button>
            );
          })}
        </div>

        {/* Detail Inspection Card */}
        <div className="edFrameworkDetail">
          <div className="detailHeader">
            <div className="detailBadgeGroup">
              <span className="detailIndex">Stage {current.num}</span>
              <h3 className="detailName">{current.name}</h3>
            </div>
            <span className="detailEnablesTag">Unlocks {current.enables}</span>
          </div>

          <div className="detailBody">
            <blockquote className="detailQuestion">&ldquo;{current.question}&rdquo;</blockquote>
            <p className="detailSummary">{current.summary}</p>
          </div>

          <div className="detailFooter">
            <div className="feedbackNote">
              <RotateCcw size={15} aria-hidden="true" />
              <span>
                <strong>The Sunday Reflection Feedback Loop:</strong> Every completed week feeds
                evidence back into Identity, calibrating your standards and strengthening execution.
              </span>
            </div>
            <Link href="/progress-builder" className="edSecondaryLink">
              <span>Apply this framework to your plan</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
