export function JcManifesto() {
  const tenets = [
    {
      num: "01",
      title: "Clarity of Destination",
      description: "Choose one primary target for 90 days. Trying to pursue five paths simultaneously guarantees shallow progress in all of them."
    },
    {
      num: "02",
      title: "Daily Operating Systems",
      description: "Willpower drains by Wednesday. Protect calendar focus blocks with an emergency minimum so routines survive chaotic days."
    },
    {
      num: "03",
      title: "Verifiable Proof of Work",
      description: "Motivation fluctuates; shipped proof compounds. Measure growth by deployed code, published writing, and peer-reviewed work."
    }
  ];

  return (
    <section className="jcManifestoSection" aria-label="Core Philosophy">
      <div className="shell jcNarrowShell">
        <div className="jcQuoteBox">
          <blockquote className="jcBigQuote">
            &ldquo;Mediocrity is not a lack of talent. It is what happens when potential is left
            without a system.&rdquo;
          </blockquote>
          <cite className="jcQuoteCite">— The Align Mindset Principle</cite>
        </div>

        <p className="jcManifestoLead">
          Most people don&apos;t fail because they lack ambition. They fail because their days are
          scattered across twenty uncommitted tabs, their routines collapse whenever motivation
          dips, and they have no weekly proof of work. We build practical environments where
          progress becomes repeatable, measurable, and real.
        </p>

        <div className="jcTenetsGrid">
          {tenets.map((t) => (
            <div key={t.num} className="jcTenetCol">
              <span className="jcTenetNum">{t.num}</span>
              <h3 className="jcTenetTitle">{t.title}</h3>
              <p className="jcTenetDesc">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

