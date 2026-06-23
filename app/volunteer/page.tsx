import type { Metadata } from "next";
import {
  CalendarDays,
  FileText,
  Megaphone,
  Paintbrush,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { VolunteerApplicationModal } from "@/components/volunteer-application-modal";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer roles for people who want to help Align Mindset Initiative serve the community."
};

const roles = [
  {
    icon: ShieldCheck,
    title: "Community Moderator",
    copy: "Welcome members, guide conversations, remove spam, and keep the WhatsApp group focused."
  },
  {
    icon: FileText,
    title: "Content Coordinator",
    copy: "Prepare prompts, summaries, recaps, and article ideas from community questions and live sessions."
  },
  {
    icon: CalendarDays,
    title: "Programs Coordinator",
    copy: "Plan Wednesday live sessions, reminders, speaker coordination, attendance, and feedback."
  },
  {
    icon: Paintbrush,
    title: "Design / Media Volunteer",
    copy: "Create flyers, quote graphics, short clips, carousels, and simple branded materials."
  },
  {
    icon: UsersRound,
    title: "Skills Facilitator",
    copy: "Teach practical topics like writing, career growth, public speaking, tech, money, and leadership."
  },
  {
    icon: Megaphone,
    title: "Outreach Support",
    copy: "Help invite partners, speakers, mentors, and members who can benefit from the initiative."
  }
];

export default function VolunteerPage() {
  return (
    <section className="pageHero volunteerPage">
      <div className="shell">
        <SectionHeading
          eyebrow="Volunteer"
          title="Help people move from motivation to meaningful progress."
          copy="Align Mindset needs a small reliable team before it needs a big organization. Start with one useful role and help the community become consistent."
        />
        <div className="volunteerGrid">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <article key={role.title} className="editorialCard">
                <Icon size={23} aria-hidden="true" />
                <h2>{role.title}</h2>
                <p>{role.copy}</p>
              </article>
            );
          })}
        </div>
        <div className="volunteerCta">
          <div>
            <h2>Ready to help build the structure?</h2>
            <p>
              Send your details, skills, motivation, and how you hope to add
              value to the community.
            </p>
          </div>
          <VolunteerApplicationModal />
        </div>
      </div>
    </section>
  );
}
