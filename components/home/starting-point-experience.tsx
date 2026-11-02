"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Flame,
  Layers,
  Repeat,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench
} from "lucide-react";

export type StartingPointKey = "clarity" | "consistency" | "accountability";

type StartingPointData = {
  key: StartingPointKey;
  num: string;
  tabLabel: string;
  shortLabel: string;
  tagline: string;
  badge: string;
  icon: typeof Compass;
  diagnosis: string;
  bottleneckExplanation: string;
  assessmentTitle: string;
  assessmentDescription: string;
  assessmentFocus: string[];
  ctaUrl: string;
  // Illustrative 6-part Plan
  planDestination: string;
  planTrack: string;
  skillsRequired: string[];
  resourcesRequired: string[];
  milestoneM1: { title: string; desc: string };
  milestoneM2: { title: string; desc: string };
  milestoneM3: { title: string; desc: string };
  weeklyRoutine: {
    focusWindow: string;
    weeklyHours: string;
    cadence: string;
    emergencyMinimum: string;
  };
  todaysAction: {
    action: string;
    note: string;
  };
  reviewCheckpoint: {
    schedule: string;
    agenda: string;
  };
};

const STARTING_POINTS: Record<StartingPointKey, StartingPointData> = {
  clarity: {
    key: "clarity",
    num: "01",
    tabLabel: "I need clarity about my direction.",
    shortLabel: "Direction & Focus",
    tagline: "For when you have ambition, but it is scattered across too many open tabs, conflicting courses, and uncommitted ideas.",
    badge: "Starting Point 01 • The Clarity Pathway",
    icon: Compass,
    diagnosis:
      "You don't lack potential; you lack a singular focus. When you try to explore five different fields at once, you never make deep enough contact with one to develop real competence. Ambiguity feels safe because you can't fail at what you haven't committed to.",
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
      "State Management & Data Fetching",
      "Accessible UI Systems (ARIA standards)",
      "Automated Testing (Playwright / Vitest)"
    ],
    resourcesRequired: [
      "Modern Web Development Specification doc",
      "Supabase Database (Free Tier)",
      "GitHub & Vercel deployment pipeline"
    ],
    milestoneM1: {
      title: "Month 1 (Day 30): Component Library",
      desc: "Architect an accessible, reusable UI component library documented in Storybook with 100% test coverage."
    },
    milestoneM2: {
      title: "Month 2 (Day 60): Full-Stack Web App",
      desc: "Deliver an authenticated production application with database integration, payment processing, and automated emails."
    },
    milestoneM3: {
      title: "Month 3 (Day 90 Capstone): SaaS Case Study",
      desc: "Deploy a live collaborative productivity tool with comprehensive technical documentation and a video architecture breakdown."
    },
    weeklyRoutine: {
      focusWindow: "6:30 AM – 7:45 AM (Mon – Fri)",
      weeklyHours: "6.25 hrs deliberate practice",
      cadence: "5 mornings/week before opening email",
      emergencyMinimum: "15 minutes reviewing PR diffs or reading 1 technical RFC if exhausted. Never miss twice."
    },
    todaysAction: {
      action: "Initialize the GitHub repository, configure TypeScript & Tailwind CSS, and write the Day 30 component specification file.",
      note: "Stop waiting for next Monday or ideal circumstances. Momentum begins with one completed file today."
    },
    reviewCheckpoint: {
      schedule: "Sunday at 6:00 PM (15-min audit)",
      agenda: "Review weekly Git commit diffs, audit hours logged vs. planned, and set calendar focus blocks for the upcoming 7 days."
    }
  },

  consistency: {
    key: "consistency",
    num: "02",
    tabLabel: "I know what I want, but I struggle with consistency.",
    shortLabel: "Systems & Habits",
    tagline: "For when you know what skill to build, but discipline evaporates by midweek and routines keep falling apart.",
    badge: "Starting Point 02 • The Systems Pathway",
    icon: Repeat,
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
    milestoneM1: {
      title: "Month 1 (Day 30): Workflow & 4 Essays",
      desc: "Establish a frictionless drafting checklist and publish 4 foundational essays on core engineering mental models."
    },
    milestoneM2: {
      title: "Month 2 (Day 60): Distribution & Essays 5–8",
      desc: "Publish Essays 5–8, build an email distribution list, and receive constructive critique from 3 experienced practitioners."
    },
    milestoneM3: {
      title: "Month 3 (Day 90 Capstone): Compiled Guide",
      desc: "Publish Essays 9–12 and compile the complete series into a free, beautifully formatted 50-page downloadable guide."
    },
    weeklyRoutine: {
      focusWindow: "7:00 AM – 8:00 AM (Mon – Fri)",
      weeklyHours: "5 hours uninterrupted writing",
      cadence: "4 days drafting/editing + 1 day publication",
      emergencyMinimum: "Write 100 words or bullet-outline one concept if completely drained. Never miss twice."
    },
    todaysAction: {
      action: "Select the topic for Essay #1, draft the 5-point thesis outline, and block out 7:00 AM in your calendar for tomorrow.",
      note: "Do not attempt to write the entire piece today. Focus strictly on completing the structural skeleton."
    },
    reviewCheckpoint: {
      schedule: "Sunday at 5:30 PM (20-min audit)",
      agenda: "Audit word count, review reader comments, and queue up research notes and outlines for the upcoming week."
    }
  },

  accountability: {
    key: "accountability",
    num: "03",
    tabLabel: "I need structure, skills, and accountability to make progress.",
    shortLabel: "Structure & Proof",
    tagline: "For when you are building in isolation without high standards, external feedback, or verifiable proof of work.",
    badge: "Starting Point 03 • The Accountability Pathway",
    icon: Users,
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
    milestoneM1: {
      title: "Month 1 (Day 30): Research & Wireframes",
      desc: "Complete 8 user interviews, map out user journey flows, and deliver low-fidelity wireframes for Case Study #1; present at Wednesday lab."
    },
    milestoneM2: {
      title: "Month 2 (Day 60): High-Fidelity Prototype",
      desc: "Deliver interactive prototype in Figma, conduct 5 usability testing sessions, and log weekly Friday evidence updates."
    },
    milestoneM3: {
      title: "Month 3 (Day 90 Capstone): Live Portfolio",
      desc: "Launch live responsive portfolio website with both documented case studies and present design teardown to cohort mentors."
    },
    weeklyRoutine: {
      focusWindow: "8:00 PM – 9:15 PM (Mon, Tue, Thu) + Wed Live Lab",
      weeklyHours: "7.5 hrs design execution + 1.5 hrs live critique",
      cadence: "4 evenings/week with Friday evidence logging",
      emergencyMinimum: "20 minutes component audit or reading 1 design teardown if overtime at work. Never miss twice."
    },
    todaysAction: {
      action: "Submit your application to the Wednesday Live Lab and draft the 1-page problem brief for your first case study.",
      note: "Public accountability starts today. State what you plan to build so your peers can expect your Friday evidence."
    },
    reviewCheckpoint: {
      schedule: "Friday at 7:00 PM (Weekly Evidence Logging)",
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
      className="sectionPad startingPointSection"
      id="starting-point"
      aria-labelledby="starting-point-title"
    >
      {/* Anchors for backward compatibility with previous link targets */}
      <div id="pathways" className="scrollAnchor" aria-hidden="true" />
      <div id="practice" className="scrollAnchor" aria-hidden="true" />

      <div className="shell">
        {/* Editorial Section Header */}
        <div className="startingPointHeaderCenter">
          <span className="editorialEyebrow">Find Your Starting Point</span>
          <h2 id="starting-point-title" className="startingPointMainHeading">
            Where are you feeling stuck right now?
          </h2>
          <p className="startingPointSubtitle">
            Growth doesn&apos;t begin with a dramatic life overhaul. It begins by diagnosing the single
            friction point currently stopping your momentum. Select the statement that feels most honest:
          </p>
        </div>

        {/* 3 Interactive Choice Selector Cards (Tabs) */}
        <div
          className="startingPointChoiceTrack"
          role="tablist"
          aria-label="Select your current challenge"
        >
          {keys.map((k, index) => {
            const item = STARTING_POINTS[k];
            const isSelected = k === selectedKey;
            const Icon = item.icon;

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
                className={`startingPointChoiceCard ${isSelected ? "isSelected" : ""}`}
                onClick={() => setSelectedKey(k)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                type="button"
              >
                <div className="choiceCardTop">
                  <span className="choiceCardNum">{item.num}</span>
                  <div className="choiceCardIconWrap">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                </div>

                <h3 className="choiceCardTitle">&ldquo;{item.tabLabel}&rdquo;</h3>
                <p className="choiceCardTagline">{item.tagline}</p>

                <div className="choiceCardFooter">
                  <span className="choiceCardPill">{item.shortLabel}</span>
                  <span className="choiceCardArrow" aria-hidden="true">
                    {isSelected ? "Active Choice ↓" : "Select →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Panel: Assessment Introduction & Live Progress System Preview */}
        <div
          id={`starting-panel-${current.key}`}
          role="tabpanel"
          aria-labelledby={`starting-tab-${current.key}`}
          className="startingPointActivePanel"
        >
          {/* Assessment Introduction Card */}
          <div className="guidedAssessmentIntroCard">
            <div className="assessmentIntroGrid">
              {/* Left Column: Diagnosis & Bottleneck */}
              <div className="assessmentDiagnosisCol">
                <div className="assessmentBadgeRow">
                  <span className="assessmentBadge">{current.badge}</span>
                </div>

                <div className="assessmentBlock">
                  <span className="assessmentBlockLabel">The Honest Reality</span>
                  <p className="assessmentBlockText">{current.diagnosis}</p>
                </div>

                <div className="assessmentBlock isBottleneck">
                  <span className="assessmentBlockLabel">The Core Bottleneck</span>
                  <p className="assessmentBlockText">{current.bottleneckExplanation}</p>
                </div>
              </div>

              {/* Right Column: Guided Assessment & Intake Wizard Pathway */}
              <div className="assessmentWizardCol">
                <span className="assessmentColEyebrow">The Recommended Step</span>
                <h3 className="assessmentTitle">{current.assessmentTitle}</h3>
                <p className="assessmentDesc">{current.assessmentDescription}</p>

                <div className="assessmentFocusList">
                  <span className="assessmentFocusHeading">What this guided assessment covers:</span>
                  <ul>
                    {current.assessmentFocus.map((focus) => (
                      <li key={focus}>
                        <CheckCircle2 size={16} className="assessmentCheckIcon" aria-hidden="true" />
                        <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="assessmentActionRow">
                  <Link href={current.ctaUrl} className="primaryButton assessmentPrimaryBtn">
                    Start the Guided Assessment
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  <span className="assessmentMetaHint">
                    10 sections • ~15 mins • 100% Free • Autosaves in browser
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Illustrative Sample 90-Day Plan Preview */}
          <div className="planPreviewContainer">
            <div className="planPreviewHeaderBar">
              <div className="planPreviewTitleGroup">
                <div className="planPreviewTag">
                  <Sparkles size={15} aria-hidden="true" />
                  <span>Illustrative Preview • Real Participant Architecture</span>
                </div>
                <h3 className="planPreviewMainTitle">
                  How your 90-day progress plan translates into reality:
                </h3>
              </div>
              <span className="planPreviewStatusBadge">
                Previewing: {current.shortLabel} Track
              </span>
            </div>

            <div className="planPreviewGrid">
              {/* Tile 1: Meaningful 90-Day Goal */}
              <div className="planTile isGoal">
                <div className="planTileHeader">
                  <div className="planTileIconWrap">
                    <Target size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="planTileStep">Step 1</span>
                    <h4 className="planTileHeading">Meaningful 90-Day Goal</h4>
                  </div>
                </div>
                <p className="planDestinationText">{current.planDestination}</p>
                <div className="planTrackBadge">
                  <strong>Primary Track:</strong> {current.planTrack}
                </div>
              </div>

              {/* Tile 2: Skills & Resources Required */}
              <div className="planTile isSkills">
                <div className="planTileHeader">
                  <div className="planTileIconWrap">
                    <Wrench size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="planTileStep">Step 2</span>
                    <h4 className="planTileHeading">Skills & Resources Required</h4>
                  </div>
                </div>
                <div className="planSkillsSection">
                  <span className="planSubLabel">Deliberate Skill Drills:</span>
                  <ul className="planBulletList">
                    {current.skillsRequired.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <span className="planSubLabel">Required Setup & Tools:</span>
                  <ul className="planBulletList isResources">
                    {current.resourcesRequired.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tile 3: Three Monthly Milestones */}
              <div className="planTile isMilestones">
                <div className="planTileHeader">
                  <div className="planTileIconWrap">
                    <Layers size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="planTileStep">Step 3</span>
                    <h4 className="planTileHeading">Three Monthly Milestones</h4>
                  </div>
                </div>
                <div className="milestonesTimeline">
                  <div className="milestoneTimelineItem">
                    <span className="milestonePill">Month 1</span>
                    <div>
                      <strong>{current.milestoneM1.title}</strong>
                      <p>{current.milestoneM1.desc}</p>
                    </div>
                  </div>
                  <div className="milestoneTimelineItem">
                    <span className="milestonePill">Month 2</span>
                    <div>
                      <strong>{current.milestoneM2.title}</strong>
                      <p>{current.milestoneM2.desc}</p>
                    </div>
                  </div>
                  <div className="milestoneTimelineItem isCapstone">
                    <span className="milestonePill isGold">Month 3 Capstone</span>
                    <div>
                      <strong>{current.milestoneM3.title}</strong>
                      <p>{current.milestoneM3.desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tile 4: Realistic Weekly Routine */}
              <div className="planTile isRoutine">
                <div className="planTileHeader">
                  <div className="planTileIconWrap">
                    <Clock size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="planTileStep">Step 4</span>
                    <h4 className="planTileHeading">Realistic Weekly Routine</h4>
                  </div>
                </div>
                <div className="routineMetrics">
                  <div className="routineMetricBox">
                    <span className="routineMetricLabel">Protected Window</span>
                    <strong className="routineMetricValue">{current.weeklyRoutine.focusWindow}</strong>
                  </div>
                  <div className="routineMetricBox">
                    <span className="routineMetricLabel">Weekly Volume</span>
                    <strong className="routineMetricValue">{current.weeklyRoutine.weeklyHours}</strong>
                  </div>
                </div>
                <div className="emergencyMinimumBox">
                  <ShieldCheck size={16} aria-hidden="true" />
                  <div>
                    <strong>Emergency Minimum Rule:</strong>
                    <p>{current.weeklyRoutine.emergencyMinimum}</p>
                  </div>
                </div>
              </div>

              {/* Tile 5: Today's Next Action */}
              <div className="planTile isAction">
                <div className="planTileHeader">
                  <div className="planTileIconWrap">
                    <Flame size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="planTileStep">Step 5</span>
                    <h4 className="planTileHeading">Today&apos;s Next Action (24h)</h4>
                  </div>
                </div>
                <div className="actionContentBox">
                  <strong className="actionMainText">{current.todaysAction.action}</strong>
                  <p className="actionNoteText">{current.todaysAction.note}</p>
                </div>
              </div>

              {/* Tile 6: Weekly Review Checkpoint */}
              <div className="planTile isCheckpoint">
                <div className="planTileHeader">
                  <div className="planTileIconWrap">
                    <RotateCcw size={17} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="planTileStep">Step 6</span>
                    <h4 className="planTileHeading">Weekly Review Checkpoint</h4>
                  </div>
                </div>
                <div className="checkpointContentBox">
                  <div className="checkpointTime">
                    <FileCheck size={15} aria-hidden="true" />
                    <span>{current.reviewCheckpoint.schedule}</span>
                  </div>
                  <p className="checkpointAgenda">{current.reviewCheckpoint.agenda}</p>
                </div>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="planPreviewFooterBanner">
              <div className="footerBannerCopy">
                <h4>Ready to generate your personal 90-day progress plan?</h4>
                <p>
                  Take the guided 10-step assessment. In 15–20 minutes, you will clarify your destination,
                  structure your calendar, eliminate friction, and receive your synthesized blueprint.
                </p>
              </div>
              <Link href={current.ctaUrl} className="primaryButton footerBannerCta">
                Start My Guided Assessment
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
