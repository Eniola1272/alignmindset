import { JcNewsletterForm } from "./jc-newsletter-form";

export function JcNewsletter() {
  return (
    <section className="jcNewsletterSection" id="newsletter" aria-labelledby="jc-newsletter-heading">
      <div className="shell jcNarrowShell">
        <div className="jcNewsletterBox">
          <span className="jcEyebrow">The Align Dispatch</span>

          <h2 id="jc-newsletter-heading" className="jcNewsletterTitle">
            Deliberate ideas on discipline, systems, and value creation.
          </h2>

          <p className="jcNewsletterDesc">
            Every week, we share concise, practical frameworks to help you build repeatable daily
            systems, eliminate wasted effort, and execute consistently. No motivational fluff—only
            grounded principles you can apply in your next 24 hours.
          </p>

          <JcNewsletterForm />
        </div>
      </div>
    </section>
  );
}

