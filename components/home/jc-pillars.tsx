import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export function JcPillars() {
  const pillars = [
    {
      num: "01",
      tag: "Foundational Literature",
      title: "The Comeback Bundle",
      description:
        "Four practical books on asking for help, picking one useful skill, packaging your offer, and loving the daily craft of mastery.",
      linkText: "Explore the Books",
      href: "/books",
      external: false
    },
    {
      num: "02",
      tag: "Interactive Tool",
      title: "90-Day Progress Builder",
      description:
        "A free 10-step guided intake that maps your singular goal, 3 monthly milestones, daily focus block, and emergency minimum rule.",
      linkText: "Build Your Plan",
      href: "/progress-builder?start=true",
      external: false
    },
    {
      num: "03",
      tag: "Accountability Circle",
      title: "Weekly Proof Community",
      description:
        "A private WhatsApp community of builders and professionals. Wednesday live problem-solving labs and Friday public evidence check-ins.",
      linkText: "Join the Community",
      href: site.communityUrl,
      external: true
    }
  ];

  return (
    <section className="jcPillarsSection" id="pillars" aria-labelledby="jc-pillars-heading">
      <div className="shell">
        <div className="jcSectionHeader">
          <span className="jcEyebrow">What We Offer</span>
          <h2 id="jc-pillars-heading" className="jcSectionTitle">
            Three practical paths to deliberate progress.
          </h2>
          <p className="jcSectionLead">
            No empty motivational slogans. Only structured literature, practical tools, and peer accountability.
          </p>
        </div>

        <div className="jcPillarsGrid">
          {pillars.map((pillar) => (
            <article key={pillar.num} className="jcPillarCard">
              <span className="jcPillarNum">{pillar.num}</span>
              <span className="jcPillarTag">{pillar.tag}</span>
              <h3 className="jcPillarTitle">{pillar.title}</h3>
              <p className="jcPillarDesc">{pillar.description}</p>

              <div className="jcPillarFooter">
                {pillar.external ? (
                  <a
                    href={pillar.href}
                    target="_blank"
                    rel="noreferrer"
                    className="jcPillarLink"
                  >
                    <span>{pillar.linkText}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={pillar.href} className="jcPillarLink">
                    <span>{pillar.linkText}</span>
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

