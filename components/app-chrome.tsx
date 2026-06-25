"use client";

import { usePathname } from "next/navigation";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      {isAdmin ? null : <SiteFooter />}
      {isAdmin ? null : <NewsletterPopup />}
    </>
  );
}
