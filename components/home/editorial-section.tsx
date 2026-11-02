import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

// Actionable principles paired with articles
const ARTICLE_PRINCIPLES: Record<string, string> = {
  "align-your-identity-before-your-goals":
    "Identity creates the emotional stability that makes demanding standards feel natural.",
  "build-systems-not-motivation":
    "When your daily next action is friction-free and protected, willpower is no longer the bottleneck.",
  "skills-that-increase-your-value":
    "Indisputable proof of work and public artifacts beat certificates and credentials every time.",
  "from-learning-to-assets":
    "Every concept you study should produce one durable, public artifact within 48 hours.",
  "how-to-revive-a-quiet-community":
    "Accountability succeeds when participation is structured around tangible evidence, not empty noise."
};

const DEFAULT_PRINCIPLE =
  "Translate every concept into a protected calendar block and verifiable proof of work.";

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
              Reading that informs your calendar, not just your intellect.
            </h2>
            <p className="editorialSubtitle">
              Consuming advice without execution is just another form of procrastination. We write for
              practitioners who read to apply. Every essay connects a foundational mental model to a
              concrete action you can put into practice today:
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
                  <span className="editorialPrincipleLabel">Actionable Operating Principle</span>
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
