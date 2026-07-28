import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, HeartHandshake, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Volunteer Onboarding",
  description:
    "A simple orientation for new Align Mindset volunteers before the team follows up."
};

const steps = [
  {
    title: "Know the mission",
    copy:
      "Align Mindset helps people align identity, systems, skills, and daily action toward goals that matter.",
    icon: Sparkles,
    image: "/images/community-goals-session.jpg"
  },
  {
    title: "Choose your lane",
    copy:
      "Volunteers can support writing, design, live sessions, moderation, outreach, operations, research, and community care.",
    icon: HeartHandshake,
    image: "/images/starter-kit-planning.jpg"
  },
  {
    title: "Prepare for follow-up",
    copy:
      "The team reviews applications and reaches out with the best next step, especially around Wednesday live sessions.",
    icon: CalendarCheck2,
    image: "/images/workshop-live-session.jpg"
  }
];

export default function VolunteerOnboardingPage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <div className="visualHeader">
          <SectionHeading
            eyebrow="Volunteer onboarding"
            title="Thank you for choosing to build with Align Mindset."
            copy="This page gives you a simple orientation while the team reviews your application."
          />
          <figure className="imageFrame volunteerHeaderImage">
            <img
              src="/images/workshop-live-session.jpg"
              alt="A live learning session with a facilitator and attendees"
            />
          </figure>
        </div>

        <div className="volunteerGrid onboardingGrid">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article className="programCard" key={step.title}>
                <img className="cardThumb" src={step.image} alt="" />
                <div className="featureIcon green">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            );
          })}
        </div>

        <div className="volunteerCta">
          <div>
            <h2>Start with the community rhythm.</h2>
            <p>
              Look out for Wednesday live sessions, practical resources, and
              opportunities to help members turn intention into action.
            </p>
          </div>
          <Link className="primaryButton" href="/#join">
            Join the movement
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
