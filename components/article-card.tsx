import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="articleCard">
      {article.featuredImageUrl ? (
        <img
          className="articleCardImage"
          src={article.featuredImageUrl}
          alt=""
        />
      ) : null}
      <div className="articleMeta">
        <span>{article.categoryLabel || article.category}</span>
        <span>{article.readMinutes} min read</span>
      </div>
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      {article.tags.length ? (
        <div className="articleTags">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
      <Link href={`/blog/${article.slug}`}>
        Continue reading
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
