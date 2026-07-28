import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Star,
  Target,
  UsersRound,
  X
} from "lucide-react";
import { BookCheckoutForm } from "@/components/book-checkout-form";
import { bookBundle, formatNaira } from "@/lib/book-bundle";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Get the Align Mindset 4-book bundle for discipline, value creation, systems, and personal growth."
};

const painPoints = [
  "You have goals, but your discipline disappears when life gets busy.",
  "You want to create value, but you keep waiting for capital, confidence, or permission.",
  "You consume advice every week, but struggle to turn it into visible progress.",
  "You know you are capable of more, but you do not have a system that keeps you moving."
];

const outcomes = [
  "A clearer personal direction",
  "A practical value creation mindset",
  "A weekly system for discipline",
  "Better focus when the work feels difficult",
  "Simple prompts you can return to anytime"
];

const testimonials = [
  {
    name: "Tomiwa",
    role: "Student builder",
    quote:
      "The value creation idea changed how I saw myself. I stopped waiting to have money first and started building proof."
  },
  {
    name: "Amara",
    role: "Early career reader",
    quote:
      "It felt direct and practical. I did not need another motivational speech, I needed a structure I could follow."
  },
  {
    name: "David",
    role: "Community member",
    quote:
      "The discipline section helped me understand why my routines kept breaking and how to restart without drama."
  }
];

const faqs = [
  {
    question: "What happens after I pay?",
    answer:
      "You will be redirected back to the site after Flutterwave checkout. Delivery can then be handled by email or a protected download page once your book files are uploaded."
  },
  {
    question: "Can I buy one book only?",
    answer:
      "The current offer is built around the bundle. Each book is worth N2,000, but the complete 4-book bundle is N5,000."
  },
  {
    question: "Are these physical books?",
    answer:
      "This landing page is set up for digital delivery. If you later want physical books, we can add shipping, address collection, and delivery pricing."
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes. The site redirects buyers to Flutterwave hosted checkout. Card and transfer details are handled by Flutterwave, not stored on this website."
  }
];

export default function BooksPage() {
  const totalValue = bookBundle.individualBookPrice * bookBundle.books.length;

  return (
    <>
      <section className="booksHero">
        <div className="booksHeroShade" aria-hidden="true" />
        <div className="shell booksHeroGrid">
          <div className="booksHeroCopy">
            <span className="booksEyebrow">4-book growth system</span>
            <h1>Stop waiting for perfect conditions. Start becoming valuable.</h1>
            <p>
              I created this bundle for people who know they are meant for more,
              but need a practical system for discipline, value creation,
              focus, and rebuilding momentum.
            </p>
            <div className="booksHeroActions">
              <Link className="primaryButton" href="#bundle-offer">
                Get the bundle
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="secondaryButton glassButton" href="#story">
                Read my story
              </Link>
            </div>
            <div className="booksTrustRow">
              <span>Digital access</span>
              <span>Secure Flutterwave checkout</span>
              <span>Read on any device</span>
            </div>
          </div>
          <div className="booksHeroVisual" aria-label="Book bundle preview">
            <div className="bundlePriceBadge">
              <small>Bundle offer</small>
              <strong>{formatNaira(bookBundle.bundlePrice)}</strong>
              <span>{formatNaira(totalValue)} total value</span>
            </div>
            {bookBundle.books.map((book, index) => (
              <article
                className={`bookCoverMock bookCoverMock-${index + 1}`}
                key={book.title}
              >
                <span>{book.tag}</span>
                <h2>{book.title}</h2>
                <p>Align Mindset</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booksSection booksPain">
        <div className="shell booksNarrow">
          <span className="booksSectionLabel">Sound familiar?</span>
          <h2>You are not lazy. You may simply be operating without a system.</h2>
          <div className="booksPainGrid">
            {painPoints.map((point) => (
              <article key={point}>
                <X size={17} aria-hidden="true" />
                <p>{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booksSection booksStory" id="story">
        <div className="shell booksStoryGrid">
          <figure className="authorPhotoPlaceholder">
            <div>
              <UsersRound size={30} aria-hidden="true" />
              <span>Your photo goes here</span>
            </div>
          </figure>
          <div>
            <span className="booksSectionLabel">The story</span>
            <h2>I know what it feels like to want more, but not know where to start.</h2>
            <p>
              Align Mindset was born from a simple belief: many people do not
              lack potential. They lack structure, language, examples, and a
              community that helps them turn intention into action.
            </p>
            <p>
              These books are my way of putting the core lessons into your
              hands. Not as noise. Not as hype. As practical notes you can read,
              reflect on, and use to build a better personal system.
            </p>
          </div>
        </div>
      </section>

      <section className="booksSection booksShowcase">
        <div className="shell">
          <div className="booksCenteredHeader">
            <span className="booksSectionLabel">What you get</span>
            <h2>The Align Mindset book bundle.</h2>
            <p>
              Four practical resources for people who want discipline,
              direction, value creation, and the confidence to do hard things.
            </p>
          </div>
          <div className="booksProductGrid">
            {bookBundle.books.map((book, index) => (
              <article className="booksProductCard" key={book.title}>
                <div className={`bookCoverMock miniCover miniCover-${index + 1}`}>
                  <span>{book.tag}</span>
                  <h3>{book.title}</h3>
                  <p>Align Mindset</p>
                </div>
                <div>
                  <small>{book.tag}</small>
                  <h3>{book.title}</h3>
                  <p>{book.promise}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booksSection booksValue">
        <div className="shell booksValueGrid">
          <div>
            <span className="booksSectionLabel">Value stack</span>
            <h2>Each book is worth {formatNaira(bookBundle.individualBookPrice)}.</h2>
            <p>
              Bought separately, the full set is {formatNaira(totalValue)}. For
              this bundle offer, you get all four for{" "}
              {formatNaira(bookBundle.bundlePrice)}.
            </p>
          </div>
          <div className="valueStackCard">
            {bookBundle.books.map((book) => (
              <div key={book.title}>
                <span>{book.title}</span>
                <strong>{formatNaira(bookBundle.individualBookPrice)}</strong>
              </div>
            ))}
            <div>
              <span>Total value</span>
              <strong>{formatNaira(totalValue)}</strong>
            </div>
            <div className="valueStackTotal">
              <span>Today bundle price</span>
              <strong>{formatNaira(bookBundle.bundlePrice)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="booksSection booksOutcomes">
        <div className="shell booksOutcomeGrid">
          <div>
            <span className="booksSectionLabel">What changes</span>
            <h2>You do not just need more information. You need better internal structure.</h2>
          </div>
          <div className="outcomesList">
            {outcomes.map((outcome) => (
              <article key={outcome}>
                <CheckCircle2 size={19} aria-hidden="true" />
                <span>{outcome}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booksSection bundleOffer" id="bundle-offer">
        <div className="shell offerGrid">
          <div>
            <span className="booksSectionLabel">Bundle offer</span>
            <h2>Get all 4 books for {formatNaira(bookBundle.bundlePrice)}.</h2>
            <p>
              Fill in your details and continue to secure Flutterwave checkout.
              You can replace the placeholder covers and add final delivery
              automation once the book files are ready.
            </p>
            <div className="offerMiniTrust">
              <span>
                <ShieldCheck size={16} aria-hidden="true" />
                Secure checkout
              </span>
              <span>
                <FileText size={16} aria-hidden="true" />
                Digital bundle
              </span>
              <span>
                <Target size={16} aria-hidden="true" />
                Practical system
              </span>
            </div>
          </div>
          <div className="offerCard">
            <div className="offerCardHeader">
              <small>Limited bundle price</small>
              <strong>{formatNaira(bookBundle.bundlePrice)}</strong>
              <span>{formatNaira(totalValue)} if bought separately</span>
            </div>
            <BookCheckoutForm />
          </div>
        </div>
      </section>

      <section className="booksSection booksProof">
        <div className="shell">
          <div className="booksCenteredHeader">
            <span className="booksSectionLabel">Reader notes</span>
            <h2>For people rebuilding momentum.</h2>
          </div>
          <div className="booksProofGrid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name}>
                <Star size={18} aria-hidden="true" />
                <p>{testimonial.quote}</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booksSection booksFaq">
        <div className="shell booksNarrow">
          <span className="booksSectionLabel">Questions</span>
          <h2>Frequently asked questions.</h2>
          <div className="booksFaqList">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="booksFinalCta">
        <div className="shell">
          <span className="booksSectionLabel">Start here</span>
          <h2>Your comeback can start with one better system.</h2>
          <Link className="primaryButton lightButton" href="#bundle-offer">
            Get the bundle for {formatNaira(bookBundle.bundlePrice)}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
