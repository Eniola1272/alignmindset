import type { Metadata } from "next";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Wednesday live sessions hosted directly in the Align Mindset WhatsApp community."
};

const workshops = [
  {
    title: "Identity Before Goals",
    date: "Wednesday, July 1, 2026",
    learn:
      "Clarify who you are becoming, why your goals matter, and what daily choices support that identity.",
    audience:
      "People who feel scattered, inconsistent, or unsure where to begin.",
    location: "Live in WhatsApp Community (Free)",
    image: "/images/community-goals-session.jpg"
  },
  {
    title: "Systems, Not Motivation",
    date: "Wednesday, July 8, 2026",
    learn:
      "Build a weekly rhythm for planning, accountability, habit tracking, and low-friction execution.",
    audience:
      "Members who start with energy but struggle to stay consistent.",
    location: "Live in WhatsApp Community (Free)",
    image: "/images/starter-kit-planning.jpg"
  },
  {
    title: "Skills That Increase Value",
    date: "Wednesday, July 15, 2026",
    learn:
      "Choose one useful skill, practice deliberately, and create proof that can open opportunities.",
    audience:
      "Students, early professionals, creators, and builders who want to become more valuable.",
    location: "Live in WhatsApp Community (Free)",
    image: "/images/workshop-live-session.jpg"
  }
];

export default function WorkshopsPage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <div className="visualHeader">
          <SectionHeading
            eyebrow="Wednesday Workshops"
            title="Wednesday live sessions happen in our WhatsApp community."
            copy="No tickets, no registration forms, and no sign-up hurdles. Every Wednesday, our community gathers on WhatsApp for live interactive teaching, practical frameworks, and open Q&As."
          />
          <figure className="imageFrame workshopHeaderImage">
            <img
              src="/images/workshop-live-session.jpg"
              alt="A facilitator leading a practical live learning session"
            />
          </figure>
        </div>

        {/* WhatsApp Direct Banner */}
        <div
          style={{
            background: "#fffcf5",
            border: "1px solid var(--line)",
            padding: "26px 30px",
            marginBottom: "36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#7a8075"
              }}
            >
              NO REGISTRATION REQUIRED
            </span>
            <h3
              style={{
                margin: "6px 0 8px",
                fontSize: "1.45rem",
                fontFamily: "var(--font-source-serif), serif",
                color: "#1e2a22"
              }}
            >
              All workshops take place live inside our WhatsApp community
            </h3>
            <p
              style={{
                margin: 0,
                color: "#555b52",
                maxWidth: "640px",
                fontSize: "0.95rem",
                lineHeight: 1.55
              }}
            >
              Simply join the WhatsApp group below. Session links, live discussion prompts, and weekly practical worksheets are shared directly with group members every Wednesday.
            </p>
          </div>
          <a
            href={site.communityUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow"
            style={{ whiteSpace: "nowrap" }}
          >
            <span>Join WhatsApp Group</span>
            <span className="arrow">↗</span>
          </a>
        </div>

        <div className="workshopList">
          {workshops.map((workshop) => (
            <article className="workshopCard" key={workshop.title}>
              <img className="workshopCardImage" src={workshop.image} alt="" />
              <div className="workshopDate">
                <CalendarDays size={22} aria-hidden="true" />
                <span>{workshop.date}</span>
              </div>
              <div>
                <h2>{workshop.title}</h2>
                <dl>
                  <div>
                    <dt>What you will learn</dt>
                    <dd>{workshop.learn}</dd>
                  </div>
                  <div>
                    <dt>Who it is for</dt>
                    <dd>{workshop.audience}</dd>
                  </div>
                  <div>
                    <dt>Where</dt>
                    <dd>{workshop.location}</dd>
                  </div>
                </dl>
              </div>
              <a
                className="primaryButton"
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
              >
                Join via WhatsApp
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
