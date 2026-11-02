import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Users
} from "lucide-react";
import { site } from "@/lib/site";

const RHYTHMS = [
  {
    day: "Monday",
    badge: "Mindset & Direction Prompt",
    title: "Focus Alignment",
    description:
      "A grounded prompt delivered to the group to strip away cognitive noise and establish your single highest-leverage priority for the week."
  },
  {
    day: "Wednesday",
    badge: "Live Interactive Call",
    title: "Teaching & Q&A Lab",
    description:
      "Our live community session on WhatsApp and virtual rooms. Practical breakdowns of systems, habit architecture, and live member problem-solving."
  },
  {
    day: "Friday",
    badge: "Proof of Work",
    title: "Evidence Submission",
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
    <section className="sectionPad communitySection" id="community" aria-labelledby="community-heading">
      <div className="shell">
        <div className="communityTopGrid">
          <div className="communityHeaderCopy">
            <span className="editorialEyebrow">Community & Accountability</span>
            <h2 id="community-heading" className="communityTitle">
              Mediocrity spreads quietly in isolation. Standards rise when people hold you to your word.
            </h2>
            <p className="communityLead">
              When you build in secret, quiet compromises go unnoticed. Skipping your morning study session,
              abandoning a project halfway, or making excuses feels harmless because nobody is looking. When
              you step into a community of people who expect consistency and celebrate real evidence, your baseline
              shifts. Showing up stops being an argument.
            </p>

            <div className="communityActionRow">
              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="primaryButton"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Join the WhatsApp Community
              </a>
              <Link href="/volunteer" className="secondaryButton">
                Volunteer With Us
              </Link>
            </div>
          </div>

          {/* Authentic Real Event Photography Showcase */}
          <div className="communityPhotoCard">
            <div className="communityPhotoWrap">
              <img
                src="/images/collaborative-growth-workshop.jpg"
                alt="Align Mindset Initiative participants collaborating in a hands-on learning workshop"
                className="communityImg"
                width={640}
                height={480}
                loading="lazy"
              />
              <div className="communityPhotoCaption">
                <span>Align Mindset Workshop Session</span>
                <p>Turning abstract ambition into weekly verifiable artifacts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4-Day Execution Cadence */}
        <div className="communityRhythmContainer">
          <div className="communityRhythmHeader">
            <div>
              <span className="rhythmEyebrow">The Weekly Rhythm</span>
              <h3 className="rhythmTitle">What you actually participate in every week</h3>
            </div>
            <p className="rhythmSub">
              No 24/7 noise or meaningless chat spam. A structured 4-day heartbeat that respects your
              attention and demands real execution:
            </p>
          </div>

          <div className="communityRhythmGrid">
            {RHYTHMS.map((r) => (
              <div key={r.day} className="rhythmCard">
                <div className="rhythmCardTop">
                  <span className="rhythmDay">{r.day}</span>
                  <span className="rhythmBadge">{r.badge}</span>
                </div>
                <h4 className="rhythmCardTitle">{r.title}</h4>
                <p className="rhythmCardDesc">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
