export function EditorialFramework() {
  const methods = [
    {
      num: "01 /",
      title: "Find your direction.",
      desc: "Know who you're becoming, what matters to you, and which destination you're working toward."
    },
    {
      num: "02 /",
      title: "Build the right foundation.",
      desc: "Develop the knowledge, skills, environment, and relationships your goals actually require."
    },
    {
      num: "03 /",
      title: "Make a system for progress.",
      desc: "Translate big intentions into repeatable routines, weekly priorities, and small, doable actions."
    },
    {
      num: "04 /",
      title: "Do the work. Learn. Repeat.",
      desc: "Take action, create evidence of progress, reflect honestly, and adjust your course as you grow."
    }
  ];

  return (
    <section className="framework" id="approach" aria-labelledby="framework-title">
      <div className="container framework-inner">
        <div className="framework-intro">
          <span className="eyebrow on-dark">THE ALIGNMENT APPROACH</span>
          <h2 id="framework-title" className="section-title">
            Growth isn&apos;t<br />
            magic.<br />
            <em>It&apos;s alignment.</em>
          </h2>
          <p>
            We believe the biggest changes happen when what you believe, what you&apos;re learning,
            and what you do every day start moving in the same direction.
          </p>
          <div className="quote">
            <span className="quote-star">✳</span>
            <p>
              Not a perfect life.<br />
              A deliberate one.
            </p>
          </div>
        </div>

        <div className="method-list">
          {methods.map((m) => (
            <div key={m.num} className="method">
              <span className="method-index">{m.num}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
              <span className="method-icon">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

