import type { Metadata } from "next";
import { AppChrome } from "@/components/app-chrome";
import { ToastProvider } from "@/components/toast-provider";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.shortName}`
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AppChrome
            newsletterPopupEnabled={siteSettings.newsletterPopupEnabled}
            newsletterPopupRevision={siteSettings.newsletterPopupRevision}
          >
            {children}
          </AppChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
