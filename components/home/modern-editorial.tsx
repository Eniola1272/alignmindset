import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

type ModernEditorialProps = {
  articles: Article[];
};

export function ModernEditorial({ articles }: ModernEditorialProps) {
  const displayArticles = articles.slice(0, 3);

  return (
    <section className="modSection modEditorialSection" id="editorial" aria-labelledby="editorial-heading">
      <div className="shell">
        {/* Header */}
        <div className="editorialHeadRow">
          <div className="headColLeft">
            <div className="modSectionBadge">
              <BookOpen size={14} aria-hidden="true" />
              <span>Ideas Worth Applying</span>
            </div>
            <h2 id="editorial-heading" className="modSectionTitle">
              Clear thinking on discipline, systems, and value.
            </h2>
          </div>

          <Link href="/blog" className="modSecondaryBtn editorialAllLink">
            <span>Read All Articles</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="modernEditorialGrid">
          {displayArticles.map((article) => (
            <article key={article.id} className="editorialCard">
              <div className="editorialMetaRow">
                <span className="editorialCatBadge">{article.categoryLabel || article.category}</span>
                <span className="editorialReadTime">
                  <Clock size={12} aria-hidden="true" />
                  <span>{article.readMinutes} min read</span>
                </span>
              </div>

              <h3 className="editorialCardTitle">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>

              <p className="editorialCardExcerpt">{article.excerpt}</p>

              <div className="editorialCardFooter">
                <Link href={`/blog/${article.slug}`} className="editorialCardLink">
                  <span>Read Article</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

