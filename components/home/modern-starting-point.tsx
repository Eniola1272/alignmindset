"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  FileCheck,
  Flame,
  Layers,
  Repeat,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench
} from "lucide-react";

type PathKey = "clarity" | "consistency" | "accountability";

type PathData = {
  key: PathKey;
  num: string;
  badge: string;
  title: string;
  tagline: string;
  diagnosis: string;
  assessmentName: string;
  goal: string;
  track: string;
  skills: string;
  milestones: string;
  routine: string;
  action: string;
  review: string;
  ctaUrl: string;
};

const PATHS: Record<PathKey, PathData> = {
  clarity: {
    key: "clarity",
    num: "01",
    badge: "The Clarity Pathway",
    title: "I need clarity about my direction.",
    tagline: "You have real ambition, but it's scattered across too many open tabs, tutorials, and uncommitted ideas.",
    diagnosis:
      "You don't lack talent; you lack a singular destination. Trying to pursue five paths simultaneously guarantees shallow progress in all of them. The diagnostic helps you pick ONE primary track and eliminate the other nineteen.",
    assessmentName: "Direction & Focus Diagnostic",
    goal: "Ship 2 production full-stack web applications with documented technical case studies.",
    track: "Next.js App Router, TypeScript & Accessible UI Systems",
    skills: "Component Architecture, Server Actions, PostgreSQL & Vitest automated testing.",
    milestones: "M1: Component library • M2: Full-stack authenticated app • M3: Public SaaS tool & architecture case study.",
    routine: "6:30 AM – 7:45 AM (Mon–Fri). Emergency Min: 15 mins reviewing PR diffs if exhausted.",
    action: "Initialize GitHub repo, configure TypeScript & write Day 30 component specification.",
    review: "Sunday at 6:00 PM: 15-minute audit of Git commit diffs & next week's focus blocks.",
    ctaUrl: "/progress-builder?start=true&focus=clarity"
  },
  consistency: {
    key: "consistency",
    num: "02",
    badge: "The Systems Pathway",
    title: "I know what I want, but I struggle with consistency.",
    tagline: "You know what skill to build, but discipline evaporates by midweek and routines keep collapsing.",
    diagnosis:
      "You are relying on willpower instead of systems. Willpower is an emotional battery that drains by Wednesday afternoon. The solution is protected calendar blocks, low friction, and an emergency minimum rule for low-energy days.",
    assessmentName: "Daily Systems & Friction Audit",
    goal: "Publish 12 high-depth technical essays and compile them into an open-source guide.",
    track: "Technical Writing, Research Synthesis & Content Architecture",
    skills: "Clear technical explanations, systematic research, markdown publishing workflows.",
    milestones: "M1: Drafting checklist & 4 essays • M2: Essays 5–8 & newsletter list • M3: Compiled 50-page downloadable guide.",
    routine: "7:00 AM – 8:00 AM (Mon–Fri). Emergency Min: 100 words or 1 outline if exhausted.",
    action: "Draft the 5-point thesis outline for Essay #1 and block out 7:00 AM in your calendar.",
    review: "Sunday at 5:30 PM: Audit word count, reader feedback, and outline the coming week.",
    ctaUrl: "/progress-builder?start=true&focus=consistency"
  },
  accountability: {
    key: "accountability",
    num: "03",
    badge: "The Accountability Pathway",
    title: "I need structure, skills, and accountability.",
    tagline: "You are building in isolation without high standards, external feedback, or proof of real market competence.",
    diagnosis:
      "In isolation, quiet compromise feels harmless. When nobody expects you to deliver on Friday, pushing work to next week becomes a habit. Growth accelerates when you show up with proof in a community of high standards.",
    assessmentName: "Competence & Capstone Diagnostic",
    goal: "Complete 2 industry-grade product design case studies and earn an apprenticeship interview.",
    track: "Product Design, Interactive Prototyping & Design Systems",
    skills: "User research, interactive Figma prototypes, design tokens, usability testing.",
    milestones: "M1: 8 user interviews & wireframes • M2: High-fidelity prototype • M3: Live portfolio & mentor presentation.",
    routine: "8:00 PM – 9:15 PM (Mon, Tue, Thu) + Wednesday Live Lab. Emergency Min: 20m design audit.",
    action: "Submit application to the Wednesday Live Lab and draft the 1-page case study brief.",
    review: "Friday at 7:00 PM: Submit weekly Figma progress link to the community evidence channel.",
    ctaUrl: "/progress-builder?start=true&focus=accountability"
  }
};

export function ModernStartingPoint() {
  const [activeKey, setActiveKey] = useState<PathKey>("clarity");
  const current = PATHS[activeKey];
  const keys: PathKey[] = ["clarity", "consistency", "accountability"];

  return (
    <section className="modSection" id="starting-point" aria-labelledby="sp-heading">
      <div className="shell">
        {/* Modern Section Header */}
        <div className="modSectionHeader">
          <span className="modSectionBadge">Step 01 • Find Your Starting Point</span>
          <h2 id="sp-heading" className="modSectionTitle">
            Where are you feeling stuck right now?
          </h2>
          <p className="modSectionLead">
            Growth doesn&apos;t start with an emotional overhaul. It begins by diagnosing the single
            bottleneck stopping your momentum. Select the challenge that reflects your current reality:
          </p>
        </div>

        {/* 3 Modern Interactive Selector Cards */}
        <div className="spCardsGrid" role="tablist" aria-label="Starting point options">
          {keys.map((k) => {
            const item = PATHS[k];
            const isSelected = k === activeKey;

            return (
              <button
                key={k}
                role="tab"
                id={`tab-${k}`}
                aria-selected={isSelected}
                aria-controls={`panel-${k}`}
                className={`spCard ${isSelected ? "isActive" : ""}`}
                onClick={() => setActiveKey(k)}
                type="button"
              >
                <div className="spCardHeader">
                  <span className="spCardNum">{item.num}</span>
                  <span className="spCardBadge">{item.badge}</span>
                </div>
                <h3 className="spCardTitle">&ldquo;{item.title}&rdquo;</h3>
                <p className="spCardTagline">{item.tagline}</p>
                <div className="spCardFooter">
                  <span className="spSelectText">
                    {isSelected ? "Active Roadmap ↓" : "Select Challenge →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sleek Modern Solution & Sample Plan Container */}
        <div
          id={`panel-${current.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.key}`}
          className="spPlanContainer"
        >
          {/* Top Diagnosis & Action Strip */}
          <div className="spDiagnosisStrip">
            <div className="diagnosisCopy">
              <span className="stripEyebrow">The Diagnosis</span>
              <p className="diagnosisText">{current.diagnosis}</p>
            </div>
            <div className="diagnosisCtaCol">
              <span className="stripEyebrow">Recommended Next Step</span>
              <strong className="assessmentNameText">{current.assessmentName}</strong>
              <Link href={current.ctaUrl} className="modPrimaryBtn spCtaBtn">
                <span>Start 10-Step Assessment</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <small className="spCtaHint">~15 mins • 100% Free • Autosaves in browser</small>
            </div>
          </div>

          {/* Clean 6-Tile Progress Plan Preview */}
          <div className="spBlueprintPreview">
            <div className="blueprintHeader">
              <div>
                <span className="blueprintLabel">Illustrative Sample 90-Day Blueprint</span>
                <h4 className="blueprintGoalTitle">{current.goal}</h4>
              </div>
              <span className="trackPill">{current.track}</span>
            </div>

            <div className="blueprintGrid">
              {/* Tile 1: Required Skills */}
              <div className="bpTile">
                <div className="bpTileHeader">
                  <Wrench size={15} className="bpIcon" aria-hidden="true" />
                  <strong>Skills & Resources</strong>
                </div>
                <p>{current.skills}</p>
              </div>

              {/* Tile 2: Milestones */}
              <div className="bpTile">
                <div className="bpTileHeader">
                  <Layers size={15} className="bpIcon" aria-hidden="true" />
                  <strong>Monthly Milestones</strong>
                </div>
                <p>{current.milestones}</p>
              </div>

              {/* Tile 3: Routine */}
              <div className="bpTile">
                <div className="bpTileHeader">
                  <Clock size={15} className="bpIcon" aria-hidden="true" />
                  <strong>Daily Routine</strong>
                </div>
                <p>{current.routine}</p>
              </div>

              {/* Tile 4: Today's Action */}
              <div className="bpTile isHighlight">
                <div className="bpTileHeader">
                  <Flame size={15} className="bpIcon isGold" aria-hidden="true" />
                  <strong>Today&apos;s Next Action (24h)</strong>
                </div>
                <p>{current.action}</p>
              </div>

              {/* Tile 5: Weekly Audit */}
              <div className="bpTile">
                <div className="bpTileHeader">
                  <FileCheck size={15} className="bpIcon" aria-hidden="true" />
                  <strong>Weekly Review Checkpoint</strong>
                </div>
                <p>{current.review}</p>
              </div>

              {/* Tile 6: Output Guarantee */}
              <div className="bpTile isCta">
                <div className="bpTileHeader">
                  <Sparkles size={15} className="bpIcon isGold" aria-hidden="true" />
                  <strong>Ready to build yours?</strong>
                </div>
                <p>Generate your custom 12-week blueprint and downloadable PDF.</p>
                <Link href={current.ctaUrl} className="bpCtaLink">
                  <span>Build My 90-Day Plan</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

