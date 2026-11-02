"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";

export type StartingPointKey = "clarity" | "consistency" | "accountability";

type StartingPointData = {
  key: StartingPointKey;
  num: string;
  tabTitle: string;
  tabQuestion: string;
  tagline: string;
  badge: string;
  diagnosis: string;
  bottleneckExplanation: string;
  assessmentTitle: string;
  assessmentDescription: string;
  assessmentFocus: string[];
  ctaUrl: string;
  // Typeset Ledger Data
  planDestination: string;
  planTrack: string;
  skillsRequired: string[];
  resourcesRequired: string[];
  milestones: Array<{
    period: string;
    target: string;
    deliverable: string;
    isCapstone?: boolean;
  }>;
  dailyRoutine: {
    window: string;
    hours: string;
    rule: string;
  };
  todaysAction: {
    task: string;
    rule: string;
  };
  weeklyAudit: {
    time: string;
    agenda: string;
  };
};

const STARTING_POINTS: Record<StartingPointKey, StartingPointData> = {
  clarity: {
    key: "clarity",
    num: "01",
    tabTitle: "Direction & Focus",
    tabQuestion: "I need clarity about my direction.",
    tagline: "For when you have ambition, but it is scattered across too many open tabs, conflicting courses, and uncommitted ideas.",
    badge: "Diagnostic Pathway 01",
    diagnosis:
      "You don't lack potential; you lack a singular destination. When you try to explore five different fields at once, you never make deep enough contact with one to develop real competence. Ambiguity feels safe because you cannot fail at what you haven't committed to.",
    bottleneckExplanation:
      "A lack of clarity. When you refuse to choose one primary destination, you protect yourself from the discomfort of being tested. Deciding what NOT to pursue is the hardest and most important step.",
    assessmentTitle: "Direction & Focus Diagnostic",
    assessmentDescription:
      "A guided 10-step intake that analyzes your current skills, natural inclinations, and real-world constraints to eliminate distractions and lock in ONE primary skill track with an unambiguous 90-day finish line.",
    assessmentFocus: [
      "Audit your existing capabilities and natural leverage points",
      "Eliminate secondary distractions and choose one primary track",
      "Define tangible 30/60/90-day deliverables with clear acceptance criteria",
      "Synthesize an individualized 12-week roadmap and PDF blueprint"
    ],
    ctaUrl: "/progress-builder?start=true&focus=clarity",
    planDestination: "Frontend Developer with 2 Documented Production Case Studies",
    planTrack: "Next.js App Router, TypeScript & Accessible UI Systems",
    skillsRequired: [
      "TypeScript & Component Architecture",
      "State Management & Server Actions",
      "Accessible UI Systems (W3C Standards)",
      "Automated Testing (Playwright / Vitest)"
    ],
    resourcesRequired: [
      "Modern Web Development Project Specification",
      "Supabase Database & Authentication",
      "Vercel Deployment Pipeline"
    ],
    milestones: [
      {
        period: "Month 1 (Day 30)",
        target: "Accessible Design System & Library",
        deliverable: "Documented component system with 100% test coverage published to Storybook."
      },
      {
        period: "Month 2 (Day 60)",
        target: "Full-Stack Web Application",
        deliverable: "Authenticated production application with database schema and payment integration."
      },
      {
        period: "Month 3 (Day 90)",
        target: "Collaborative SaaS Case Study",
        deliverable: "Live public tool with recorded video walkthrough and architectural case study.",
        isCapstone: true
      }
    ],
    dailyRoutine: {
      window: "6:30 AM – 7:45 AM (Monday to Friday)",
      hours: "6.25 hrs deliberate practice / week",
      rule: "The 15-Minute Emergency Minimum: If exhausted or overwhelmed, review code diffs or read 1 technical RFC. Never miss twice."
    },
    todaysAction: {
      task: "Initialize the Git repository, configure TypeScript & Tailwind, and write the Day 30 component specification file.",
      rule: "Stop waiting for next Monday. Momentum begins with one completed file today."
    },
    weeklyAudit: {
      time: "Sunday at 6:00 PM (15-Minute Audit)",
      agenda: "Review weekly Git commit diffs, audit hours logged vs. planned, and set calendar focus blocks for the upcoming 7 days."
    }
  },

  consistency: {
    key: "consistency",
    num: "02",
    tabTitle: "Daily Systems & Habits",
    tabQuestion: "I know what I want, but I struggle with consistency.",
    tagline: "For when you know what skill to build, but discipline evaporates by midweek and routines keep falling apart.",
    badge: "Diagnostic Pathway 02",
    diagnosis:
      "You are asking willpower to carry a daily routine that has too much friction. Willpower is a depleting resource that drops when you are tired, stressed, or distracted. Consistency is not an emotional trait; it is an environmental architecture.",
    bottleneckExplanation:
      "Weak daily systems. You rely on sudden surges of Sunday night enthusiasm that vanish by Wednesday morning. When your calendar has no protected windows, distraction wins every single time.",
    assessmentTitle: "Daily Execution & Friction Audit",
    assessmentDescription:
      "A structured 10-step intake to identify hidden time leaks, configure protected daily focus windows, and install emergency recovery protocols so your progress survives low-energy days.",
    assessmentFocus: [
      "Diagnose where your daily routines break down and why",
      "Lock in protected morning or evening focus windows before distraction enters",
      "Establish the 15-minute emergency minimum rule to protect streak momentum",
      "Design an environment where showing up is the path of least resistance"
    ],
    ctaUrl: "/progress-builder?start=true&focus=consistency",
    planDestination: "Published Technical Writer with 12 Evergreen Essays & Developer Guide",
    planTrack: "Technical Writing, Research Synthesis & Content Architecture",
    skillsRequired: [
      "High-Clarity Technical Explanations",
      "Systematic Research & Outline Synthesis",
      "Markdown & Digital Publishing Workflows",
      "Audience Feedback Loops & Distribution"
    ],
    resourcesRequired: [
      "Friction-free writing workspace (Obsidian / Notion)",
      "Curated reading & primary research database",
      "Personal publication domain or Substack"
    ],
    milestones: [
      {
        period: "Month 1 (Day 30)",
        target: "Editorial Workflow & First 4 Essays",
        deliverable: "Establish drafting checklist and publish 4 foundational essays on core engineering mental models."
      },
      {
        period: "Month 2 (Day 60)",
        target: "Distribution Engine & Essays 5–8",
        deliverable: "Publish Essays 5–8, build newsletter distribution list, and receive peer feedback from senior engineers."
      },
      {
        period: "Month 3 (Day 90)",
        target: "Compiled 50-Page Downloadable Guide",
        deliverable: "Publish Essays 9–12 and release the compiled, formatted 50-page open-source guide.",
        isCapstone: true
      }
    ],
    dailyRoutine: {
      window: "7:00 AM – 8:00 AM (Monday to Friday)",
      hours: "5.0 hrs uninterrupted drafting / week",
      rule: "The 15-Minute Emergency Minimum: Write 100 words or bullet-outline one concept if completely drained. Never miss twice."
    },
    todaysAction: {
      task: "Select the topic for Essay #1, draft the 5-point thesis outline, and block out 7:00 AM in your calendar for tomorrow.",
      rule: "Do not attempt to write the entire piece today. Focus strictly on completing the structural skeleton."
    },
    weeklyAudit: {
      time: "Sunday at 5:30 PM (20-Minute Audit)",
      agenda: "Audit word count, review reader comments, and queue up research notes and outlines for the upcoming week."
    }
  },

  accountability: {
    key: "accountability",
    num: "03",
    tabTitle: "Structure & Accountability",
    tabQuestion: "I need structure, skills, and accountability to make progress.",
    tagline: "For when you are building in isolation without high standards, external feedback, or verifiable proof of work.",
    badge: "Diagnostic Pathway 03",
    diagnosis:
      "In isolation, quiet compromises go unnoticed. When nobody expects you to deliver on Friday, pushing your work to 'next week' feels harmless. Real growth accelerates when you work alongside people who expect you to show up with proof, not excuses.",
    bottleneckExplanation:
      "Environment and lack of external accountability. It is statistically near-impossible to maintain exceptional standards when your everyday environment tolerates passive drift and procrastination.",
    assessmentTitle: "Competence, Capstone & Accountability Diagnostic",
    assessmentDescription:
      "A guided 10-step intake that connects your learning to a public capstone project, integrates our weekly 4-day execution cadence, and matches you with peer review and mentor feedback.",
    assessmentFocus: [
      "Scope a public, undeniable capstone project to prove competence",
      "Plug into the weekly Monday/Wednesday/Friday/Sunday execution rhythm",
      "Set up public Friday evidence check-ins to eliminate quiet excuses",
      "Access live peer reviews and experienced mentor problem-solving"
    ],
    ctaUrl: "/progress-builder?start=true&focus=accountability",
    planDestination: "Product Designer with 2 Industry-Grade Case Studies & Apprenticeship Proof",
    planTrack: "Product Design, User Research, Interactive Prototyping & Design Systems",
    skillsRequired: [
      "User Interviewing & Problem Definition",
      "High-Fidelity Interactive Prototyping (Figma)",
      "Design Systems & Token Architecture",
      "Usability Testing & Design Handoff"
    ],
    resourcesRequired: [
      "Figma Professional workspace",
      "Cohort critique channel on WhatsApp & virtual room",
      "User testing participant pool (10 volunteers)"
    ],
    milestones: [
      {
        period: "Month 1 (Day 30)",
        target: "Problem Discovery & Wireframes",
        deliverable: "Complete 8 user interviews, user journey flows, and wireframes for Case Study #1; present at Wednesday lab."
      },
      {
        period: "Month 2 (Day 60)",
        target: "Interactive Prototype & Usability Test",
        deliverable: "Deliver interactive prototype in Figma, conduct 5 usability testing sessions, and log Friday proof-of-work."
      },
      {
        period: "Month 3 (Day 90)",
        target: "Live Portfolio & Apprenticeship Launch",
        deliverable: "Launch live responsive portfolio with both documented case studies and present to cohort mentors.",
        isCapstone: true
      }
    ],
    dailyRoutine: {
      window: "8:00 PM – 9:15 PM (Mon, Tue, Thu) + Wed Live Lab",
      hours: "9.0 hrs design execution + critique / week",
      rule: "The 20-Minute Emergency Minimum: 20 minutes component audit or reading 1 design teardown if overtime at work. Never miss twice."
    },
    todaysAction: {
      task: "Submit your application to the Wednesday Live Lab and draft the 1-page problem brief for your first case study.",
      rule: "Public accountability starts today. State what you plan to build so your peers can expect your Friday evidence."
    },
    weeklyAudit: {
      time: "Friday at 7:00 PM (Weekly Evidence Logging)",
      agenda: "Post weekly Figma progress link and design decisions to the community evidence channel for peer critique."
    }
  }
};

export function StartingPointExperience() {
  const [selectedKey, setSelectedKey] = useState<StartingPointKey>("clarity");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const keys: StartingPointKey[] = ["clarity", "consistency", "accountability"];
  const current = STARTING_POINTS[selectedKey];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % keys.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + keys.length) % keys.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = keys.length - 1;
    } else {
      return;
    }

    const nextKey = keys[nextIndex];
    setSelectedKey(nextKey);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      className="edSection edStartingPoint"
      id="starting-point"
      aria-labelledby="starting-point-title"
    >
      <div id="pathways" className="scrollAnchor" aria-hidden="true" />
      <div id="practice" className="scrollAnchor" aria-hidden="true" />

      <div className="shell">
        {/* Section Header */}
        <div className="edSectionHeader">
          <div className="edSectionMeta">
            <span>Diagnostic Intake</span>
            <span className="edDot" aria-hidden="true">•</span>
            <span>Section 02</span>
          </div>
          <h2 id="starting-point-title" className="edSectionHeading">
            Where are you feeling stuck right now?
          </h2>
          <p className="edSectionLead">
            Growth does not begin with an emotional overhaul. It begins by diagnosing the single
            friction point currently arresting your progress. Select the statement that reflects your
            honest reality:
          </p>
        </div>

        {/* Tabbed Consultation Selector */}
        <div
          className="edConsultationTabs"
          role="tablist"
          aria-label="Select your starting challenge"
        >
          {keys.map((k, index) => {
            const item = STARTING_POINTS[k];
            const isSelected = k === selectedKey;

            return (
              <button
                key={k}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`starting-tab-${k}`}
                aria-selected={isSelected}
                aria-controls={`starting-panel-${k}`}
                tabIndex={isSelected ? 0 : -1}
                className={`edConsultationTab ${isSelected ? "isActive" : ""}`}
                onClick={() => setSelectedKey(k)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                type="button"
              >
                <span className="tabIndex">{item.num}</span>
                <span className="tabQuestion">&ldquo;{item.tabQuestion}&rdquo;</span>
                <span className="tabMetaLabel">{item.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Consultation Panel */}
        <div
          id={`starting-panel-${current.key}`}
          role="tabpanel"
          aria-labelledby={`starting-tab-${current.key}`}
          className="edConsultationPanel"
        >
          {/* Top Editorial Diagnosis Row */}
          <div className="edDiagnosisGrid">
            <div className="edDiagnosisColumn">
              <span className="edLedgerSub">The Honest Reality</span>
              <p className="edDiagnosisLead">{current.diagnosis}</p>
            </div>
            <div className="edBottleneckColumn">
              <span className="edLedgerSub">The Core Bottleneck</span>
              <p className="edBottleneckText">{current.bottleneckExplanation}</p>
              
              <div className="edAssessmentGateway">
                <div className="gatewayText">
                  <strong>Recommended Step: {current.assessmentTitle}</strong>
                  <p>{current.assessmentDescription}</p>
                </div>
                <Link href={current.ctaUrl} className="edPrimaryBtn">
                  <span>Start the 10-Step Assessment</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <small className="gatewayNote">~15 minutes • Free & Private • Saves automatically</small>
              </div>
            </div>
          </div>

          {/* Typeset 90-Day Progress Ledger & Syllabus Document */}
          <div className="edLedgerDocument">
            <div className="ledgerDocHeader">
              <div className="ledgerDocMeta">
                <span className="docType">Illustrative Progress Syllabus</span>
                <span className="docSlash">/</span>
                <span className="docTrack">{current.planTrack}</span>
              </div>
              <span className="ledgerStatusTag">Sample Blueprint</span>
            </div>

            <div className="ledgerDestinationRow">
              <span className="ledgerRowLabel">90-Day Destination</span>
              <h3 className="ledgerDestinationHeading">{current.planDestination}</h3>
            </div>

            {/* Structured Syllabus Ledger Table */}
            <div className="ledgerTable">
              {/* Row 1: Required Skills & Resources */}
              <div className="ledgerTableRow">
                <div className="tableLabelCol">
                  <span>01. Required Competencies & Tools</span>
                </div>
                <div className="tableContentCol">
                  <div className="competencyGrid">
                    <div>
                      <strong>Deliberate Skill Drills</strong>
                      <ul className="ledgerList">
                        {current.skillsRequired.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Required Workspace & Tools</strong>
                      <ul className="ledgerList isResources">
                        {current.resourcesRequired.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 3-Month Deliverables */}
              <div className="ledgerTableRow">
                <div className="tableLabelCol">
                  <span>02. 30 / 60 / 90-Day Milestones</span>
                </div>
                <div className="tableContentCol">
                  <div className="milestonesSchedule">
                    {current.milestones.map((m) => (
                      <div key={m.period} className={`scheduleItem ${m.isCapstone ? "isCapstone" : ""}`}>
                        <div className="scheduleHeader">
                          <span className="schedulePeriod">{m.period}</span>
                          <strong className="scheduleTarget">{m.target}</strong>
                        </div>
                        <p className="scheduleDeliverable">{m.deliverable}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Daily Execution Routine */}
              <div className="ledgerTableRow">
                <div className="tableLabelCol">
                  <span>03. Daily Operating Routine</span>
                </div>
                <div className="tableContentCol">
                  <div className="routineSchedule">
                    <div className="routineItem">
                      <span className="routineLabel">Protected Focus Window</span>
                      <strong>{current.dailyRoutine.window}</strong>
                    </div>
                    <div className="routineItem">
                      <span className="routineLabel">Weekly Volume</span>
                      <strong>{current.dailyRoutine.hours}</strong>
                    </div>
                    <div className="routineItem isRule">
                      <span className="routineLabel">Recovery Protocol</span>
                      <p>{current.dailyRoutine.rule}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: 24h Commitment & Review */}
              <div className="ledgerTableRow">
                <div className="tableLabelCol">
                  <span>04. Commitment & Review Cadence</span>
                </div>
                <div className="tableContentCol">
                  <div className="commitmentGrid">
                    <div className="commitmentBox isAction">
                      <span className="commitmentLabel">Next 24-Hour Commitment</span>
                      <strong>{current.todaysAction.task}</strong>
                      <p>{current.todaysAction.rule}</p>
                    </div>
                    <div className="commitmentBox isAudit">
                      <span className="commitmentLabel">Weekly Review Checkpoint</span>
                      <strong>{current.weeklyAudit.time}</strong>
                      <p>{current.weeklyAudit.agenda}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Footer Call to Action */}
            <div className="ledgerDocFooter">
              <div className="docFooterCopy">
                <strong>Ready to produce your customized 90-day progress syllabus?</strong>
                <p>Take the 10-section guided assessment. Clarify your destination and receive your complete blueprint.</p>
              </div>
              <Link href={current.ctaUrl} className="edPrimaryBtn">
                <span>Produce My 90-Day Plan</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
