import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { getArticleBySlug, getArticles } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found"
    };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: article.ogImageUrl || article.featuredImageUrl
        ? [article.ogImageUrl || article.featuredImageUrl || ""]
        : undefined
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="articlePage">
      <div className="shell articleShell">
        <Link className="backLink" href="/blog">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to blog
        </Link>
        <div className="articleHeader">
          <div className="articleMeta">
            <span>{article.categoryLabel || article.category}</span>
            <span>{article.readMinutes} min read</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          {article.tags.length ? (
            <div className="articleTags articleHeaderTags">
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
        {article.featuredImageUrl ? (
          <figure className="articleHeroImage">
            <img src={article.featuredImageUrl} alt="" />
          </figure>
        ) : null}
        <ArticleBody blocks={article.body} />
      </div>
    </article>
  );
}
