import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  MessageCircleQuestion,
  ShieldCheck
} from "lucide-react";
import { AskForHelpPreorderModal } from "@/components/ask-for-help-preorder-modal";
import { askForHelpPreorder, formatNaira } from "@/lib/book-bundle";
import { hasFlutterwaveConfig } from "@/lib/flutterwave";

export const metadata: Metadata = {
  title: "Ask for Help | Preorder",
  description:
    "Preorder Ask for Help, a practical guide to asking better questions, finding the right support, and moving forward without struggling in silence.",
  openGraph: {
    title: "Ask for Help | Preorder",
    description: askForHelpPreorder.description,
    images: [askForHelpPreorder.coverImage]
  }
};

const bookThemes = [
  {
    number: "01",
    title: "Ask with clarity",
    copy: "Say what you need, explain where you are stuck, and make it easier for someone to respond well."
  },
  {
    number: "02",
    title: "Find the right person",
    copy: "Learn how to look for useful experience, honest feedback, and support that fits the problem in front of you."
  },
  {
    number: "03",
    title: "Receive help well",
    copy: "Listen without becoming defensive. Ask follow-up questions. Keep the parts that help you move."
  },
  {
    number: "04",
    title: "Turn support into action",
    copy: "Use what you receive. Help becomes meaningful when it changes what you do next."
  }
];

const readerFit = [
  "You keep trying to solve every problem alone.",
  "You hesitate to ask because you do not want to look unprepared.",
  "You ask broad questions and rarely get useful answers.",
  "You have access to good people but do not know how to approach them.",
  "You want to build stronger relationships around learning and growth."
];

export default function AskForHelpPreorderPage() {
  const paymentReady = hasFlutterwaveConfig();
  const preorderSaving =
    askForHelpPreorder.regularPrice - askForHelpPreorder.price;

  return (
    <div className="askHelpPage">
      <section className="askHelpHero">
        <div className="container askHelpHeroGrid">
          <div className="askHelpHeroCopy">
            <span className="askHelpEyebrow">Preorder the first edition</span>
            <h1>You do not have to figure everything out alone.</h1>
            <p>
              <em>Ask for Help</em> is a practical guide to asking better
              questions, finding the right support, and moving forward without
              struggling in silence.
            </p>
            <div className="askHelpHeroActions">
              <AskForHelpPreorderModal paymentReady={paymentReady} />
              <a className="askHelpTextLink" href="#inside-the-book">
                See what is inside
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="askHelpTrustRow">
              <span>
                <ShieldCheck size={16} aria-hidden="true" />
                Secure Flutterwave checkout
              </span>
              <span>{askForHelpPreorder.format}</span>
              <span>Save {formatNaira(preorderSaving)}</span>
            </div>
          </div>

          <figure className="askHelpCoverStage">
            <div className="askHelpCoverGlow" aria-hidden="true" />
            <Image
              src={askForHelpPreorder.coverImage}
              alt="Ask for Help by Eniola Aderounmu"
              width={1024}
              height={1536}
              priority
              sizes="(max-width: 760px) 72vw, 420px"
            />
            <figcaption>
              <span>
                <s>{formatNaira(askForHelpPreorder.regularPrice)}</s> regular
                price
              </span>
              <strong>{formatNaira(askForHelpPreorder.price)}</strong>
              <small>Preorder price</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="askHelpStatement">
        <div className="container askHelpStatementGrid">
          <span>Why this book</span>
          <blockquote>
            Most people do not lack potential. Sometimes they are one honest
            question, one useful conversation, or one clear request away from
            making progress.
          </blockquote>
        </div>
      </section>

      <section className="askHelpSection" id="inside-the-book">
        <div className="container">
          <div className="askHelpSectionHeading">
            <span>Inside the book</span>
            <h2>Asking for help is a skill. You can learn it.</h2>
            <p>
              This book gives you a clearer way to think about support. It also
              shows you what to do before, during, and after you ask.
            </p>
          </div>
          <div className="askHelpThemes">
            {bookThemes.map((theme) => (
              <article key={theme.number}>
                <span>{theme.number}</span>
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="askHelpFitSection">
        <div className="container askHelpFitGrid">
          <figure>
            <Image
              src="/images/focused-learning-duo.jpg"
              alt="Two people learning and working side by side"
              width={1500}
              height={844}
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </figure>
          <div>
            <span className="askHelpEyebrow">This book may be for you if</span>
            <h2>You know support would help, but asking still feels difficult.</h2>
            <ul>
              {readerFit.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="askHelpAuthorSection">
        <div className="container askHelpAuthorGrid">
          <figure>
            <Image
              src="/images/founder/eniola-aderounmu-align-founder.png"
              alt="Eniola Aderounmu, founder of Align Mindset Initiative"
              width={1123}
              height={1401}
              sizes="(max-width: 760px) 70vw, 330px"
            />
          </figure>
          <div>
            <span className="askHelpEyebrow">About the author</span>
            <h2>Eniola Aderounmu</h2>
            <p>
              Eniola is the founder of Align Mindset Initiative. His work helps
              people develop useful skills, create value, and build practical
              systems for personal growth.
            </p>
            <Link className="askHelpTextLink" href="/about">
              Read the Align Mindset story
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="askHelpFinalCta">
        <div className="container askHelpFinalGrid">
          <div>
            <MessageCircleQuestion size={32} aria-hidden="true" />
            <span>Preorder Ask for Help</span>
            <h2>Stop carrying every question by yourself.</h2>
            <p>
              Reserve the digital first edition today. We will use your checkout
              email for your receipt and release updates.
            </p>
          </div>
          <div className="askHelpFinalAction">
            <div className="askHelpFinalPrice">
              <s>{formatNaira(askForHelpPreorder.regularPrice)}</s>
              <strong>{formatNaira(askForHelpPreorder.price)}</strong>
              <span>Save {formatNaira(preorderSaving)} when you preorder</span>
            </div>
            <AskForHelpPreorderModal
              paymentReady={paymentReady}
              buttonLabel="Preorder now"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
