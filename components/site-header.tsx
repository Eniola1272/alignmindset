"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement">
        <div className="container announcementInner">
          <span>
            <strong>AN INVITATION TO MORE.</strong> &nbsp; You don&apos;t have to figure everything out alone.
          </span>
          <span className="small-hide">
            Less drifting. More deliberate living. &nbsp; ↗
          </span>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header className="nav-shell">
        <div className="nav container">
          <div className="brandWrap">
            <Logo />
          </div>

          <nav className={`nav-links ${isMenuOpen ? "open" : ""}`} id="main-nav" aria-label="Main navigation">
            <Link href="/#approach" onClick={closeMenu}>Our approach</Link>
            <Link href="/#start" onClick={closeMenu}>Start here</Link>
            <Link href="/progress-builder" onClick={closeMenu}>90-Day Plan</Link>
            <Link href="/books" onClick={closeMenu}>Books</Link>
            <Link href="/workshops" onClick={closeMenu}>Experiences</Link>
            <Link href="/blog" onClick={closeMenu}>Ideas &amp; insights</Link>
            <a
              href={site.communityUrl}
              target="_blank"
              rel="noreferrer"
              className="mobileOnlyLink"
              onClick={closeMenu}
            >
              WhatsApp Community ↗
            </a>
          </nav>

          <div className="navCtaWrap">
            <Link href="/progress-builder?start=true" className="btn btn-dark nav-cta">
              <span>Find your starting point</span>
              <span className="arrow">↗</span>
            </Link>
          </div>

          <button
            className="menu-button"
            id="menu-button"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  );
}
