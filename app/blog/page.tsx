import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles from Align Mindset Initiative on identity, systems, skills, action, assets, and community."
};

export default async function BlogPage() {
  const articles = await getArticles();
  const categories = Array.from(
    new Set(
      articles.flatMap((article) => [
        article.categoryLabel || article.category,
        ...article.tags
      ])
    )
  ).slice(0, 12);

  return (
    <section className="pageHero">
      <div className="shell">
        <SectionHeading
          eyebrow="Blog"
          title="Articles for people building their life with intention."
          copy="Use these essays as prompts for WhatsApp discussions, online meetings, and weekly action challenges."
        />
        <div className="categoryRail" aria-label="Blog categories">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <div className="articleGrid blogGrid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
