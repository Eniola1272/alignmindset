import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="shell footerSubscribe">
        <div>
          <span>Stay in the movement</span>
          <h2>Useful ideas for a more purposeful life.</h2>
          <p>
            Get practical notes on discipline, skills, business, money, and
            value creation.
          </p>
        </div>
        <NewsletterForm
          className="footerNewsletterForm"
          label="Subscribe"
          submitLabel="Join"
        />
      </div>
      <div className="shell footerGrid">
        <div>
          <Logo />
          <p>
            Align Mindset Initiative helps people build identity, systems,
            skills, and disciplined action for purposeful growth.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/start-here">Start Here</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/workshops">Workshops</Link>
          <Link href="/#programs">Programs</Link>
          <Link href="/blog">Articles</Link>
          <Link href="/#about">About</Link>
        </div>
        <div>
          <h2>Community</h2>
          <a href={site.communityUrl} target="_blank" rel="noreferrer">
            Join
          </a>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/partners">Sponsor / Partner</Link>
          <Link href="/books">Books</Link>
        </div>
        <div>
          <h2>Connect</h2>
          <a href={site.communityUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href="tel:+2349038681717">+234 9038681717</a>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© {new Date().getFullYear()} Align Mindset Initiative.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
