import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function JcCta() {
  return (
    <section className="jcFinalCtaSection" aria-label="Take Action">
      <div className="shell jcNarrowShell">
        <div className="jcFinalCtaBox">
          <span className="jcEyebrow">Start Today</span>

          <h2 className="jcFinalCtaTitle">
            The quality of your life depends on the quality of your systems.
          </h2>

          <p className="jcFinalCtaLead">
            You don&apos;t need an overhaul of your entire life tomorrow. You need one clear decision,
            a realistic 90-day plan, and the willingness to show up for your next 24 hours.
          </p>

          <div className="jcFinalCtaActions">
            <Link href="/progress-builder?start=true" className="jcPrimaryBtn">
              <span>Build Your 90-Day Plan</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <a
              href={site.communityUrl}
              target="_blank"
              rel="noreferrer"
              className="jcSecondaryBtn"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>Join the Community</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

