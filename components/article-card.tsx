import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="articleCard">
      <div className="articleMeta">
        <span>{article.category}</span>
        <span>{article.readMinutes} min read</span>
      </div>
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      <Link href={`/blog/${article.slug}`}>
        Continue reading
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
