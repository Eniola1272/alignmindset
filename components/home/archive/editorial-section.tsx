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
    <section className="edSection edEditorialSection" id="articles" aria-labelledby="editorial-heading">
      <div className="shell">
        {/* Section Header */}
        <div className="edSectionHeaderSplit">
          <div>
            <div className="edSectionMeta">
              <span>Open Curriculum</span>
              <span className="edDot" aria-hidden="true">•</span>
              <span>Section 07</span>
            </div>
            <h2 id="editorial-heading" className="edSectionHeading">
              Reading that informs your calendar, not just your intellect.
            </h2>
            <p className="edSectionLead">
              Consuming advice without execution is just another form of procrastination. We write for
              practitioners who read to apply. Every essay connects a foundational mental model to a
              concrete action you can put into practice today:
            </p>
          </div>

          <Link href="/blog" className="edSecondaryLink edHeaderLink">
            <span>Explore all essays</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* Editorial Essay Index Grid */}
        <div className="edEssaysGrid">
          {displayArticles.map((article, idx) => {
            const principle = ARTICLE_PRINCIPLES[article.slug] || DEFAULT_PRINCIPLE;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <article key={article.id} className="essayEntry">
                <div className="essayMetaHeader">
                  <span className="essayNum">{num}</span>
                  <div className="essayMetaRight">
                    <span className="essayCategory">{article.category}</span>
                    <span className="essayTime">
                      <Clock size={12} aria-hidden="true" />
                      {article.readMinutes} min
                    </span>
                  </div>
                </div>

                <h3 className="essayTitle">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="essayExcerpt">{article.excerpt}</p>

                {/* Operating Principle Callout */}
                <div className="essayPrincipleCallout">
                  <span className="principleLabel">Operating Principle</span>
                  <p className="principleText">{principle}</p>
                </div>

                <div className="essayFooter">
                  <Link href={`/blog/${article.slug}`} className="essayReadLink">
                    <span>Read essay</span>
                    <ArrowRight size={14} aria-hidden="true" />
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
