import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

// Actionable principles paired with articles
const ARTICLE_PRINCIPLES: Record<string, string> = {
  "align-your-identity-before-your-goals":
    "Identity creates the emotional stability that makes hard goals feel normal.",
  "build-systems-not-motivation":
    "When the daily next action is friction-free, willpower is no longer the bottleneck.",
  "skills-that-increase-your-value":
    "Proof of work and public artifacts beat certificates and credentials every time.",
  "from-learning-to-assets":
    "Every lesson you consume should produce one durable artifact within 48 hours.",
  "how-to-revive-a-quiet-community":
    "Accountability succeeds when participation is structured around evidence, not noise."
};

const DEFAULT_PRINCIPLE =
  "Turn every concept into an immediate calendar block and verifiable proof of work.";

type EditorialSectionProps = {
  articles: Article[];
};

export function EditorialSection({ articles }: EditorialSectionProps) {
  const displayArticles = articles.slice(0, 3);

  return (
    <section className="sectionPad editorialSection" id="articles" aria-labelledby="editorial-heading">
      <div className="shell">
        <div className="editorialHeaderSplit">
          <div>
            <span className="editorialEyebrow">Ideas Worth Applying</span>
            <h2 id="editorial-heading" className="editorialMainHeading">
              Essays on systems, skills, and disciplined execution.
            </h2>
            <p className="editorialSubtitle">
              We write for people who read to apply. Every piece connects a core concept directly
              to an actionable principle you can put into practice today:
            </p>
          </div>

          <Link href="/blog" className="editorialLink editorialHeaderLink">
            <span>Explore all essays</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="editorialGrid">
          {displayArticles.map((article) => {
            const principle = ARTICLE_PRINCIPLES[article.slug] || DEFAULT_PRINCIPLE;

            return (
              <article key={article.id} className="editorialCard">
                <div className="editorialCardMeta">
                  <span className="editorialCategoryPill">{article.category}</span>
                  <span className="editorialReadTime">
                    <Clock size={13} aria-hidden="true" />
                    {article.readMinutes} min read
                  </span>
                </div>

                <h3 className="editorialCardTitle">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="editorialCardExcerpt">{article.excerpt}</p>

                {/* Core Actionable Principle Callout */}
                <div className="editorialPrincipleBox">
                  <span className="editorialPrincipleLabel">Actionable Principle</span>
                  <p className="editorialPrincipleText">{principle}</p>
                </div>

                <div className="editorialCardFooter">
                  <Link href={`/blog/${article.slug}`} className="editorialCardLink">
                    <span>Read essay</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

