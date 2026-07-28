import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Upcoming Align Mindset workshops and Wednesday live sessions."
};

const workshops = [
  {
    title: "Identity Before Goals",
    date: "Wednesday, July 1, 2026",
    learn:
      "Clarify who you are becoming, why your goals matter, and what daily choices support that identity.",
    audience:
      "People who feel scattered, inconsistent, or unsure where to begin.",
    price: "Free community session",
    image: "/images/community-goals-session.jpg"
  },
  {
    title: "Systems, Not Motivation",
    date: "Wednesday, July 8, 2026",
    learn:
      "Build a weekly rhythm for planning, accountability, habit tracking, and low-friction execution.",
    audience:
      "Members who start with energy but struggle to stay consistent.",
    price: "Free community session",
    image: "/images/starter-kit-planning.jpg"
  },
  {
    title: "Skills That Increase Value",
    date: "Wednesday, July 15, 2026",
    learn:
      "Choose one useful skill, practice deliberately, and create proof that can open opportunities.",
    audience:
      "Students, early professionals, creators, and builders who want to become more valuable.",
    price: "Free community session",
    image: "/images/workshop-live-session.jpg"
  }
];

export default function WorkshopsPage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <div className="visualHeader">
          <SectionHeading
            eyebrow="Workshops"
            title="Wednesday live sessions for learning, reflection, and action."
            copy="Every session is designed to help people leave with a clearer mindset, a practical tool, and a next step they can take that week."
          />
          <figure className="imageFrame workshopHeaderImage">
            <img
              src="/images/workshop-live-session.jpg"
              alt="A facilitator leading a practical live learning session"
            />
          </figure>
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
                    <dt>Price</dt>
                    <dd>{workshop.price}</dd>
                  </div>
                </dl>
              </div>
              <Link
                className="primaryButton"
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
              >
                Register
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
