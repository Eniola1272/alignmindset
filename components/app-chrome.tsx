"use client";

import { usePathname } from "next/navigation";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type AppChromeProps = {
  children: React.ReactNode;
  newsletterPopupEnabled: boolean;
  newsletterPopupRevision: number;
};

export function AppChrome({
  children,
  newsletterPopupEnabled,
  newsletterPopupRevision
}: AppChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      {isAdmin ? null : <SiteFooter />}
      {!isAdmin && newsletterPopupEnabled ? (
        <NewsletterPopup revision={newsletterPopupRevision} />
      ) : null}
    </>
  );
}
