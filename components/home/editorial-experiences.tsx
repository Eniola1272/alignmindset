import Image from "next/image";
import { site } from "@/lib/site";

export function EditorialExperiences() {
  return (
    <section className="experiences" id="community" aria-labelledby="experiences-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOU DON&apos;T HAVE TO GO ALONE</span>
            <h2 id="experiences-title" className="section-title" style={{ marginTop: "21px" }}>
              Real growth.<br />
              <em>In good company.</em>
            </h2>
          </div>
          <div className="copy">
            <p>
              Learning changes more when you apply it—and when you&apos;re surrounded by people who are trying, too.
            </p>
          </div>
        </div>

        <div className="experience-gallery">
          {/* Main Hero Card */}
          <div className="experience-hero">
            <Image
              src="/images/collaborative-growth-workshop.jpg"
              alt="People gathering for a community conversation and learning together"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="experience-img"
              loading="lazy"
            />
            <div className="experience-text">
              <small>01 / LEARN TOGETHER</small>
              <h3>
                Conversations that<br />
                move you forward.
              </h3>
              <p>
                Reflective live sessions, practical discussions, and new perspectives worth putting into practice.
              </p>
            </div>
          </div>

          {/* Stack of 2 smaller cards */}
          <div className="exp-stack">
            <div className="experience-small">
              <Image
                src="/images/community-reading-session.jpg"
                alt="Friends gathered together in deep discussion"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="experience-img"
                loading="lazy"
              />
              <div className="experience-text">
                <small>02 / GROW WITH OTHERS</small>
                <h3>Find your people.</h3>
                <p>Connect with others who want more than good intentions.</p>
              </div>
            </div>

            <div className="experience-small">
              <Image
                src="/images/workshop-live-session.jpg"
                alt="Hands-on workshop session turning ideas into practice"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="experience-img"
                loading="lazy"
              />
              <div className="experience-text">
                <small>03 / WEDNESDAY WORKSHOPS</small>
                <h3>Live on WhatsApp.</h3>
                <p>Interactive weekly sessions hosted directly in our WhatsApp community.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="experiences-note">
          <p>
            Wednesday workshops happen live inside our WhatsApp community—no registration forms or tickets needed. Join the group to receive live links, discussion prompts, and weekly tools.
          </p>
          <a className="text-link" href={site.communityUrl} target="_blank" rel="noreferrer">
            <span>Join Wednesday workshops on WhatsApp</span>
            <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

