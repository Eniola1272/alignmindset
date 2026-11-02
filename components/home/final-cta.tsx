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
        />
        <div className="finalActivationOverlay" aria-hidden="true" />
      </div>

      <div className="shell finalActivationInner">
        <div className="finalActivationGrid">
          <div className="finalActivationCopy">
            <div className="finalActivationBadge">
              <Sparkles size={15} aria-hidden="true" />
              <span>Take the First Step</span>
            </div>

            <h2 id="final-cta-heading" className="finalActivationTitle">
              Your next chapter won&apos;t build itself.
            </h2>

            <p className="finalActivationLead">
              Start with one clear decision. Build the systems that help you follow through.
              Stop letting another month slip by in unintentional drift.
            </p>

            <div className="finalActivationButtons">
              <Link href="/progress-builder?start=true" className="primaryButton finalPrimaryBtn">
                Find My Starting Point
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
                <span>100% Free Guided 90-Day Blueprint</span>
              </div>
              <div className="finalTrustItem">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Zero Ads, No Artificial Transformation Hype</span>
              </div>
            </div>
          </div>

          {/* Quick Newsletter Box */}
          <div className="finalNewsletterWrap">
            <NewsletterForm
              className="finalNewsletterForm"
              label="Receive our weekly practical mindset notes"
              submitLabel="Subscribe to Notes"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

