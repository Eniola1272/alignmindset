import type { Metadata } from "next";
import { getFeaturedArticles } from "@/lib/articles";
import { HeroSection } from "@/components/home/hero-section";
import { PathwaySelector } from "@/components/home/pathway-selector";
import { AlignmentFramework } from "@/components/home/alignment-framework";
import { ProgressPreview } from "@/components/home/progress-preview";
import { GrowthOfferings } from "@/components/home/growth-offerings";
import { CommunitySection } from "@/components/home/community-section";
import { ProgressStories } from "@/components/home/progress-stories";
import { EditorialSection } from "@/components/home/editorial-section";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Align Mindset Initiative | Intentional Personal Growth & Practical Systems",
  description:
    "We help you align your mindset, goals, skills, systems, and daily actions so you can stop drifting and start making meaningful progress."
};

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <main className="homeRedesign">
      {/* SECTION 1: HERO — The Wake-up Call */}
      <HeroSection />

      {/* SECTION 2: RECOGNITION AND DIRECTION — 3 Interactive Visitor Pathways */}
      <PathwaySelector />

      {/* SECTION 3: THE ALIGNMENT FRAMEWORK — Connected 8-Stage Pipeline */}
      <AlignmentFramework />

      {/* SECTION 4: PROGRESS IN PRACTICE — The 90-Day Blueprint Realization */}
      <ProgressPreview />

      {/* SECTION 5: HOW YOU CAN GROW HERE — Practical Offerings */}
      <GrowthOfferings />

      {/* SECTION 6: COMMUNITY AND ACCOUNTABILITY — The 4-Day Execution Rhythm */}
      <CommunitySection />

      {/* SECTION 7: PROGRESS STORIES — Grounded Evidence & Habits */}
      <ProgressStories />

      {/* SECTION 8: IDEAS WORTH APPLYING — Actionable Editorial Essays */}
      <EditorialSection articles={articles} />

      {/* SECTION 9: FINAL ACTIVATION — One Clear Decision */}
      <FinalCta />
    </main>
  );
}
