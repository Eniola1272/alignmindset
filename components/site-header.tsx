import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="shell headerInner">
        <Logo />
        <nav aria-label="Primary navigation">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="pillButton" href="/#join">
          Join the movement
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
