"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Repeat,
  Users
} from "lucide-react";
import { site } from "@/lib/site";

type Pathway = {
  id: string;
  tabLabel: string;
  icon: typeof Compass;
  diagnosis: string;
  rootObstacle: string;
  solutionTitle: string;
  solutionDescription: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
  highlightPill: string;
};

const PATHWAYS: Pathway[] = [
  {
    id: "clarity",
    tabLabel: "I don't know where to start.",
    icon: Compass,
    highlightPill: "The Clarity Bottleneck",
    diagnosis:
      "You have genuine drive, but it is fragmented across ten different open tabs, conflicting tutorials, and half-started projects. You start new ideas easily, but you never stay with one long enough to create proof.",
    rootObstacle:
      "A lack of clarity. When you refuse to choose one singular priority, you protect yourself from the discomfort of being tested. Ambiguity feels safe; commitment feels vulnerable.",
    solutionTitle: "Lock In Your Primary Track & 90-Day Finish Line",
    solutionDescription:
      "Take our guided 10-step intake diagnostic. We evaluate your actual time constraints, existing capabilities, and honest bandwidth to strip away distractions and establish ONE core capability, clear 30/60/90-day deliverables, and an emergency minimum rule.",
    deliverables: [
      "10-section diagnostic intake (~15 mins)",
      "One defined primary skill track (eliminating distraction)",
      "Concrete 30, 60, and 90-day capstone deliverables",
      "Individualized 12-week roadmap and downloadable blueprint"
    ],
    ctaLabel: "Build My 90-Day Progress Plan",
    ctaHref: "/progress-builder?start=true"
  },
  {
    id: "systems",
    tabLabel: "I have goals, but I struggle to follow through.",
    icon: Repeat,
    highlightPill: "The Systems & Execution Bottleneck",
    diagnosis:
      "You experience bursts of Sunday night inspiration, make ambitious task lists, and run out of willpower by Wednesday evening. Then guilt sets in, followed by another cycle of waiting for motivation.",
    rootObstacle:
      "Weak daily systems. You are asking willpower to carry a routine with too much friction. Motivation is an emotion that fluctuates hourly; a system is an environment where showing up is the default.",
    solutionTitle: "Install Protected Windows & The Emergency Minimum Rule",
    solutionDescription:
      "Stop relying on dramatic surges of energy. Build a sustainable structure using protected calendar blocks, the 'Never Miss Twice' recovery rule, and weekly proof-of-work reviews that keep you executing even when your mood drops.",
    deliverables: [
      "Protected daily focus windows before distraction enters",
      "The 15-minute emergency minimum rule for exhausted days",
      "A repeatable Sunday review audit to catch drift early",
      "Open-source frameworks and value creation guides"
    ],
    ctaLabel: "Explore Practical Systems & Guides",
    ctaHref: "/resources"
  },
  {
    id: "community",
    tabLabel: "I want to grow with people who challenge me.",
    icon: Users,
    highlightPill: "The Environment & Standards Bottleneck",
    diagnosis:
      "You are trying to raise your standards while remaining in an everyday environment that tolerates passive drifting. In isolation, quiet compromises go unnoticed, and settling for less feels normal.",
    rootObstacle:
      "Environment. It is nearly impossible to sustain disciplined execution when nobody around you expects it. Who you talk to and compare your daily progress against shapes what you consider acceptable.",
    solutionTitle: "Enter a Structured Cadence of Real Proof",
    solutionDescription:
      "Join a community of students, builders, and professionals who refuse to settle for passive drift. We meet every Wednesday live for practical problem-solving and check in every Friday with verifiable evidence of work completed.",
    deliverables: [
      "Live Wednesday teaching sessions & honest Q&A",
      "Friday evidence submissions (show proof, not intentions)",
      "Focused reading circles around high-leverage books",
      "An active WhatsApp community of serious practitioners"
    ],
    ctaLabel: "Join Wednesday's Live Session",
    ctaHref: site.communityUrl,
    ctaExternal: true
  }
];

export function PathwaySelector() {
  const [activeId, setActiveId] = useState<string>(PATHWAYS[0].id);
  const activePathway = PATHWAYS.find((p) => p.id === activeId) || PATHWAYS[0];

  return (
    <section className="sectionPad pathwaySection" id="pathways" aria-labelledby="pathways-heading">
      <div className="shell">
        <div className="pathwayHeaderCenter">
          <span className="editorialEyebrow">Recognition & Direction</span>
          <h2 id="pathways-heading" className="pathwayMainHeading">
            You don&apos;t need another motivational speech. You need a way forward.
          </h2>
          <p className="pathwaySubtitle">
            Mediocrity is sustained when we mistake the symptom for the cause. We don&apos;t judge where
            you are right now — but taking responsibility starts with an honest diagnosis. Choose what
            best reflects your current friction:
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="pathwayTabsTrack" role="tablist" aria-label="Select your starting challenge">
          {PATHWAYS.map((path) => {
            const Icon = path.icon;
            const isSelected = path.id === activeId;
            return (
              <button
                key={path.id}
                role="tab"
                id={`tab-${path.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${path.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={`pathwayTabButton ${isSelected ? "isActive" : ""}`}
                onClick={() => setActiveId(path.id)}
                type="button"
              >
                <Icon size={18} className="pathwayTabIcon" aria-hidden="true" />
                <span>&ldquo;{path.tabLabel}&rdquo;</span>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Content Panel */}
        <div
          id={`panel-${activePathway.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activePathway.id}`}
          className="pathwayPanelCard"
        >
          <div className="pathwayPanelGrid">
            {/* Left Col: Diagnostic Breakdown */}
            <div className="pathwayDiagnosisCol">
              <div className="pathwayPanelTag">
                <activePathway.icon size={15} aria-hidden="true" />
                <span>{activePathway.highlightPill}</span>
              </div>

              <div className="pathwayDiagnosisBlock">
                <span className="pathwayBlockLabel">The Honest Reality</span>
                <p className="pathwayDiagnosisText">{activePathway.diagnosis}</p>
              </div>

              <div className="pathwayObstacleBlock">
                <span className="pathwayBlockLabel">The Real Bottleneck</span>
                <p className="pathwayObstacleText">{activePathway.rootObstacle}</p>
              </div>
            </div>

            {/* Right Col: The Structured Solution & Deliverables */}
            <div className="pathwaySolutionCol">
              <span className="pathwaySolutionEyebrow">The Align Mindset Method</span>
              <h3 className="pathwaySolutionTitle">{activePathway.solutionTitle}</h3>
              <p className="pathwaySolutionDesc">{activePathway.solutionDescription}</p>

              <div className="pathwayDeliverablesList">
                <span className="pathwayDeliverablesHeading">What you gain immediately:</span>
                <ul>
                  {activePathway.deliverables.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} className="pathwayCheckIcon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pathwayActionWrap">
                {activePathway.ctaExternal ? (
                  <a
                    href={activePathway.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="primaryButton pathwayCtaBtn"
                  >
                    {activePathway.ctaLabel}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={activePathway.ctaHref} className="primaryButton pathwayCtaBtn">
                    {activePathway.ctaLabel}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
