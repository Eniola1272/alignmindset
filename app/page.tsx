import type { Metadata } from "next";
import { getFeaturedArticles } from "@/lib/articles";
import { JcHero } from "@/components/home/jc-hero";
import { JcManifesto } from "@/components/home/jc-manifesto";
import { JcPillars } from "@/components/home/jc-pillars";
import { JcStartingPoint } from "@/components/home/jc-starting-point";
import { JcArticles } from "@/components/home/jc-articles";
import { JcCommunity } from "@/components/home/jc-community";
import { JcNewsletter } from "@/components/home/jc-newsletter";
import { JcCta } from "@/components/home/jc-cta";

export const metadata: Metadata = {
  title: "Align Mindset Initiative | Better Habits, Clear Systems, Real Progress",
  description:
    "We help ambitious people align identity, daily systems, and skills toward purposeful growth and verifiable progress."
};

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <div className="jcPage">
      {/* 1. HERO: Book feature + clear value proposition + primary actions */}
      <JcHero />

      {/* 2. MANIFESTO: Large-format typographic quote & core operating tenets */}
      <JcManifesto />

      {/* 3. CORE PILLARS: 3 practical pathways (Literature, 90-Day Plan, Community) */}
      <JcPillars />

      {/* 4. STARTING POINT: Minimalist interactive diagnostic */}
      <JcStartingPoint />

      {/* 5. ARTICLES & ESSAYS: Clean vertical editorial list (James Clear style) */}
      <JcArticles articles={articles} />

      {/* 6. COMMUNITY & EXECUTION LABS: Authentic cohort feature */}
      <JcCommunity />

      {/* 7. WEEKLY DISPATCH NEWSLETTER: The signature 3-2-1 style funnel with single-border focus */}
      <JcNewsletter />

      {/* 8. FINAL CTA: Quiet, dignified closing invitation */}
      <JcCta />
    </div>
  );
}
