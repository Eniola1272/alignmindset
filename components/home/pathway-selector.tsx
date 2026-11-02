"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileCheck,
  Flame,
  HelpCircle,
  MessageCircle,
  Repeat,
  ShieldCheck,
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
    highlightPill: "Direction & Focus Diagnostic",
    diagnosis: "You have ambition, but it is scattered across too many tabs, ideas, and half-started courses.",
    rootObstacle:
      "Information overload and lack of a singular baseline. When everything feels important, nothing gets executed.",
    solutionTitle: "Synthesize an Individualized 90-Day Roadmap",
    solutionDescription:
      "Take our guided 10-step intake assessment. We analyze your time capacity, current skillset, and constraints to lock in ONE primary skill track, 30/60/90-day deliverables, and an emergency minimum rule.",
    deliverables: [
      "10-section diagnostic intake (~15 mins)",
      "Automated personalized 12-week progression plan",
      "Defined Day 30, Day 60, and Day 90 capstone projects",
      "Downloadable PDF blueprint with daily focus windows"
    ],
    ctaLabel: "Build My 90-Day Progress Plan",
    ctaHref: "/progress-builder?start=true"
  },
  {
    id: "systems",
    tabLabel: "I have goals, but I struggle to follow through.",
    icon: Repeat,
    highlightPill: "Systems & Discipline Architecture",
    diagnosis: "You get bursts of inspiration on Sunday, set lofty goals, and run out of willpower by Wednesday evening.",
    rootObstacle:
      "Relying on emotions instead of friction-free daily systems. Willpower is a depreciating resource; systems are permanent.",
    solutionTitle: "Build Daily Execution Rhythms & Emergency Minimums",
    solutionDescription:
      "Switch from high-friction targets to protected time-blocking, the 'Never Miss Twice' recovery rule, and weekly proof-of-work reviews that keep working even when your mood drops.",
    deliverables: [
      "Protected morning/evening focus slot configuration",
      "The 15-minute emergency minimum rule for busy days",
      "Weekly Sunday review framework to audit execution",
      "Practical open-source templates and growth guides"
    ],
    ctaLabel: "Explore Practical Systems & Guides",
    ctaHref: "/resources"
  },
  {
    id: "community",
    tabLabel: "I want to grow with people who challenge me.",
    icon: Users,
    highlightPill: "Peer Accountability Cohort",
    diagnosis: "You are building in silence. Without a peer circle expecting your progress, quiet drifting goes unnoticed.",
    rootObstacle:
      "Isolation. It is statistically near-impossible to maintain exceptional standards in an environment of casual settling.",
    solutionTitle: "Join the Weekly Wednesday Live Growth Session",
    solutionDescription:
      "Step into a disciplined community of students, builders, creators, and professionals who meet live every Wednesday for practical teaching, honest Q&A, and Friday evidence check-ins.",
    deliverables: [
      "Live Wednesday teaching & interactive Q&A workshops",
      "Friday evidence logging: show proof of what you built",
      "Curated reading circles & shared challenges",
      "Active WhatsApp community of serious builders"
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
            Growth starts by diagnosing the honest bottleneck. Select what best describes your current
            challenge to see the exact structure that gets you moving:
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

