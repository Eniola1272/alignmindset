import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="edFinalSection" id="start-now" aria-labelledby="final-cta-heading">
      <div className="shell">
        <div className="edFinalGrid">
          {/* Left Column: Call to Responsibility */}
          <div className="edFinalCopy">
            <div className="finalSectionMeta">
              <span>Section 08</span>
              <span className="metaSep" aria-hidden="true">•</span>
              <span>The Next Decision</span>
            </div>

            <h2 id="final-cta-heading" className="finalTitle">
              Your next chapter won&apos;t build itself.
            </h2>

            <p className="finalLead">
              Mediocrity is not an irreversible condition; it is simply what happens when potential
              is left without a system. You don&apos;t need a total life overhaul tomorrow. You need one
              clear decision, a realistic 90-day plan, and the willingness to show up for your next 24 hours.
            </p>

            <div className="finalActions">
              <Link href="/progress-builder?start=true" className="finalPrimaryBtn">
                <span>Build My 90-Day Progress Plan</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="finalSecondaryBtn"
              >
                <MessageCircle size={16} aria-hidden="true" />
                <span>Join the Community</span>
              </a>
            </div>

            <div className="finalTrustList">
              <span className="trustItem">100% Free Guided 10-Step Assessment</span>
              <span className="trustDot" aria-hidden="true">•</span>
              <span className="trustItem">Zero Ads & Zero Hype</span>
              <span className="trustDot" aria-hidden="true">•</span>
              <span className="trustItem">Downloadable PDF Blueprint</span>
            </div>
          </div>

          {/* Right Column: Weekly Dispatch Subscription */}
          <div className="edFinalNewsletter">
            <div className="newsletterBox">
              <span className="newsletterEyebrow">Weekly Editorial Notes</span>
              <h3 className="newsletterHeading">Deliberate ideas on systems, discipline, and value creation.</h3>
              <p className="newsletterDesc">
                Every Monday and Friday, we send concise, grounded notes directly to your inbox. No fluff,
                no generic motivational quotes—only practical frameworks you can apply immediately.
              </p>
              <NewsletterForm
                className="finalForm"
                label="Subscribe to weekly dispatches"
                submitLabel="Subscribe"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
