import type { Metadata } from "next";
import { getFeaturedArticles } from "@/lib/articles";
import { ModernHero } from "@/components/home/modern-hero";
import { ModernStartingPoint } from "@/components/home/modern-starting-point";
import { ModernSystem } from "@/components/home/modern-system";
import { ModernOfferings } from "@/components/home/modern-offerings";
import { ModernCommunity } from "@/components/home/modern-community";
import { ModernEditorial } from "@/components/home/modern-editorial";
import { ModernCta } from "@/components/home/modern-cta";

export const metadata: Metadata = {
  title: "Align Mindset Initiative | Purposeful Growth, Systems & Real Progress",
  description:
    "We help you align your identity, goals, skills, systems, and daily habits so you can stop drifting, overcome mediocrity, and build verifiable proof of progress."
};

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <main className="modernHome">
      {/* 1. HERO: Wake-up call, clear value proposition & interactive 90-day product preview */}
      <ModernHero />

      {/* 2. STARTING POINT: 3-choice interactive diagnostic & personalized blueprint preview */}
      <ModernStartingPoint />

      {/* 3. THE SYSTEM: 3-pillar architectural operating framework */}
      <ModernSystem />

      {/* 4. PRACTICAL OFFERINGS: 4 execution pathways (Builder, Workshops, Curriculum, Community) */}
      <ModernOfferings />

      {/* 5. COMMUNITY & ACCOUNTABILITY: 4-day rhythm & authentic peer evidence */}
      <ModernCommunity />

      {/* 6. ESSENTIAL EDITORIAL: Clear thinking on systems, skills, and value creation */}
      <ModernEditorial articles={articles} />

      {/* 7. ACTIVATION CTA: Modern decision card with single-border vertically stacked inputs */}
      <ModernCta />
    </main>
  );
}
