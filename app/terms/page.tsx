import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms"
};

export default function TermsPage() {
  return (
    <article className="legalPage">
      <div className="shell legalShell">
        <Link className="backLink" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>
        <span>Terms</span>
        <h1>Using the Align Mindset website.</h1>
        <p className="legalLead">
          By using this website, you agree to use its content, community spaces,
          and services responsibly.
        </p>

        <section>
          <h2>Educational content</h2>
          <p>
            Our articles, sessions, downloads, and other materials are provided
            for general educational purposes. They are not professional legal,
            medical, or financial advice.
          </p>
        </section>
        <section>
          <h2>Community conduct</h2>
          <p>
            Treat other members with respect. Do not use our spaces to harass,
            mislead, spam, or distribute unlawful or harmful material. We may
            remove content or access when needed to protect the community.
          </p>
        </section>
        <section>
          <h2>Intellectual property</h2>
          <p>
            Unless stated otherwise, Align Mindset Initiative owns the original
            website content and resources. You may share links and brief excerpts
            with credit, but you may not reproduce or sell our work without
            permission.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
        <p className="legalUpdated">Last updated: September 17, 2026</p>
      </div>
    </article>
  );
}
