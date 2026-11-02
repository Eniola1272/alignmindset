import Link from "next/link";
import { ArrowRight, Compass, Layers, Repeat, ShieldCheck } from "lucide-react";

export function ModernSystem() {
  const pillars = [
    {
      num: "01",
      icon: Compass,
      label: "Directional Clarity",
      title: "Choose ONE destination for 90 days.",
      description:
        "Trying to master five skills at once guarantees shallow results. We force you to choose one meaningful track, define clear success criteria, and eliminate the other nineteen distractions.",
      meta: "Target: 1 Verifiable Milestone"
    },
    {
      num: "02",
      icon: Repeat,
      label: "Daily Operating Rhythm",
      title: "Protect daily blocks with emergency minimums.",
      description:
        "Willpower drains by Wednesday. We help you design calendar-protected focus windows, reduce startup friction to zero, and set a 15-minute emergency minimum so routines survive chaotic days.",
      meta: "Rule: Never Zero on Hard Days"
    },
    {
      num: "03",
      icon: Layers,
      label: "Compounding Assets",
      title: "Measure progress by shipped proof, not mood.",
      description:
        "Feelings of motivation fluctuate; public proof compounds. Every week ends with an evidence checkpoint where you show deployed code, published writing, or documented client work.",
      meta: "Output: Public Proof of Work"
    }
  ];

  return (
    <section className="modSection" id="framework" aria-labelledby="framework-heading">
      <div className="shell">
        {/* Section Header */}
        <div className="modSectionHead">
          <div className="modSectionBadge">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>The Operating Framework</span>
          </div>
          <h2 id="framework-heading" className="modSectionTitle">
            A practical architecture for intentional execution.
          </h2>
          <p className="modSectionLead">
            Mediocrity survives when ambition is left without systems. Here is how we turn vague
            intentions into compounding, verifiable progress.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="modernSystemGrid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.num} className="modSystemCard">
                <div className="systemCardTop">
                  <span className="systemCardNum">{pillar.num}</span>
                  <div className="systemCardIconWrap">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                </div>

                <span className="systemCardBadge">{pillar.label}</span>
                <h3 className="systemCardTitle">{pillar.title}</h3>
                <p className="systemCardDesc">{pillar.description}</p>

                <div className="systemCardFooter">
                  <span className="systemCardMeta">{pillar.meta}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="systemBottomCallout">
          <div className="calloutLeft">
            <span className="calloutTag">Repeatable Formula</span>
            <p className="calloutText">
              <strong>Clarity → Alignment → Systems → Consistent Action → Proof of Work → Real Growth</strong>
            </p>
          </div>
          <Link href="/progress-builder?start=true" className="calloutLink">
            <span>Map Your System</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

