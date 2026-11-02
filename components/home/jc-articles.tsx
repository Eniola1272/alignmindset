import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

type JcArticlesProps = {
  articles: Article[];
};

export function JcArticles({ articles }: JcArticlesProps) {
  const displayArticles = articles.slice(0, 4);

  return (
    <section className="jcArticlesSection" id="articles" aria-labelledby="jc-articles-heading">
      <div className="shell jcNarrowShell">
        <div className="jcArticlesHeadRow">
          <div>
            <span className="jcEyebrow">Articles &amp; Essays</span>
            <h2 id="jc-articles-heading" className="jcSectionTitle">
              Clear thinking on discipline, systems, and value.
            </h2>
          </div>
          <Link href="/blog" className="jcTextLink">
            <span>All articles</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="jcArticlesList">
          {displayArticles.map((article) => (
            <article key={article.id} className="jcArticleItem">
              <div className="jcArticleMeta">
                <span className="jcArticleCategory">{article.categoryLabel || article.category}</span>
                <span className="jcArticleDot" aria-hidden="true">•</span>
                <span className="jcArticleRead">{article.readMinutes} min read</span>
              </div>

              <h3 className="jcArticleTitle">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>

              <p className="jcArticleExcerpt">{article.excerpt}</p>

              <Link href={`/blog/${article.slug}`} className="jcArticleReadLink">
                <span>Read essay</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="jcArticlesBottom">
          <Link href="/blog" className="jcSecondaryBtn">
            <span>Browse All Articles</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

