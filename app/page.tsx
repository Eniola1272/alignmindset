import type { Metadata } from "next";
import { getFeaturedArticles } from "@/lib/articles";
import { EditorialHero } from "@/components/home/editorial-hero";
import { EditorialStatement } from "@/components/home/editorial-statement";
import { EditorialStartingPoint } from "@/components/home/editorial-starting-point";
import { EditorialFramework } from "@/components/home/editorial-framework";
import { EditorialPlanDemo } from "@/components/home/editorial-plan-demo";
import { EditorialExperiences } from "@/components/home/editorial-experiences";
import { EditorialBelief } from "@/components/home/editorial-belief";
import { EditorialJournal } from "@/components/home/editorial-journal";
import { EditorialClosing } from "@/components/home/editorial-closing";

export const metadata: Metadata = {
  title: "Align Mindset Initiative — Make progress on purpose",
  description:
    "Align Mindset Initiative helps you turn your goals into direction, practical systems, and consistent action. Build a life of purposeful progress."
};

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <div className="editorialLandingPage" id="top">
      {/* 1. Hero: Intentional growth, editorial art frame & rotating stamp */}
      <EditorialHero />

      {/* 2. Statement: Potential is a starting point. Progress takes a system. */}
      <EditorialStatement />

      {/* 3. Starting Point: Where are you right now? (01, 02, 03 interactive paths) */}
      <EditorialStartingPoint />

      {/* 4. Framework: Growth isn't magic. It's alignment. (Forest green, 4 methods) */}
      <EditorialFramework />

      {/* 5. 90-Day Plan: Your future, one week at a time. (Interactive checklist + 90d gold box) */}
      <EditorialPlanDemo />

      {/* 6. Experiences: Real growth. In good company. (3-photo gallery) */}
      <EditorialExperiences />

      {/* 7. Shared Enemy: We are against settling for a life on autopilot. */}
      <EditorialBelief />

      {/* 8. Journal: Good things to think about. (3 editorial article cards) */}
      <EditorialJournal articles={articles} />

      {/* 9. Closing: Start where you are. Don't stay there. (Full-width gold band) */}
      <EditorialClosing />
    </div>
  );
}
