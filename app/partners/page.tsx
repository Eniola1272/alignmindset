import type { Metadata } from "next";
import { HandHeart, Mail, Megaphone, UsersRound } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sponsor and Partner",
  description:
    "Partner with Align Mindset Initiative to support practical education, live sessions, resources, and community growth."
};

const opportunities = [
  "Sponsor free Wednesday live sessions and learning materials.",
  "Provide mentors, speakers, facilitators, or trainers.",
  "Fund starter kits, workbooks, internet support, or event logistics.",
  "Co-create practical programs around skills, money, business, leadership, and career growth.",
  "Offer internships, challenges, scholarships, tools, or community opportunities."
];

const programs = [
  "Identity and discipline workshops",
  "Weekly live learning sessions",
  "Skills and value creation sprints",
  "Articles, resources, templates, and replays",
  "Volunteer-led community support"
];

export default function PartnersPage() {
  return (
    <section className="pageHero">
      <div className="shell">
        <SectionHeading
          eyebrow="Sponsor / Partner"
          title="Help more people build discipline, useful skills, and meaningful direction."
          copy="Align Mindset Initiative is building a practical growth community for people who need structure, education, accountability, and a hopeful path toward value creation."
        />

        <div className="partnerStats">
          <article>
            <UsersRound size={23} aria-hidden="true" />
            <strong>Growing community</strong>
            <p>
              Members, readers, volunteers, and session attendees learning to
              align mindset with action.
            </p>
          </article>
          <article>
            <Megaphone size={23} aria-hidden="true" />
            <strong>Weekly rhythm</strong>
            <p>
              Wednesday live sessions, practical articles, resources, and
              community prompts.
            </p>
          </article>
          <article>
            <HandHeart size={23} aria-hidden="true" />
            <strong>Foundation mindset</strong>
            <p>
              Built to serve, educate, and create access for people who are
              ready to grow.
            </p>
          </article>
        </div>

        <div className="partnerGrid">
          <article className="promptPanel">
            <h2>Programs we run</h2>
            <div>
              {programs.map((program) => (
                <p key={program}>{program}</p>
              ))}
            </div>
          </article>
          <article className="promptPanel">
            <h2>Partnership opportunities</h2>
            <div>
              {opportunities.map((opportunity) => (
                <p key={opportunity}>{opportunity}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="partnerContact">
          <div>
            <span>Contact</span>
            <h2>Start a partnership conversation.</h2>
            <p>
              Share your organization, the kind of support you are considering,
              and how you would like to serve the community.
            </p>
          </div>
          <a className="primaryButton" href={`mailto:${site.email}`}>
            <Mail size={17} aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
