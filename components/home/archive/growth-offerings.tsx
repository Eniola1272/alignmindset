import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

type Offering = {
  num: string;
  category: string;
  title: string;
  description: string;
  outcome: string;
  linkText: string;
  linkHref: string;
  external?: boolean;
};

const OFFERINGS: Offering[] = [
  {
    num: "01",
    category: "Diagnostic Architecture",
    title: "90-Day Progress Builder",
    description:
      "A 10-step intake diagnostic that cuts through scattered distractions. It evaluates your honest bandwidth, maps out 30/60/90-day deliverables, and establishes a personalized 12-week roadmap with clear criteria for completion.",
    outcome: "An individualized 12-week roadmap and downloadable PDF execution blueprint.",
    linkText: "Build your 90-day plan",
    linkHref: "/progress-builder"
  },
  {
    num: "02",
    category: "Weekly Live Lab",
    title: "Wednesday Cohort Sessions",
    description:
      "Every Wednesday, our community gathers live for practical, unvarnished teaching on systems, identity, and personal productivity, followed by an open Q&A where we work through real execution blockers.",
    outcome: "Weekly clarity, real-time peer critique, and one defined action for the week ahead.",
    linkText: "Join Wednesday session",
    linkHref: site.communityUrl,
    external: true
  },
  {
    num: "03",
    category: "Skill Sprints & Capstones",
    title: "Practical Workshops & Challenges",
    description:
      "Intensive, short-term sprints focused on creating tangible proof of work — from coding projects and design prototypes to technical writing, financial models, and public portfolio launches.",
    outcome: "Verifiable artifacts and public case studies that prove your competence to the market.",
    linkText: "View upcoming workshops",
    linkHref: "/workshops"
  },
  {
    num: "04",
    category: "Foundational Curriculum",
    title: "Curated Reading Circles",
    description:
      "Focused study circles dissecting foundational works on leverage, capital, and discipline — anchored by our core curriculum text: How to Create Value When You Do Not Have Capital.",
    outcome: "A deep understanding of economic value creation, distilled into daily operating principles.",
    linkText: "Explore the book collection",
    linkHref: "/books"
  },
  {
    num: "05",
    category: "Peer Accountability",
    title: "Evidence Circles & Reviews",
    description:
      "A culture where talk is cheap and progress is evidenced. Members submit Friday work logs, share project links, and receive honest critique and encouragement from experienced mentors.",
    outcome: "An environment of high standards where quiet drift is noticed and interrupted.",
    linkText: "Step into the community",
    linkHref: site.communityUrl,
    external: true
  },
  {
    num: "06",
    category: "Open Editorial Curriculum",
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
    <section className="edSection edOfferingsSection" id="offerings" aria-labelledby="offerings-heading">
      <div id="programs" className="scrollAnchor" aria-hidden="true" />
      <div className="shell">
        {/* Section Header */}
        <div className="edSectionHeader">
          <div className="edSectionMeta">
            <span>Curriculum & Environments</span>
            <span className="edDot" aria-hidden="true">•</span>
            <span>Section 04</span>
          </div>
          <h2 id="offerings-heading" className="edSectionHeading">
            Practical environments designed for execution, not passive consumption.
          </h2>
          <p className="edSectionLead">
            Information alone does not change a life. If reading another article or watching another
            tutorial produced progress, everyone would be thriving. We build structured spaces where you
            actually build the habits, skills, and systems required to follow through:
          </p>
        </div>

        {/* Numbered Curriculum Index Catalogue */}
        <div className="edCurriculumCatalogue">
          {OFFERINGS.map((item) => (
            <article key={item.num} className="catalogueEntry">
              <div className="entryMetaCol">
                <span className="entryNum">{item.num}</span>
                <span className="entryCategory">{item.category}</span>
              </div>

              <div className="entryContentCol">
                <h3 className="entryTitle">{item.title}</h3>
                <p className="entryDesc">{item.description}</p>
                <div className="entryOutcome">
                  <strong>Expected Tangible Output:</strong>
                  <span>{item.outcome}</span>
                </div>
              </div>

              <div className="entryActionCol">
                {item.external ? (
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="edEntryLink"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={item.linkHref} className="edEntryLink">
                    <span>{item.linkText}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
