import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function JcHero() {
  return (
    <section className="jcHero" aria-labelledby="jc-hero-heading">
      <div className="shell jcHeroShell">
        <div className="jcHeroGrid">
          {/* Left Column: Focused Copy */}
          <div className="jcHeroCopy">
            <span className="jcEyebrow">An Operating System for Real Progress</span>

            <h1 id="jc-hero-heading" className="jcHeroTitle">
              Better habits. Clear systems. Undeniable progress.
            </h1>

            <p className="jcHeroLead">
              Align Mindset is a personal growth initiative helping ambitious people align their
              identity, daily systems, and skills—so they stop drifting, eliminate scattered
              distractions, and build verifiable proof of progress.
            </p>

            <div className="jcHeroActions">
              <Link href="/progress-builder?start=true" className="jcPrimaryBtn">
                <span>Build Your 90-Day Plan</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              <Link href="/books" className="jcSecondaryBtn">
                <span>Explore the Books</span>
              </Link>
            </div>

            <div className="jcTrustNote">
              <span className="jcTrustItem">Free guided 10-step intake</span>
              <span className="jcTrustSep" aria-hidden="true">•</span>
              <span className="jcTrustItem">Instant PDF roadmap</span>
              <span className="jcTrustSep" aria-hidden="true">•</span>
              <span className="jcTrustItem">Zero hype or ads</span>
            </div>
          </div>

          {/* Right Column: Clean Book Feature (James Clear style book presentation) */}
          <div className="jcHeroVisual">
            <div className="jcBookCard">
              <div className="jcBookCoverWrap">
                <Image
                  src="/images/books/ask-for-help-book-cover.png"
                  alt="Ask for Help book cover — The Align Mindset Curriculum"
                  width={280}
                  height={380}
                  className="jcBookCoverImg"
                  priority
                />
              </div>
              <div className="jcBookMeta">
                <span className="jcBookTag">Flagship Curriculum</span>
                <strong className="jcBookTitle">The Comeback Bundle</strong>
                <p className="jcBookDesc">
                  4 practical books on asking for help, picking one skill, packaging your offer, and
                  mastering the daily craft.
                </p>
                <Link href="/books" className="jcBookLink">
                  <span>Learn about the books</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

