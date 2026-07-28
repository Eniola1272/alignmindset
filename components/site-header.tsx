"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="siteHeader">
      <div className="shell headerInner">
        <Logo />
        <nav className="headerNav" aria-label="Primary navigation">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="headerActions">
          <Link className="headerLoginLink" href="/admin">
            Admin
          </Link>
          <Link
            className="pillButton desktopHeaderCta"
            href={site.communityUrl}
            target="_blank"
            rel="noreferrer"
          >
            Join
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          className="mobileMenuButton"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      {isMenuOpen ? (
        <div className="mobileMenu" id="mobile-menu">
          <button
            className="mobileMenuBackdrop"
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div className="mobileMenuPanel">
            <nav aria-label="Mobile navigation">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              className="mobileMenuAdmin"
              href="/admin"
              onClick={closeMenu}
            >
              Admin
            </Link>
            <Link
              className="pillButton mobileMenuCta"
              href={site.communityUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Join the movement
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
