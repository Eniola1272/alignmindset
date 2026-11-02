import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Check, Compass, Sparkles, Users } from "lucide-react";
import { site } from "@/lib/site";

export function ModernOfferings() {
  const offerings = [
    {
      id: "builder",
      category: "Free Interactive Tool",
      icon: Compass,
      title: "90-Day Progress Builder",
      description:
        "A guided 10-step intake that helps you select your primary skill track, sequence 3 monthly milestones, and establish daily focus routines with an emergency minimum.",
      features: [
        "Personalized 90-day progress roadmap",
        "Downloadable structured PDF blueprint",
        "Zero generic quizzes — built for execution"
      ],
      linkText: "Build Your Plan",
      href: "/progress-builder?start=true",
      badge: "Interactive Wizard",
      highlight: true
    },
    {
      id: "workshops",
      category: "Live Execution Cohort",
      icon: Calendar,
      title: "Wednesday Live Labs",
      description:
        "Weekly interactive sessions where members dismantle execution bottlenecks, refine project architecture, and submit work for real-time peer critique.",
      features: [
        "Live systems walkthroughs every Wednesday",
        "Direct feedback on active projects & portfolios",
        "Full access to the session recordings vault"
      ],
      linkText: "Explore Workshops",
      href: "/workshops",
      badge: "Every Wednesday",
      highlight: false
    },
    {
      id: "books",
      category: "Foundational Curriculum",
      icon: BookOpen,
      title: "Curated Books & Literature",
      description:
        "Original works including 'Align Your Mindset', actionable frameworks on discipline, and curated reading roadmaps designed for long-term thinkers.",
      features: [
        "In-depth books on value creation & discipline",
        "Actionable chapter worksheets & exercises",
        "Reading roadmaps for ambitious professionals"
      ],
      linkText: "Browse Books",
      href: "/books",
      badge: "Original Books",
      highlight: false
    },
    {
      id: "community",
      category: "Accountability Circle",
      icon: Users,
      title: "Weekly Proof Community",
      description:
        "A private WhatsApp community of builders, engineers, and creators. Monday intentions, Wednesday mid-week labs, and Friday public evidence checkpoints.",
      features: [
        "Mon/Wed/Fri accountability rhythm",
        "Zero hype, zero spam, zero motivational noise",
        "Direct connection to driven peers"
      ],
      linkText: "Join Community",
      href: site.communityUrl,
      badge: "Active Daily",
      highlight: false,
      external: true
    }
  ];

  return (
    <section className="modSection modOfferingsSection" id="offerings" aria-labelledby="offerings-heading">
      <div className="shell">
        {/* Section Header */}
        <div className="modSectionHead">
          <div className="modSectionBadge">
            <Sparkles size={14} aria-hidden="true" />
            <span>Practical Growth Pathways</span>
          </div>
          <h2 id="offerings-heading" className="modSectionTitle">
            Designed for execution, not passive consumption.
          </h2>
          <p className="modSectionLead">
            We don&apos;t offer superficial motivational seminars. We provide structured environments
            where you build skills, maintain discipline, and prove your progress.
          </p>
        </div>

        {/* 4 Cards Grid (2x2) */}
        <div className="modernOfferingsGrid">
          {offerings.map((offering) => {
            const Icon = offering.icon;
            return (
              <div
                key={offering.id}
                className={`modernOfferCard ${offering.highlight ? "isHighlighted" : ""}`}
              >
                <div className="offerCardTop">
                  <span className="offerCategory">{offering.category}</span>
                  <span className="offerBadge">{offering.badge}</span>
                </div>

                <div className="offerTitleRow">
                  <div className="offerIconWrap">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="offerTitle">{offering.title}</h3>
                </div>

                <p className="offerDescription">{offering.description}</p>

                <ul className="offerFeatureList">
                  {offering.features.map((feat, i) => (
                    <li key={i} className="offerFeatureItem">
                      <Check size={14} className="offerCheck" aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="offerCardAction">
                  {offering.external ? (
                    <a
                      href={offering.href}
                      target="_blank"
                      rel="noreferrer"
                      className="offerActionBtn"
                    >
                      <span>{offering.linkText}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={offering.href} className="offerActionBtn">
                      <span>{offering.linkText}</span>
                      <ArrowRight size={15} aria-hidden="true" />
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

