import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Hammer,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users
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
    eyebrow: "Guided Blueprint",
    title: "90-Day Progress Builder",
    description:
      "A structured 10-step intake diagnostic that turns your scattered goals into a concrete 12-week development roadmap with 30/60/90-day deliverables and daily protected focus windows.",
    outcome: "You walk away with an individualized roadmap and downloadable PDF blueprint.",
    linkText: "Build your 90-day plan",
    linkHref: "/progress-builder"
  },
  {
    icon: Calendar,
    eyebrow: "Weekly Live Lab",
    title: "Wednesday Cohort Sessions",
    description:
      "Every Wednesday, our community meets live on WhatsApp and virtual rooms for practical teaching on systems, identity, and execution, followed by honest peer Q&A.",
    outcome: "Weekly clarity, real-time feedback, and one defined action for the week ahead.",
    linkText: "Join Wednesday session",
    linkHref: site.communityUrl,
    external: true
  },
  {
    icon: Hammer,
    eyebrow: "Skill Sprints",
    title: "Practical Workshops & Challenges",
    description:
      "Intensive cohorts focused on creating tangible proof of work — from coding and design to writing, systems architecture, and public project launches.",
    outcome: "Verifiable artifacts and public case studies that prove competence to the world.",
    linkText: "View upcoming workshops",
    linkHref: "/workshops"
  },
  {
    icon: BookOpen,
    eyebrow: "Learning Circles",
    title: "Curated Reading & Books",
    description:
      "Guided study circles exploring foundational works on discipline, capital, and leverage, including our core curriculum text: How to Create Value When You Do Not Have Capital.",
    outcome: "Deep comprehension of mental models, distilled into actionable daily habits.",
    linkText: "Explore the books",
    linkHref: "/books"
  },
  {
    icon: ShieldCheck,
    eyebrow: "Peer Support",
    title: "Accountability & Mentorship",
    description:
      "Community reviews where members share Friday evidence, log weekly git commits or project drafts, and receive constructive guidance from experienced practitioners.",
    outcome: "An environment where standards remain high and quiet drift is replaced by momentum.",
    linkText: "Meet the community",
    linkHref: site.communityUrl,
    external: true
  },
  {
    icon: FileText,
    eyebrow: "Open Curriculum",
    title: "Editorial Essays & Frameworks",
    description:
      "Carefully written essays dissecting mental models, daily progress systems, time management, and the practical economics of personal skill acquisition.",
    outcome: "Zero-fluff insights ready to apply directly to your calendar today.",
    linkText: "Read the articles",
    linkHref: "/blog"
  }
];

export function GrowthOfferings() {
  return (
    <section className="sectionPad offeringsSection" id="offerings" aria-labelledby="offerings-heading">
      <div id="programs" className="scrollAnchor" aria-hidden="true" />
      <div className="shell">
        <div className="offeringsHeaderCenter">
          <span className="editorialEyebrow">What We Offer</span>
          <h2 id="offerings-heading" className="offeringsMainHeading">
            Structured environments for intentional progress.
          </h2>
          <p className="offeringsSubtitle">
            We don&apos;t sell generic promises or motivational hype. Everything at Align Mindset is
            designed to help you build direction, develop competence, and follow through:
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
