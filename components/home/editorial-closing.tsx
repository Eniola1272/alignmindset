import Link from "next/link";

export function EditorialClosing() {
  return (
    <section className="closing" id="closing" aria-labelledby="closing-title">
      <div className="container closing-inner">
        <div>
          <span className="eyebrow">YOUR NEXT MOVE MATTERS</span>
          <h2 id="closing-title">
            Start where<br />
            you are.<br />
            <em>Don&apos;t stay there.</em>
          </h2>
        </div>

        <div className="closing-right">
          <p>
            You don&apos;t need the perfect moment, a perfect plan, or everything figured out.
            You need a direction worth following—and the willingness to take the next step.
          </p>
          <Link className="btn btn-dark" href="/progress-builder?start=true">
            <span>Find your starting point</span>
            <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

