import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Hammer,
  ShieldCheck
} from "lucide-react";
import { site } from "@/lib/site";

type Offering = {
  icon: typeof Compass;
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  linkText: string;
  linkHref: string;
  external?: boolean;
};

const OFFERINGS: Offering[] = [
  {
    icon: Compass,
    eyebrow: "Diagnostic Architecture",
    title: "90-Day Progress Builder",
    description:
      "A 10-step intake diagnostic that cuts through scattered distractions. It evaluates your honest bandwidth, maps out 30/60/90-day deliverables, and establishes a personalized 12-week roadmap with clear criteria for completion.",
    outcome: "You walk away with an individualized roadmap and a downloadable PDF execution blueprint.",
    linkText: "Build your 90-day plan",
    linkHref: "/progress-builder"
  },
  {
    icon: Calendar,
    eyebrow: "Weekly Live Lab",
    title: "Wednesday Cohort Sessions",
    description:
      "Every Wednesday, our community gathers live for practical, unvarnished teaching on systems, identity, and personal productivity, followed by an open Q&A where we work through real execution blockers.",
    outcome: "Clarity on your primary obstacle and one concrete action to complete before the weekend.",
    linkText: "Join Wednesday's session",
    linkHref: site.communityUrl,
    external: true
  },
  {
    icon: Hammer,
    eyebrow: "Skill Sprints",
    title: "Hands-On Sprints & Capstones",
    description:
      "Intensive, short-term challenges focused on creating tangible proof of work — from coding projects and design prototypes to technical writing, financial models, and public portfolio launches.",
    outcome: "Verifiable artifacts and public case studies that prove your competence to the market.",
    linkText: "View upcoming workshops",
    linkHref: "/workshops"
  },
  {
    icon: BookOpen,
    eyebrow: "Foundational Curriculum",
    title: "Curated Reading Circles",
    description:
      "Focused study circles dissecting foundational works on leverage, capital, and discipline — anchored by our core curriculum text: How to Create Value When You Do Not Have Capital.",
    outcome: "A deep understanding of economic value creation, distilled into daily operating principles.",
    linkText: "Explore the book collection",
    linkHref: "/books"
  },
  {
    icon: ShieldCheck,
    eyebrow: "Peer Accountability",
    title: "Evidence Circles & Reviews",
    description:
      "A culture where talk is cheap and progress is evidenced. Members submit Friday work logs, share project links, and receive honest critique and encouragement from experienced mentors.",
    outcome: "An environment of high standards where quiet drift is noticed and interrupted.",
    linkText: "Step into the community",
    linkHref: site.communityUrl,
    external: true
  },
  {
    icon: FileText,
    eyebrow: "Open Editorial Curriculum",
    title: "Essays on Systems & Discipline",
    description:
      "In-depth, thoughtfully written essays dissecting mental models, time architecture, deliberate practice, and the reality of overcoming creative resistance.",
    outcome: "Practical, zero-fluff perspectives you can immediately apply to your calendar and work.",
    linkText: "Read the editorial essays",
    linkHref: "/blog"
  }
];

export function GrowthOfferings() {
  return (
    <section className="sectionPad offeringsSection" id="offerings" aria-labelledby="offerings-heading">
      <div id="programs" className="scrollAnchor" aria-hidden="true" />
      <div className="shell">
        <div className="offeringsHeaderCenter">
          <span className="editorialEyebrow">How You Can Grow Here</span>
          <h2 id="offerings-heading" className="offeringsMainHeading">
            Practical environments designed for execution, not passive consumption.
          </h2>
          <p className="offeringsSubtitle">
            Information alone does not change a life. If reading another book or watching another
            tutorial produced progress, everyone would be thriving. We build structured environments
            where you actually build the habits, skills, and systems required to follow through:
          </p>
        </div>

        <div className="offeringsGrid">
          {OFFERINGS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="offeringCard">
                <div className="offeringCardHeader">
                  <div className="offeringIconWrap">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="offeringEyebrow">{item.eyebrow}</span>
                </div>

                <h3 className="offeringTitle">{item.title}</h3>
                <p className="offeringDescription">{item.description}</p>

                <div className="offeringOutcome">
                  <strong>Expected Outcome:</strong> {item.outcome}
                </div>

                <div className="offeringFooter">
                  {item.external ? (
                    <a
                      href={item.linkHref}
                      target="_blank"
                      rel="noreferrer"
                      className="editorialLink"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={item.linkHref} className="editorialLink">
                      <span>{item.linkText}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
