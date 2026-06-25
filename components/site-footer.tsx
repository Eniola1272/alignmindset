import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
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
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <h2>Community</h2>
          <Link href="/#join">Join updates</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/partners">Sponsor / Partner</Link>
          <Link href="/#rhythm">Weekly rhythm</Link>
          <Link href="/admin">Admin</Link>
          <a href={`mailto:${site.email}`}>Contact</a>
        </div>
        <div>
          <h2>Focus</h2>
          <p>Identity → Systems → Skills → Action → Assets → Leverage</p>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© {new Date().getFullYear()} Align Mindset Initiative.</span>
        <span>Built for people who are ready to move beyond survival mode.</span>
      </div>
    </footer>
  );
}
