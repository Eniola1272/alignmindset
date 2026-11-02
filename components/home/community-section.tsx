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
      "A short, grounded prompt sent to the community group to strip away noise and establish your single highest-leverage priority for the week."
  },
  {
    day: "Wednesday",
    badge: "Live Interactive Call",
    title: "Teaching & Q&A Lab",
    description:
      "Our live community session on WhatsApp and virtual room. Practical breakdown of systems, habit architecture, and live member problem-solving."
  },
  {
    day: "Friday",
    badge: "Proof of Work",
    title: "Evidence Submission",
    description:
      "Members submit proof of what was built during the week: GitHub commits, written drafts, designs, or completed client calls. Zero fluff."
  },
  {
    day: "Sunday",
    badge: "Weekly Audit",
    title: "Reflection & Reset",
    description:
      "A guided review to evaluate what worked, what slipped, and adjust your protected focus blocks for the upcoming 7 days."
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
              Progress is easier to sustain when you aren&apos;t building in silence.
            </h2>
            <p className="communityLead">
              Willpower collapses in isolation. When you enter an environment where disciplined execution
              is normal, excuses fade and consistency takes their place. Here is how our members keep each other moving:
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
              />
              <div className="communityPhotoCaption">
                <span>Align Mindset Workshop Session</span>
                <p>Turning abstract ambitions into weekly verifiable artifacts.</p>
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
              No constant notification spam. A structured 4-day heartbeat that respects your focus and
              demands real progress.
            </p>
          </div>

          <div className="communityRhythmGrid">
            {RHYTHMS.map((r, idx) => (
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

