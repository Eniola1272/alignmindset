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
    href: "/#join",
    icon: UsersRound
  },
  {
    title: "Download the starter kit",
    copy: "Begin with a simple worksheet for goals, identity, habits, skills, and weekly action.",
    href: "/resources#starter-kit",
    icon: Download
  },
  {
    title: "Attend the next session",
    copy: "Wednesday live sessions are where we learn, reflect, ask questions, and plan action.",
    href: "/workshops",
    icon: CalendarDays
  }
];

export default function StartHerePage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <SectionHeading
          eyebrow="Start here"
          title="Build the mindset, systems, and skills that help goals become real."
          copy="Align Mindset Initiative helps people move from motivation to practical growth through identity, discipline, value creation, learning, and community accountability."
        />

        <div className="startIntroGrid">
          <article className="editorialCard">
            <BookOpenCheck size={24} aria-hidden="true" />
            <h2>What is Align Mindset?</h2>
            <p>
              It is a growth community and initiative for people who want to
              align who they are becoming with what they do every week.
            </p>
          </article>
          <article className="editorialCard">
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
                <Icon size={22} aria-hidden="true" />
                <h2>{step.title}</h2>
                <p>{step.copy}</p>
                <Link href={step.href}>
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
