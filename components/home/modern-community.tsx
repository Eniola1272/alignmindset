import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, MessageCircle, Sparkles, Users } from "lucide-react";
import { site } from "@/lib/site";

export function ModernCommunity() {
  const rhythmSteps = [
    { day: "Mon", title: "Focus Lock", desc: "Declare one primary objective for the week." },
    { day: "Wed", title: "Execution Lab", desc: "Live workshop to debug bottlenecks." },
    { day: "Fri", title: "Evidence Drop", desc: "Submit proof of work: code, draft, or demo." },
    { day: "Sun", title: "System Audit", desc: "15-minute review to reset routines." }
  ];

  const proofQuotes = [
    {
      quote:
        "Having to post a deployed URL every Friday completely eliminated my habit of rewriting tutorial code. You simply cannot fake shipped work.",
      author: "David O.",
      role: "Frontend Engineer",
      track: "90-Day Build Track"
    },
    {
      quote:
        "The emergency minimum rule saved my momentum. When client emergencies blew up my week, I still protected 15 minutes instead of abandoning the goal.",
      author: "Sarah M.",
      role: "Product Designer",
      track: "Design Systems Cohort"
    }
  ];

  return (
    <section className="modSection modCommunitySection" id="community" aria-labelledby="community-heading">
      <div className="shell">
        <div className="modernCommunityGrid">
          {/* Left Column: Visual & Social Proof Frame */}
          <div className="communityVisualCol">
            <div className="communityImageFrame">
              <Image
                src="/images/collaborative-growth-workshop.jpg"
                alt="Align Mindset members engaged in an interactive workshop"
                width={640}
                height={520}
                className="communityImg"
                priority={false}
              />
              <div className="imageFloatingBadge">
                <Users size={15} aria-hidden="true" />
                <span>Peer Accountability Cohorts</span>
              </div>
            </div>

            {/* Testimonials Stack */}
            <div className="communityProofQuotes">
              {proofQuotes.map((q, idx) => (
                <div key={idx} className="proofQuoteCard">
                  <p className="proofQuoteText">&ldquo;{q.quote}&rdquo;</p>
                  <div className="proofQuoteAuthor">
                    <div className="authorAvatar" aria-hidden="true">
                      {q.author[0]}
                    </div>
                    <div className="authorMeta">
                      <strong className="authorName">{q.author}</strong>
                      <span className="authorRole">{q.role} • {q.track}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Copy & Weekly Rhythm */}
          <div className="communityCopyCol">
            <div className="modSectionBadge">
              <Users size={14} aria-hidden="true" />
              <span>The Execution Circle</span>
            </div>

            <h2 id="community-heading" className="modCommunityTitle">
              Growth accelerates in rooms where people expect you to do the work.
            </h2>

            <p className="modCommunityLead">
              Mediocrity thrives in isolation where no one notices when you quietly drift. Align
              Mindset brings together ambitious builders, engineers, and creators who hold each other
              to weekly standards of verifiable execution.
            </p>

            {/* 4-Day Rhythm Track */}
            <div className="weeklyRhythmBox">
              <div className="rhythmHeader">
                <Calendar size={15} aria-hidden="true" />
                <span className="rhythmTitle">The 4-Day Execution Rhythm</span>
              </div>

              <div className="rhythmGrid">
                {rhythmSteps.map((step) => (
                  <div key={step.day} className="rhythmStepCard">
                    <span className="stepDayBadge">{step.day}</span>
                    <strong className="stepTitle">{step.title}</strong>
                    <p className="stepDesc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="communityActions">
              <a
                href={site.communityUrl}
                target="_blank"
                rel="noreferrer"
                className="modPrimaryBtn"
              >
                <MessageCircle size={16} aria-hidden="true" />
                <span>Join the WhatsApp Circle</span>
              </a>

              <Link href="/workshops" className="modSecondaryBtn">
                <span>View Live Cohorts</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

