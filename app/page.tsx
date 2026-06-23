import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Target,
  UsersRound
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedArticles } from "@/lib/articles";
import { communityRhythm, pillars, programs } from "@/lib/site";

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
        <div className="shell heroInner">
          <div className="heroBadge">
            <Sparkles size={18} aria-hidden="true" />
            Purposeful growth, made practical
          </div>
          <h1>
            Helping you achieve your goals and dreams
            
          </h1>
          <p>
            Align Mindset Initiative is a community and learning platform for
            identity, systems, skills, disciplined action, and long-term value.
          </p>
          <div className="heroActions">
            <Link className="primaryButton" href="#join">
              Join the movement
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="secondaryButton" href="/blog">
              Read the blog
            </Link>
          </div>
          <div className="heroBoard" aria-label="Align Mindset framework">
            <div>
              <Target size={22} aria-hidden="true" />
              <strong>Identity</strong>
              <span>Know who you are becoming</span>
            </div>
            <div>
              <CalendarDays size={22} aria-hidden="true" />
              <strong>Systems</strong>
              <span>Build repeatable rhythms</span>
            </div>
            <div>
              <BookOpen size={22} aria-hidden="true" />
              <strong>Skills</strong>
              <span>Create useful proof</span>
            </div>
            <div>
              <UsersRound size={22} aria-hidden="true" />
              <strong>Community</strong>
              <span>Grow with accountability</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proofBand">
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

      <section className="sectionPad" id="programs">
        <div className="shell splitHeader">
          <SectionHeading
            eyebrow="Featured programs"
            title="Practical growth spaces for people ready to execute."
            copy="Start with identity, build systems, learn useful skills, and turn learning into assets that create value."
          />
          <Link className="textLink" href="#join">
            Request a program
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="shell programGrid">
          {programs.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </div>
      </section>

      <section className="frameworkSection" id="framework">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="The framework"
            title="Identity → Systems → Skills → Action → Assets → Leverage"
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
          <div>
            <SectionHeading
              eyebrow="Community rhythm"
              title="A simple weekly structure that keeps the movement alive."
              copy="The goal is not noise. The goal is a consistent active core that learns, discusses, executes, and reports progress."
            />
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

      <section className="joinSection" id="join">
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
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
