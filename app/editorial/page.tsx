import type { Metadata } from "next";
import {
  BookMarked,
  CalendarCheck,
  FilePenLine,
  Lightbulb,
  Megaphone,
  Workflow
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Editorial System",
  description:
    "A practical blogging and article production system for Align Mindset Initiative."
};

const lanes = [
  {
    icon: Lightbulb,
    title: "Capture",
    copy: "Collect questions from the WhatsApp group, meetings, polls, and personal reflections."
  },
  {
    icon: Workflow,
    title: "Shape",
    copy: "Turn each idea into one clear promise: what should the reader understand or do next?"
  },
  {
    icon: FilePenLine,
    title: "Draft",
    copy: "Write with a simple structure: problem, insight, practical steps, weekly challenge."
  },
  {
    icon: BookMarked,
    title: "Publish",
    copy: "Post to the blog, then adapt the article into WhatsApp prompts and meeting notes."
  },
  {
    icon: Megaphone,
    title: "Distribute",
    copy: "Share short excerpts, quote graphics, discussion questions, and action challenges."
  },
  {
    icon: CalendarCheck,
    title: "Review",
    copy: "Track what people respond to and feed those questions back into the next article."
  }
];

const prompts = [
  "What goal are our members chasing, and what identity would sustain it?",
  "What system would make this goal easier even on low-energy days?",
  "What skill can people practice this week and show proof of?",
  "What lesson from our last session can become an article, guide, or checklist?",
  "What question keeps appearing in the community?"
];

export default function EditorialPage() {
  return (
    <section className="pageHero editorialPage">
      <div className="shell">
        <SectionHeading
          eyebrow="Blogging system"
          title="A clean article engine for consistent, useful publishing."
          copy="Use this page as the editorial operating system until a private admin dashboard is added."
        />
        <div className="editorialGrid">
          {lanes.map((lane) => {
            const Icon = lane.icon;
            return (
              <article key={lane.title} className="editorialCard">
                <Icon size={22} aria-hidden="true" />
                <h2>{lane.title}</h2>
                <p>{lane.copy}</p>
              </article>
            );
          })}
        </div>
        <div className="promptPanel">
          <h2>Weekly article prompts</h2>
          <div>
            {prompts.map((prompt) => (
              <p key={prompt}>{prompt}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
