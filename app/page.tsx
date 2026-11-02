import type { Metadata } from "next";
import { getFeaturedArticles } from "@/lib/articles";
import { HeroSection } from "@/components/home/hero-section";
import { StartingPointExperience } from "@/components/home/starting-point-experience";
import { AlignmentFramework } from "@/components/home/alignment-framework";
import { GrowthOfferings } from "@/components/home/growth-offerings";
import { CommunitySection } from "@/components/home/community-section";
import { ProgressStories } from "@/components/home/progress-stories";
import { EditorialSection } from "@/components/home/editorial-section";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Align Mindset Initiative | Purposeful Growth, Systems & Real Progress",
  description:
    "We help you align your identity, goals, skills, systems, and daily habits so you can stop drifting, overcome mediocrity, and build verifiable proof of progress."
};

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <main className="homeRedesign">
      {/* SECTION 1: HERO — The Wake-up Call */}
      <HeroSection />

      {/* SECTION 2: FIND YOUR STARTING POINT — Interactive Diagnostic & 90-Day Plan Preview */}
      <StartingPointExperience />

      {/* SECTION 3: THE ALIGNMENT FRAMEWORK — Connected 8-Stage Pipeline */}
      <AlignmentFramework />

      {/* SECTION 4: HOW YOU CAN GROW HERE — Practical Offerings */}
      <GrowthOfferings />

      {/* SECTION 5: COMMUNITY AND ACCOUNTABILITY — The 4-Day Execution Rhythm */}
      <CommunitySection />

      {/* SECTION 6: PROGRESS STORIES — Grounded Evidence & Habits */}
      <ProgressStories />

      {/* SECTION 7: IDEAS WORTH APPLYING — Actionable Editorial Essays */}
      <EditorialSection articles={articles} />

      {/* SECTION 8: FINAL ACTIVATION — One Clear Decision */}
      <FinalCta />
    </main>
  );
}
