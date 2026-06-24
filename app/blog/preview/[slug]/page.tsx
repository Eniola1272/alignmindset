import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Edit3 } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/admin";
import { getArticlePreviewBySlug } from "@/lib/articles";

type PreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: "Draft preview",
  robots: {
    index: false,
    follow: false
  }
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  if (!isAdminEnabled() || !(await isAdminAuthenticated())) {
    redirect("/admin?error=session");
  }

  const { slug } = await params;
  const article = await getArticlePreviewBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="articlePage">
      <div className="shell articleShell">
        <div className="previewBanner">
          <span>Draft preview</span>
          <Link href={`/admin?edit=${article.slug}#editor`}>
            <Edit3 size={16} aria-hidden="true" />
            Edit post
          </Link>
        </div>
        <Link className="backLink" href="/admin#posts">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to admin
        </Link>
        <div className="articleHeader">
          <div className="articleMeta">
            <span>{article.categoryLabel || article.category}</span>
            <span>{article.readMinutes} min read</span>
            <span>
              {article.scheduledFor
                ? `Scheduled ${new Date(article.scheduledFor).toLocaleString()}`
                : "Unscheduled"}
            </span>
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
