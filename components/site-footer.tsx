import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="shell footerSubscribe">
        <div>
          <span>Newsletter</span>
          <h3>Keep up with Align Mindset</h3>
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
          <Link href="/books">Books</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/workshops">Workshops</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <h2>Community</h2>
          <a href={site.communityUrl} target="_blank" rel="noreferrer">
            Join WhatsApp group
          </a>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/partners">Sponsor / Partner</Link>
          <Link href="/#rhythm">Weekly rhythm</Link>
          <Link href="/admin">Admin</Link>
          <a href={`mailto:${site.email}`}>Contact</a>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href="tel:+2349038681717">+234 9038681717</a>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© {new Date().getFullYear()} Align Mindset Initiative.</span>
        <span>Built for people who are ready to move beyond survival mode.</span>
      </div>
    </footer>
  );
}
