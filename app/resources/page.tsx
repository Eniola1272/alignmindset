import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  LayoutTemplate,
  PlayCircle
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free and paid resources from Align Mindset for discipline, skills, business, money, and value creation."
};

const resources = [
  {
    category: "Free downloads",
    title: "Align Mindset Starter Kit",
    copy: "A simple worksheet for clarifying goals, identity, weekly systems, and the next useful skill to practice.",
    meta: "Free",
    href: "/#join",
    icon: Download,
    id: "starter-kit"
  },
  {
    category: "Workbooks",
    title: "Identity Before Goals Workbook",
    copy: "Prompts and exercises for turning vague ambition into a clearer direction and weekly action plan.",
    meta: "Coming soon",
    href: `mailto:hello@alignmindset.org?subject=Identity%20Before%20Goals%20Workbook`,
    icon: FileText
  },
  {
    category: "Book recommendations",
    title: "Discipline, Skills, Business, and Money List",
    copy: "A curated reading list for members who want practical mental models and better decision-making.",
    meta: "Free",
    href: "/blog",
    icon: BookOpen
  },
  {
    category: "Replays",
    title: "Wednesday Session Replays",
    copy: "Catch up on selected teaching sessions, community reflections, and practical Q&A clips.",
    meta: "Member access",
    href: "/#join",
    icon: PlayCircle
  },
  {
    category: "Templates",
    title: "Weekly Execution Planner",
    copy: "A lightweight template for planning the week, tracking habits, and reviewing what actually moved.",
    meta: "Free",
    href: "/#join",
    icon: LayoutTemplate
  }
];

export default function ResourcesPage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <div className="visualHeader">
          <SectionHeading
            eyebrow="Resources"
            title="Tools for turning good intentions into visible progress."
            copy="Use these downloads, workbooks, replays, templates, and recommendations to support discipline, skill growth, business thinking, money habits, and value creation."
          />
          <figure className="imageFrame resourceHeaderImage">
            <img
              src="/images/starter-kit-planning.jpg"
              alt="Planning resources, notebook, and practical growth worksheets"
            />
          </figure>
        </div>

        <div className="resourceGrid">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <article
                className="resourceCard"
                id={resource.id}
                key={resource.title}
              >
                <div>
                  <Icon size={23} aria-hidden="true" />
                  <span>{resource.category}</span>
                </div>
                <h2>{resource.title}</h2>
                <p>{resource.copy}</p>
                <small>{resource.meta}</small>
                <Link href={resource.href}>
                  Open resource
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
