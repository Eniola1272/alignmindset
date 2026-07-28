import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  Flame,
  Handshake,
  MessageCircle,
  PenLine,
  PlayCircle,
  Target
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedArticles } from "@/lib/articles";
import { communityRhythm, pillars, programs } from "@/lib/site";

const journeyCards = [
  {
    title: "Find your direction",
    copy: "Start with identity, values, and the kind of future you are building.",
    image: "/images/community-goals-session.jpg"
  },
  {
    title: "Build your system",
    copy: "Use simple rhythms for discipline, learning, planning, and execution.",
    image: "/images/starter-kit-planning.jpg"
  },
  {
    title: "Join live sessions",
    copy: "Wednesday sessions help you turn ideas into action with other builders.",
    image: "/images/workshop-live-session.jpg"
  }
];

const valueHighlights = [
  {
    icon: Target,
    title: "Clear direction",
    copy: "We help you name the goal, the identity behind it, and the next useful move."
  },
  {
    icon: Flame,
    title: "Practical discipline",
    copy: "You get weekly structure that turns motivation into repeatable behavior."
  },
  {
    icon: Handshake,
    title: "Community support",
    copy: "You do not have to build alone. Learn, report progress, and get encouraged."
  }
];

const questions = [
  {
    question: "What is Align Mindset?",
    answer:
      "A learning community that helps people build discipline, skills, purpose, and value through practical content, workshops, and accountability."
  },
  {
    question: "Who is it for?",
    answer:
      "Students, early career builders, creators, volunteers, and anyone who wants to stop drifting and start building a more useful life."
  },
  {
    question: "When are the live sessions?",
    answer:
      "Live community sessions happen every Wednesday, with practical prompts and follow-up actions."
  },
  {
    question: "What should I do first?",
    answer:
      "Start with the newsletter, read the starter essays, then join a Wednesday session when you are ready."
  }
];

const programImages = [
  "/images/starter-kit-planning.jpg",
  "/images/community-goals-session.jpg",
  "/images/workshop-live-session.jpg",
  "/images/starter-kit-planning.jpg"
];

const testimonials = [
  {
    name: "Aisha",
    role: "Student",
    quote:
      "The weekly prompts helped me stop waiting for perfect motivation and start keeping promises to myself."
  },
  {
    name: "Daniel",
    role: "Early career builder",
    quote:
      "The identity and systems framework made my goals feel practical instead of intimidating."
  },
  {
    name: "Mariam",
    role: "Community member",
    quote:
      "I like that the lessons always end with something to do. It feels useful, not just inspiring."
  }
];

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <>
      <section className="hero">
        <img
          className="heroBackdrop"
          src="/images/community-goals-session.jpg"
          alt=""
        />
        <div className="heroShade" aria-hidden="true" />
        <div className="shell heroInner">
          <div className="heroCopy">
            <h1>Align your mindset. Build your future.</h1>
            <p>
              A clean, practical community for people who want discipline,
              skills, purpose, and the courage to create value before capital.
            </p>
            <div className="heroActions">
              <Link className="primaryButton" href="#join">
                Join the movement
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="secondaryButton glassButton" href="/start-here">
                Start here
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sectionPad journeySection" id="start">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Start your journey"
            title="Choose the next move that fits where you are."
            copy="No pressure to have everything figured out. Start with one useful step, then keep moving with the community."
          />
          <div className="journeyGrid">
            {journeyCards.map((card) => (
              <article className="journeyCard" key={card.title}>
                <img src={card.image} alt="" />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionPad valueSection">
        <div className="shell valueGrid">
          <div>
            <SectionHeading
              eyebrow="For disciplined dreamers"
              title="Your life needs more than motivation."
              copy="Align Mindset helps you move from wishful thinking to structured growth. We teach identity, systems, skill-building, execution, and value creation in a way that feels human."
            />
            <div className="valueList">
              {valueHighlights.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <span>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <figure className="valueImage">
            <img
              src="/images/starter-kit-planning.jpg"
              alt="Planning worksheets for goals and personal growth"
            />
            <figcaption>
              <PenLine size={16} aria-hidden="true" />
              Turn goals into weekly proof
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="wideImageBand">
        <img src="/images/workshop-live-session.jpg" alt="" />
        <div className="wideImageShade" aria-hidden="true" />
        <div className="shell wideImageContent">
          <div>
            <span className="wednesdaylive">Wednesday live sessions</span>
            <h2>Where direction meets accountability.</h2>
            <Link className="primaryButton lightButton" href="/workshops">
              See workshops
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <aside className="sessionGlassCard">
            <PlayCircle size={34} aria-hidden="true" />
            <div>
              <strong>Attend the next session</strong>
              <p>Learn, reflect, ask better questions, and leave with action.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="sectionPad programBentoSection" id="programs">
        <div className="shell programBentoGrid">
          <div className="programBentoIntro">
            <span>Featured programs</span>
            <h2>Practical growth spaces for people ready to execute.</h2>
            <p>
              Start with identity, build systems, learn useful skills, and turn
              learning into assets that create value.
            </p>
          </div>
          {programs.map((program, index) => (
            <article
              key={program.title}
              className={`programBentoCard programBentoCard-${index + 1}`}
            >
              <img src={programImages[index]} alt="" />
              <div>
                <span>{program.eyebrow}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            </article>
          ))}
          <Link className="programBentoCta" href="/workshops">
            Explore all programs
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="frameworkSection" id="framework">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="The framework"
            title="Identity, systems, skills, action, assets, leverage."
            copy="This is the backbone for the community, articles, workshops, volunteer training, and future courses."
          />
          <div className="pillarGrid">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className="pillarCard">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionPad" id="rhythm">
        <div className="shell rhythmGrid">
          <div className="rhythmCopy">
            <SectionHeading
              eyebrow="Community rhythm"
              title="A simple weekly structure that keeps the movement alive."
              copy="The goal is not noise. The goal is a consistent active core that learns, discusses, executes, and reports progress."
            />
            <figure className="circleImageFrame rhythmImage">
              <img
                src="/images/workshop-live-session.jpg"
                alt="A live learning session with a facilitator and attendees"
              />
            </figure>
          </div>
          <div className="rhythmList">
            {communityRhythm.map((item) => (
              <div key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionPad faqSection">
        <div className="shell faqGrid">
          <article className="faqHelpCard">
            <img src="/images/community-goals-session.jpg" alt="" />
            <div>
              <h2>Need clarity? Start with one small step.</h2>
              <Link className="secondaryButton glassButton" href="/start-here">
                Start here
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
          <div className="faqList">
            {questions.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  {item.question}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionPad blogPreview">
        <div className="shell splitHeader">
          <SectionHeading
            eyebrow="Popular content"
            title="Read useful articles for purposeful growth."
            copy="Clean essays and guides for people who want more than motivation."
          />
          <Link className="roundIconLink" href="/blog" aria-label="Open blog">
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <div className="shell articleGrid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="proofBand lowerProof">
        <div
          className="proofCarousel"
          aria-label="Community member testimonials"
        >
          <div className="proofTrack">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="testimonialCard"
                aria-hidden={index >= testimonials.length}
              >
                <div>
                  <span>{item.name.charAt(0)}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </div>
                </div>
                <p>{item.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="joinSection" id="join">
        <img src="/images/community-goals-session.jpg" alt="" />
        <div className="joinShade" aria-hidden="true" />
        <div className="shell joinGrid">
          <div>
            <div className="joinIcon">
              <MessageCircle size={26} aria-hidden="true" />
            </div>
            <h2>Build with us.</h2>
            <p>
              Join updates for workshops, reading prompts, skill sessions,
              practical challenges, and new articles from Align Mindset
              Initiative.
            </p>
            <Link className="downloadLink" href="/resources">
              <Download size={16} aria-hidden="true" />
              Get the free starter resources
            </Link>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
