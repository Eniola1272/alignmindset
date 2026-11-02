import Link from "next/link";
import { ArrowRight, BookOpen, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { ModernCtaForm } from "./modern-cta-form";

export function ModernCta() {
  return (
    <section className="modSection modCtaSection" id="start-now" aria-labelledby="cta-heading">
      <div className="shell">
        <div className="modernCtaBanner">
          {/* Left Column: Direct Call to Action */}
          <div className="modernCtaCopy">
            <div className="modCtaBadge">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Take Responsibility</span>
            </div>

            <h2 id="cta-heading" className="modCtaTitle">
              Your next chapter won&apos;t build itself.
            </h2>

            <p className="modCtaLead">
              Mediocrity is not an irreversible fate; it is simply what happens when ambition
              is left without a system. You don&apos;t need a miraculous overnight transformation.
              You need one clear decision, a realistic 90-day plan, and the willingness to show
              up for your next 24 hours.
            </p>

            <div className="modCtaActions">
              <Link href="/progress-builder?start=true" className="modCtaPrimaryBtn">
                <span>Build Your 90-Day Plan</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="modCtaSecondaryBtn"
              >
                <MessageCircle size={16} aria-hidden="true" />
                <span>Join Community</span>
              </a>
            </div>

            <div className="modCtaTrust">
              <div className="ctaTrustTag">
                <Check size={14} aria-hidden="true" />
                <span>100% Free 10-Step Intake</span>
              </div>
              <div className="ctaTrustTag">
                <Check size={14} aria-hidden="true" />
                <span>Zero Ads & Zero Hype</span>
              </div>
              <div className="ctaTrustTag">
                <Check size={14} aria-hidden="true" />
                <span>Downloadable Blueprint</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Vertical Stack Form */}
          <div className="modernCtaFormBox">
            <div className="ctaFormCard">
              <div className="ctaFormHead">
                <div className="formTag">
                  <BookOpen size={14} aria-hidden="true" />
                  <span>Free Curriculum Ebook</span>
                </div>
                <h3 className="formCardTitle">
                  Get the free guide &amp; weekly dispatches.
                </h3>
                <p className="formCardSubtitle">
                  Receive <em>How to Create Value When You Do Not Have Capital</em> and concise Monday/Friday execution frameworks.
                </p>
              </div>

              <ModernCtaForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

