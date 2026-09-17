import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy"
};

export default function PrivacyPage() {
  return (
    <article className="legalPage">
      <div className="shell legalShell">
        <Link className="backLink" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>
        <span>Privacy</span>
        <h1>How we handle your information.</h1>
        <p className="legalLead">
          This page explains the information Align Mindset Initiative collects
          through this website and how it is used.
        </p>

        <section>
          <h2>Information you choose to share</h2>
          <p>
            We may collect your name, email address, phone number, comments,
            volunteer application details, and other information you submit
            through our forms.
          </p>
        </section>
        <section>
          <h2>How we use it</h2>
          <p>
            We use this information to send requested updates, respond to
            applications or enquiries, manage community activities, improve our
            resources, and operate the website. We do not sell your personal
            information.
          </p>
        </section>
        <section>
          <h2>Service providers</h2>
          <p>
            We use trusted providers to host website data, deliver email, and
            process payments. Those providers process information only as needed
            to deliver their services and are governed by their own privacy terms.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
            You may unsubscribe from newsletters at any time. To ask about,
            correct, or request deletion of information you have submitted,
            contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
        <p className="legalUpdated">Last updated: September 17, 2026</p>
      </div>
    </article>
  );
}
