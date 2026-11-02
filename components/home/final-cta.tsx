import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="finalActivationSection" id="start-now" aria-labelledby="final-cta-heading">
      <div className="finalActivationBackdrop">
        <img
          src="/images/starter-kit-planning.jpg"
          alt="Hands organizing a structured growth roadmap and focus notebook"
          className="finalActivationImage"
          width={1200}
          height={700}
          loading="lazy"
        />
        <div className="finalActivationOverlay" aria-hidden="true" />
      </div>

      <div className="shell finalActivationInner">
        <div className="finalActivationGrid">
          <div className="finalActivationCopy">
            <div className="finalActivationBadge">
              <Sparkles size={15} aria-hidden="true" />
              <span>Take Responsibility For Your Direction</span>
            </div>

            <h2 id="final-cta-heading" className="finalActivationTitle">
              Your next chapter won&apos;t build itself.
            </h2>

            <p className="finalActivationLead">
              Mediocrity is not an irreversible condition; it is simply what happens when potential
              is left without a system. You don&apos;t need a total life overhaul tomorrow. You need one
              clear decision, a realistic 90-day plan, and the willingness to show up for your next 24 hours.
            </p>

            <div className="finalActivationButtons">
              <Link href="/progress-builder?start=true" className="primaryButton finalPrimaryBtn">
                Build My 90-Day Progress Plan
                <ArrowRight size={17} aria-hidden="true" />
              </Link>

              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="secondaryButton finalSecondaryBtn"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Join the Community
              </a>
            </div>

            <div className="finalTrustPoints">
              <div className="finalTrustItem">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>100% Free Guided 90-Day Intake Diagnostic</span>
              </div>
              <div className="finalTrustItem">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Zero Ads, Zero Fluff, Grounded in Real Proof</span>
              </div>
            </div>
          </div>

          {/* Quick Newsletter Box */}
          <div className="finalNewsletterWrap">
            <NewsletterForm
              className="finalNewsletterForm"
              label="Receive our weekly practical notes on systems, discipline, and value creation"
              submitLabel="Subscribe to Notes"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
