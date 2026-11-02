import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/articles";

type EditorialJournalProps = {
  articles: Article[];
};

export function EditorialJournal({ articles }: EditorialJournalProps) {
  // Use real articles or graceful defaults matching the editorial concepts
  const article1 = articles[0] || {
    slug: "skills-that-increase-your-value",
    title: "Knowledge is strength. But only when you use it.",
    excerpt: "What happens when learning becomes something that changes the way you think and act?",
    categoryLabel: "Learning & Growth"
  };

  const article2 = articles[1] || {
    slug: "how-to-create-value-when-you-have-no-capital",
    title: "How to create value when you have no capital.",
    excerpt: "A different way to think about skills, resources, and making yourself useful.",
    categoryLabel: "Value & Opportunity"
  };

  const article3 = articles[2] || {
    slug: "build-systems-not-motivation",
    title: "You said “never again.” Why did it happen again?",
    excerpt: "Understanding the gap between what we promise ourselves and what we practice.",
    categoryLabel: "Discipline & Action"
  };

  return (
    <section className="journal" id="journal" aria-labelledby="journal-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE IDEAS WE LIVE BY</span>
            <h2 id="journal-title" className="section-title" style={{ marginTop: "21px" }}>
              Good things<br />
              <em>to think about.</em>
            </h2>
          </div>
          <div className="copy">
            <p>
              We write to challenge our thinking, not just fill our feeds. Start with an idea.
              Leave with a question worth acting on.
            </p>
          </div>
        </div>

        <div className="journal-grid">
          {/* Article 1: Photography Card */}
          <article className="journal-article">
            <div className="journal-art">
              <Image
                src="/images/books/ask-for-help-book-cover.png"
                alt="Book cover and reading materials"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="journal-img"
              />
            </div>
            <div className="tag">{article1.categoryLabel || "Learning & Growth"}</div>
            <h3>{article1.title}</h3>
            <p>{article1.excerpt}</p>
            <Link href={`/blog/${article1.slug}`} className="journal-link">
              <span>Read essay</span>
              <span className="arrow">↗</span>
            </Link>
          </article>

          {/* Article 2: Tilted Paper Note Card */}
          <article className="journal-article">
            <div className="journal-art paper">
              <div className="paper-notes">
                <small>THE QUESTION</small>
                What can you offer with what you already know?
                <span />
              </div>
            </div>
            <div className="tag">{article2.categoryLabel || "Value & Opportunity"}</div>
            <h3>{article2.title}</h3>
            <p>{article2.excerpt}</p>
            <Link href={`/blog/${article2.slug}`} className="journal-link">
              <span>Read essay</span>
              <span className="arrow">↗</span>
            </Link>
          </article>

          {/* Article 3: Graphic Green Art Card */}
          <article className="journal-article">
            <div className="journal-art green">
              <div className="green-art-title">
                Less wishing.<br />
                More doing. ↗
              </div>
            </div>
            <div className="tag">{article3.categoryLabel || "Discipline & Action"}</div>
            <h3>{article3.title}</h3>
            <p>{article3.excerpt}</p>
            <Link href={`/blog/${article3.slug}`} className="journal-link">
              <span>Read essay</span>
              <span className="arrow">↗</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

