import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

const RHYTHMS = [
  {
    day: "Monday",
    badge: "Direction Prompt",
    title: "Focus Alignment",
    description:
      "A grounded prompt delivered to the group to strip away cognitive noise and establish your single highest-leverage priority for the week."
  },
  {
    day: "Wednesday",
    badge: "Live Cohort Call",
    title: "Teaching & Q&A Lab",
    description:
      "Our live community session on WhatsApp and virtual rooms. Practical breakdowns of systems, habit architecture, and live member problem-solving."
  },
  {
    day: "Friday",
    badge: "Proof of Work",
    title: "Evidence Check-In",
    description:
      "Members submit proof of what was actually built during the week: code commits, written drafts, design mockups, or completed client calls. Zero fluff."
  },
  {
    day: "Sunday",
    badge: "Weekly Audit",
    title: "Reflection & Reset",
    description:
      "A guided 15-minute review to evaluate what was accomplished, diagnose where friction occurred, and set protected focus blocks for the coming week."
  }
];

export function CommunitySection() {
  return (
    <section className="edSection edCommunitySection" id="community" aria-labelledby="community-heading">
      <div className="shell">
        {/* Section Header */}
        <div className="edSectionHeader">
          <div className="edSectionMeta">
            <span>Social Architecture</span>
            <span className="edDot" aria-hidden="true">•</span>
            <span>Section 05</span>
          </div>
          <h2 id="community-heading" className="edSectionHeading">
            Mediocrity spreads quietly in isolation. Standards rise when people hold you to your word.
          </h2>
          <p className="edSectionLead">
            When you build in secret, quiet compromises go unnoticed. Skipping your morning study session,
            abandoning a project halfway, or making excuses feels harmless because nobody is looking. When
            you step into a community of people who expect consistency and celebrate real evidence, your baseline
            shifts. Showing up stops being an argument.
          </p>
        </div>

        {/* Top Documentary Spread: Call to Action & Real Photography */}
        <div className="edCommunitySpread">
          <div className="communitySpreadText">
            <h3 className="spreadTitle">An environment that refuses to tolerate passive drift.</h3>
            <p className="spreadLead">
              We do not run another noisy chat room with thousands of unread notifications. We run a
              disciplined community of students, builders, creators, and professionals who show up with
              real work every Friday.
            </p>

            <div className="spreadActions">
              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="edPrimaryBtn"
              >
                <MessageCircle size={16} aria-hidden="true" />
                <span>Join the WhatsApp Community</span>
              </a>
              <Link href="/volunteer" className="edSecondaryLink">
                <span>Volunteer With Us</span>
                <span className="edArrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <figure className="communitySpreadFigure">
            <div className="photoFrame">
              <img
                src="/images/collaborative-growth-workshop.jpg"
                alt="Align Mindset Initiative participants collaborating in a hands-on learning workshop"
                className="spreadImg"
                width={640}
                height={480}
                loading="lazy"
              />
            </div>
            <figcaption className="spreadFigcaption">
              <span className="figcaptionIndex">Figure 2.0</span>
              <span className="figcaptionSep">—</span>
              <span className="figcaptionText">
                Align Mindset Workshop Session. Live peer review, constructive feedback, and shared standards.
              </span>
            </figcaption>
          </figure>
        </div>

        {/* The 4-Day Execution Timetable */}
        <div className="edWeeklyTimetable">
          <div className="timetableHeader">
            <span className="timetableTitle">The 4-Day Execution Cadence</span>
            <span className="timetableSubtitle">What you actually participate in every week</span>
          </div>

          <div className="timetableGrid">
            {RHYTHMS.map((r) => (
              <div key={r.day} className="timetableColumn">
                <div className="timeHeader">
                  <span className="timeDay">{r.day}</span>
                  <span className="timeBadge">{r.badge}</span>
                </div>
                <h4 className="timeTitle">{r.title}</h4>
                <p className="timeDesc">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
