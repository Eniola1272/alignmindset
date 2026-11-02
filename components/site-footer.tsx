import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission Column */}
          <div>
            <div className="footerBrandWrap">
              <Logo />
            </div>
            <p className="footer-note">
              Useful ideas. Better systems. Meaningful action. A community committed to growing on purpose.
            </p>
            <span className="eyebrow on-dark">KEEP BECOMING. ↗</span>
          </div>

          {/* Explore Column */}
          <div>
            <h4>EXPLORE</h4>
            <div className="footer-links">
              <Link href="/#about">Our philosophy</Link>
              <Link href="/#approach">Our approach</Link>
              <Link href="/progress-builder">90-day planning</Link>
              <Link href="/books">Books &amp; Curriculum</Link>
            </div>
          </div>

          {/* Grow Column */}
          <div>
            <h4>GROW</h4>
            <div className="footer-links">
              <Link href="/progress-builder?start=true">Find your starting point</Link>
              <Link href="/workshops">Learning experiences</Link>
              <Link href="/blog">Ideas &amp; insights</Link>
              <a href={site.communityUrl} target="_blank" rel="noreferrer">
                WhatsApp Community
              </a>
            </div>
          </div>

          {/* Callout Column */}
          <div>
            <h4>ONE GOOD STEP</h4>
            <div className="footer-links">
              <span>
                Every meaningful change begins with a decision to do something differently.
              </span>
              <Link
                href="/progress-builder?start=true"
                style={{ color: "var(--yellow)", marginTop: "8px", fontWeight: 700 }}
              >
                Make yours today ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Align Mindset Initiative. Built for intentional growth.</span>
          <span>
            Designed to help people make progress, not just promises. &nbsp;
            <a href="#top">Back to top ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
