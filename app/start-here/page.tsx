import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Download,
  Goal,
  UsersRound
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "A simple guide for new visitors who want to understand Align Mindset and take the first step."
};

const fit = [
  "Students and young adults trying to become more disciplined.",
  "Early builders who want useful skills, confidence, and direction.",
  "People who feel stuck but are ready to rebuild habits and identity.",
  "Community-minded people who want to grow with accountability."
];

const firstSteps = [
  {
    title: "Join the community",
    copy: "Get practical reminders, session updates, and weekly prompts that help you move.",
    href: site.communityUrl,
    icon: UsersRound,
    image: "/images/community-goals-session.jpg",
    external: true
  },
  {
    title: "Download the starter kit",
    copy: "Begin with a simple worksheet for goals, identity, habits, skills, and weekly action.",
    href: "/resources#starter-kit",
    icon: Download,
    image: "/images/starter-kit-planning.jpg"
  },
  {
    title: "Attend the next session",
    copy: "Wednesday live sessions are where we learn, reflect, ask questions, and plan action.",
    href: "/workshops",
    icon: CalendarDays,
    image: "/images/workshop-live-session.jpg"
  }
];

export default function StartHerePage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <div className="visualHeader">
          <SectionHeading
            eyebrow="Start here"
            title="Build the mindset, systems, and skills that help goals become real."
            copy="Align Mindset Initiative helps people move from motivation to practical growth through identity, discipline, value creation, learning, and community accountability."
          />
          <figure className="circleImageFrame startHeaderImage">
            <img
              src="/images/community-goals-session.jpg"
              alt="Community members discussing goals and growth around a table"
            />
          </figure>
        </div>

        <div className="startIntroGrid">
          <article className="editorialCard">
            <img
              className="cardThumb"
              src="/images/community-goals-session.jpg"
              alt=""
            />
            <BookOpenCheck size={24} aria-hidden="true" />
            <h2>What is Align Mindset?</h2>
            <p>
              It is a growth community and initiative for people who want to
              align who they are becoming with what they do every week.
            </p>
          </article>
          <article className="editorialCard">
            <img
              className="cardThumb"
              src="/images/starter-kit-planning.jpg"
              alt=""
            />
            <Goal size={24} aria-hidden="true" />
            <h2>What should I do first?</h2>
            <p>
              Start small: clarify your direction, pick one useful skill, join
              the community rhythm, and take one visible action this week.
            </p>
          </article>
        </div>

        <div className="promptPanel">
          <h2>Who is it for?</h2>
          <div>
            {fit.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="resourceGrid actionGrid">
          {firstSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article className="resourceCard" key={step.title}>
                <img className="cardThumb" src={step.image} alt="" />
                <Icon size={22} aria-hidden="true" />
                <h2>{step.title}</h2>
                <p>{step.copy}</p>
                <Link
                  href={step.href}
                  target={step.external ? "_blank" : undefined}
                  rel={step.external ? "noreferrer" : undefined}
                >
                  Start now
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
