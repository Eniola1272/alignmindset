import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MessageCircle
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedArticles } from "@/lib/articles";
import { pillars, programs, site } from "@/lib/site";

const journeyCards = [
  {
    title: "Find your direction",
    copy: "Clarify who you are becoming and choose the next step that matters.",
    image: "/images/community-goals-session.jpg",
    href: "/start-here"
  },
  {
    title: "Build your system",
    copy: "Turn good intentions into practical rhythms you can actually keep.",
    image: "/images/starter-kit-planning.jpg",
    href: "/resources"
  },
  {
    title: "Join the sessions",
    copy: "Learn and execute with a community that meets live every Wednesday.",
    image: "/images/workshop-live-session.jpg",
    href: "/workshops"
  }
];

const valueHighlights = [
  {
    title: "Clear direction",
    copy: "Name the goal, the identity behind it, and the next useful move."
  },
  {
    title: "Practical discipline",
    copy: "Build weekly systems that keep working after motivation fades."
  },
  {
    title: "Community support",
    copy: "Learn, report progress, and keep moving with people who care."
  }
];

const rhythmItems = [
  {
    cadence: "Monday",
    title: "Mindset note",
    copy: "A short prompt to bring focus and intention into the week."
  },
  {
    cadence: "Wednesday",
    title: "Live session",
    copy: "Practical teaching, honest questions, and one clear action to take."
  },
  {
    cadence: "Friday",
    title: "Reflection and resource",
    copy: "A useful tool or idea that helps the week's lesson become practice."
  },
  {
    cadence: "Monthly",
    title: "Progress challenge",
    copy: "A shared accountability moment to review, reset, and keep building."
  }
];

const questions = [
  {
    question: "What is Align Mindset?",
    answer:
      "Align Mindset is a learning community that helps people build discipline, skills, purpose, and value through practical content, workshops, and accountability."
  },
  {
    question: "Who is it for?",
    answer:
      "Students, early-career builders, creators, volunteers, and anyone who wants to stop drifting and start building a more useful life."
  },
  {
    question: "Where are the live sessions?",
    answer:
      "Our live community sessions take place every Wednesday in the Align Mindset WhatsApp community. Workshop details are shared on the site and in the group."
  },
  {
    question: "What should I do first?",
    answer:
      "Visit Start Here, choose one resource that fits where you are, and join a Wednesday session when you are ready."
  }
];

const programImages = [
  "/images/collaborative-growth-workshop.jpg",
  "/images/starter-kit-planning.jpg",
  "/images/workshop-live-session.jpg",
  "/images/focused-learning-duo.jpg"
];

const articleImages = [
  "/images/starter-kit-planning.jpg",
  "/images/focused-learning-duo.jpg",
  "/images/collaborative-growth-workshop.jpg"
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
    role: "Early-career builder",
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
    <div className="homePage">
      <section className="hero" aria-labelledby="home-hero-title">
        <img
          className="heroBackdrop"
          src="/images/community-reading-session.jpg"
          alt="A small group reading and learning together"
        />
        <div className="heroShade" aria-hidden="true" />
        <div className="shell heroInner">
          <div className="heroCopy">
            <span className="heroEyebrow">Align Mindset Initiative</span>
            <h1 id="home-hero-title">
              Align your mindset.
              <span>Build your future.</span>
            </h1>
            <p>
              Practical learning, community, and accountability for people who
              want to build discipline, develop useful skills, and create value.
            </p>
            <div className="heroActions">
              <Link className="primaryButton" href="/start-here">
                Start your journey
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="heroTextLink" href="#about">
                Explore what we do
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <p className="heroFootnote">
            For students, creators, founders, and purposeful builders.
          </p>
        </div>
      </section>

      <section className="sectionPad journeySection" id="start">
        <div className="shell">
          <SectionHeading
            eyebrow="Start your journey"
            title="Choose the next move that fits where you are."
            copy="You do not need to have everything figured out. Begin with one useful step and build from there."
          />
          <div className="journeyGrid">
            {journeyCards.map((card, index) => (
              <Link className="journeyCard" href={card.href} key={card.title}>
                <img src={card.image} alt="" />
                <div>
                  <span>0{index + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionPad valueSection" id="about">
        <div className="shell valueGrid">
          <div className="valueCopy">
            <SectionHeading
              eyebrow="Why Align Mindset"
              title="Your life needs more than motivation."
              copy="Motivation can begin the work, but direction, discipline, and support are what keep it alive. Align helps you build all three in a way that is practical and human."
            />
            <div className="valueList">
              {valueHighlights.map(({ title, copy }, index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
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
              src="/images/focused-learning-duo.jpg"
              alt="Two young professionals reading and working side by side"
            />
            <figcaption>Turn intention into weekly proof.</figcaption>
          </figure>
        </div>
      </section>

      <section className="wideImageBand" aria-labelledby="accountability-title">
        <img
          src="/images/workshop-live-session.jpg"
          alt="A facilitator leading a small learning session"
        />
        <div className="wideImageShade" aria-hidden="true" />
        <div className="shell wideImageContent">
          <div>
            <span>Wednesday live sessions</span>
            <h2 id="accountability-title">
              Where direction meets accountability.
            </h2>
            <Link className="primaryButton" href="/workshops">
              Attend the next session
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className="imageBandNote">
            Learn something useful. Ask better questions. Leave with one clear
            action for the week ahead.
          </p>
        </div>
      </section>

      <section className="sectionPad programBentoSection" id="programs">
        <div className="shell programBentoHeader">
          <SectionHeading
            eyebrow="Featured programs"
            title="Practical growth spaces for people ready to execute."
            copy="Every program is designed to move you from insight to action, with useful tools and a community that keeps the work grounded."
          />
          <Link className="editorialLink" href="/workshops">
            Explore all programs
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="shell programBentoGrid">
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
        </div>
      </section>

      <section className="frameworkSection" id="framework">
        <div className="shell frameworkLayout">
          <div className="frameworkIntro">
            <span>The Align framework</span>
            <h2>Growth that moves from identity to impact.</h2>
            <p>
              Six connected stages shape our articles, workshops, community
              challenges, and future learning experiences.
            </p>
            <Link className="editorialLink" href="/start-here">
              Explore the framework
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="pillarGrid">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className="pillarCard">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionPad rhythmSection" id="rhythm">
        <div className="shell rhythmGrid">
          <figure className="rhythmImage">
            <img
              src="/images/collaborative-growth-workshop.jpg"
              alt="Young professionals sharing ideas in a group workshop"
            />
            <figcaption>Small rhythms. Useful work. Shared progress.</figcaption>
          </figure>
          <div className="rhythmCopy">
            <SectionHeading
              eyebrow="How it works"
              title="A simple weekly structure that keeps the movement alive."
              copy="No constant noise and no pressure to perform. Just a dependable rhythm for learning, reflecting, and doing the work."
            />
            <div className="rhythmList">
              {rhythmItems.map((item, index) => (
                <article key={item.cadence}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <small>{item.cadence}</small>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link
              className="editorialLink"
              href={site.communityUrl}
              target="_blank"
              rel="noreferrer"
            >
              Join Wednesday&apos;s session
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="sectionPad faqSection">
        <div className="shell faqGrid">
          <article className="faqIntro">
            <span>Common questions</span>
            <h2>A clear place to begin.</h2>
            <p>
              Align is built to make growth feel practical, not overwhelming.
              Here are the questions most people ask before joining us.
            </p>
            <img
              src="/images/starter-kit-planning.jpg"
              alt="Open planning journal and tools"
            />
          </article>
          <div className="faqList">
            {questions.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  <span>{item.question}</span>
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
            eyebrow="Latest articles"
            title="Read useful ideas for purposeful growth."
            copy="Thoughtful essays and practical guides for turning what you know into how you live and what you build."
          />
          <Link className="editorialLink" href="/blog">
            View all articles
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="shell articleGrid">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard
              key={article.id}
              article={{
                ...article,
                featuredImageUrl:
                  article.featuredImageUrl ||
                  articleImages[index % articleImages.length]
              }}
            />
          ))}
        </div>
      </section>

      <section
        className="testimonialSection"
        aria-labelledby="testimonial-title"
      >
        <div className="shell testimonialHeader">
          <div>
            <span>Community voices</span>
            <h2 id="testimonial-title">
              Progress feels different when it is shared.
            </h2>
          </div>
          <p>
            Honest reflections from people learning to replace drift with
            direction and ideas with action.
          </p>
        </div>
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
                <span className="quoteMark" aria-hidden="true">
                  “
                </span>
                <p>{item.quote}</p>
                <div>
                  <span>{item.name.charAt(0)}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="joinSection" id="join" aria-labelledby="join-title">
        <img src="/images/workshop-live-session.jpg" alt="" />
        <div className="joinShade" aria-hidden="true" />
        <div className="shell joinGrid">
          <div className="joinCopy">
            <div className="joinIcon">
              <MessageCircle size={24} aria-hidden="true" />
            </div>
            <h2 id="join-title">Build with us.</h2>
            <p>
              Align is built with people who want to learn, grow, serve, and
              contribute. Bring your questions, your skills, and your next step.
            </p>
            <div className="joinActions">
              <Link
                className="primaryButton"
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
              >
                Join the community
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="joinTextLink" href="/volunteer">
                Volunteer with us
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <NewsletterForm
            className="joinNewsletterForm"
            label="Get practical notes from Align"
          />
        </div>
      </section>
    </div>
  );
}
