import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  MessageSquare,
  GraduationCap,
  Users2,
  ArrowRight,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles
} from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & Philosophy — Align Mindset Initiative",
  description:
    "Our vision, mission, and the 4 execution pillars helping young adults transform their mindset and cultivate a lifestyle aligned with their goals."
};

const pillars = [
  {
    number: "01",
    tag: "PILLAR 01 / INTELLECTUAL FOUNDATION",
    title: "Reading Goals & Plans",
    quote: "Share bi-weekly book recommendations and reading goals to keep members on track.",
    explanation:
      "We curate high-utility books on mindset, discipline, skill development, value creation, and mental models. Every two weeks, members receive actionable reading milestones so ideas are deeply digested and tested in daily life—never left on a shelf.",
    icon: BookOpen
  },
  {
    number: "02",
    tag: "PILLAR 02 / CRITICAL REFLECTION",
    title: "Interactive Discussions",
    quote: "Host regular discussions where members share insights, key takeaways, and applications from the readings.",
    explanation:
      "Information without dialogue easily fades into passive consumption. Our members meet to dissect key principles, debate perspectives, unpack personal struggles, and formulate concrete commitments they can apply in the week ahead.",
    icon: MessageSquare
  },
  {
    number: "03",
    tag: "PILLAR 03 / PRACTICAL MASTERY",
    title: "Expert Sessions + Trainings",
    quote: "Invite authors & subject-matter experts for virtual Q&A sessions. Skill acquisition training as well.",
    explanation:
      "We bring authors, builders, operators, and domain specialists straight to our community for honest, unfiltered Q&As. We pair this with practical training sessions that equip members with real-world skills that increase their capability and value.",
    icon: GraduationCap
  },
  {
    number: "04",
    tag: "PILLAR 04 / ENVIRONMENT & ACCOUNTABILITY",
    title: "Community",
    quote: "Help each other along the journey and grow together.",
    explanation:
      "It is nearly impossible to sustain personal discipline in an environment that rewards drifting. Align Mindset brings together ambitious, thoughtful young adults who hold each other to high standards, celebrate honest progress, and support each other through setbacks.",
    icon: Users2
  }
];

export default function AboutPage() {
  return (
    <div className="editorialLandingPage about-page-wrapper">
      {/* 1. Hero Section */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="container about-hero-grid">
          <div className="about-hero-content">
            <span className="eyebrow">ABOUT ALIGN MINDSET INITIATIVE</span>
            <h1 id="about-hero-title">
              Bridging the gap between <em>wishing for change</em> and building it.
            </h1>
            <p className="about-lead">
              Most young adults don&apos;t fail from a lack of ambition. They struggle
              because their identity, weekly systems, and everyday environment aren&apos;t
              built to sustain what they want. Align Mindset was created to give growth a
              grounded foundation.
            </p>

            <div className="about-hero-actions">
              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-yellow"
              >
                <span>Join our WhatsApp Community</span>
                <span className="arrow">↗</span>
              </a>
              <a href="#mission" className="btn btn-outline">
                <span>Explore the 4 Pillars</span>
                <span className="arrow">↓</span>
              </a>
            </div>

            <div className="about-stamp-note">
              <span className="line" />
              <span>Identity • Daily Systems • High-Leverage Skills • Community Accountability</span>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-photo-frame">
              <Image
                src="/images/community-reading-session.jpg"
                alt="Young adults engaging in deep conversation and study during an Align Mindset session"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="about-hero-img"
              />
              <div className="about-photo-badge">
                <span className="badge-kicker">COMMUNITY IN ACTION</span>
                <strong>Real growth in good company</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision Section */}
      <section className="about-vision-section" id="vision" aria-labelledby="vision-title">
        <div className="container">
          <div className="vision-header-row">
            <span className="eyebrow">OUR VISION</span>
            <span className="vision-kicker-meta">WHERE WE ARE HEADED</span>
          </div>

          <div className="vision-statement-box">
            <h2 id="vision-title" className="vision-quote">
              &ldquo;To help young adults get closer to their goals by aiding
              mental transformation and cultivating a lifestyle that aligns with
              their goals.&rdquo;
            </h2>
          </div>

          <div className="vision-breakdown-grid">
            <div className="vision-breakdown-card">
              <div className="vision-breakdown-icon">
                <Sparkles size={22} aria-hidden="true" />
              </div>
              <h3>Mental Transformation First</h3>
              <p>
                Goals without a changed identity create endless resistance.
                Before building habits or routines, we help you dismantle
                self-limiting scripts, redefine who you are becoming, and anchor
                your ambition in purpose rather than temporary excitement.
              </p>
            </div>

            <div className="vision-breakdown-card">
              <div className="vision-breakdown-icon">
                <Compass size={22} aria-hidden="true" />
              </div>
              <h3>A Lifestyle of Alignment</h3>
              <p>
                Progress is not an event—it is the direct output of how you
                spend ordinary Tuesdays and Thursdays. We help you design
                environments, routines, and systems where consistent execution
                feels natural instead of exhausting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & The 4 Pillars */}
      <section className="about-mission-section" id="mission" aria-labelledby="mission-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR MISSION</span>
              <h2 id="mission-title" className="section-title" style={{ marginTop: "21px" }}>
                Four pillars designed for<br />
                <em>execution, not motivation.</em>
              </h2>
            </div>
            <div className="copy">
              <p>
                We do not sell generic motivational speeches or empty self-help
                promises. Everything we do is structured around four concrete
                mechanisms that turn good intentions into tangible results.
              </p>
            </div>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article className="pillar-card" key={pillar.number}>
                  <div className="pillar-top">
                    <div className="pillar-header-wrap">
                      <span className="pillar-number">{pillar.number}</span>
                      <span className="pillar-tag">{pillar.tag}</span>
                    </div>
                    <div className="pillar-icon-badge">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="pillar-body">
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <blockquote className="pillar-raw-quote">
                      &ldquo;{pillar.quote}&rdquo;
                    </blockquote>
                    <p className="pillar-desc">{pillar.explanation}</p>
                  </div>

                  <div className="pillar-footer">
                    <span className="pillar-status-bullet" />
                    <span>Active in WhatsApp Community</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WhatsApp Community Hub Callout */}
      <section className="about-whatsapp-hub" aria-labelledby="hub-title">
        <div className="container">
          <div className="whatsapp-hub-card">
            <div className="whatsapp-hub-content">
              <span className="eyebrow on-dark">THE HEART OF OUR WORK</span>
              <h2 id="hub-title" className="hub-heading">
                Where the conversations and Wednesday workshops <em>actually happen.</em>
              </h2>
              <p className="hub-body">
                We believe learning shouldn&apos;t live in isolation behind paid paywalls.
                Our book circles, live discussions, author Q&amp;As, and Wednesday
                interactive workshops happen directly inside our WhatsApp community.
              </p>

              <div className="hub-perks">
                <div className="perk-item">
                  <CheckCircle2 size={18} className="perk-icon" />
                  <span>Bi-weekly curated book plans &amp; guides</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={18} className="perk-icon" />
                  <span>Live Wednesday workshops (no registration required)</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={18} className="perk-icon" />
                  <span>Author &amp; expert guest Q&amp;A sessions</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={18} className="perk-icon" />
                  <span>Honest peer accountability and discussion</span>
                </div>
              </div>

              <div className="hub-cta-row">
                <a
                  href={site.communityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-yellow"
                >
                  <span>Join the WhatsApp Community</span>
                  <span className="arrow">↗</span>
                </a>
                <span className="hub-note">Free community • Open to all ambitious young adults</span>
              </div>
            </div>

            <div className="whatsapp-hub-visual">
              <div className="hub-calendar-card">
                <div className="calendar-header">
                  <Calendar size={18} aria-hidden="true" />
                  <span>WEEKLY RHYTHM</span>
                </div>
                <div className="calendar-body">
                  <div className="calendar-row">
                    <strong>Mondays</strong>
                    <span>Bi-weekly reading goals &amp; reflection prompts</span>
                  </div>
                  <div className="calendar-row highlight">
                    <strong>Wednesdays</strong>
                    <span>Live Community Workshop &amp; Execution Lab</span>
                  </div>
                  <div className="calendar-row">
                    <strong>Fridays</strong>
                    <span>Peer wins, progress check-ins &amp; weekly reviews</span>
                  </div>
                </div>
                <div className="calendar-footer">
                  <span>Direct WhatsApp group access</span>
                  <span className="dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Next Steps Section */}
      <section className="about-next-steps" aria-labelledby="next-title">
        <div className="container">
          <div className="next-steps-intro">
            <span className="eyebrow">CONTINUE YOUR JOURNEY</span>
            <h2 id="next-title" className="section-title" style={{ marginTop: "18px" }}>
              Take your next <em>deliberate step.</em>
            </h2>
          </div>

          <div className="next-cards-grid">
            <div className="next-card">
              <span className="next-card-kicker">PERSONALIZED PROGRESS</span>
              <h3>Find Your Starting Point</h3>
              <p>
                Clarify where you are stuck, identify your priority, and generate a
                realistic 90-day progress plan connecting your identity to daily actions.
              </p>
              <Link href="/progress-builder?start=true" className="btn btn-dark">
                <span>Start 90-Day Plan Builder</span>
                <span className="arrow">↗</span>
              </Link>
            </div>

            <div className="next-card">
              <span className="next-card-kicker">FOUNDATIONAL CURRICULUM</span>
              <h3>Explore Our Books</h3>
              <p>
                Deepen your learning with our 4-book curriculum covering discipline,
                value creation, operational systems, and long-term personal leverage.
              </p>
              <Link href="/books" className="btn btn-outline">
                <span>View Book Bundle</span>
                <span className="arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

