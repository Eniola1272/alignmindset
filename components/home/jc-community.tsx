import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function JcCommunity() {
  return (
    <section className="jcCommunitySection" id="community" aria-labelledby="jc-community-heading">
      <div className="shell jcNarrowShell">
        <div className="jcCommunityCard">
          <div className="jcCommunityGrid">
            <div className="jcCommunityImageCol">
              <div className="jcCommunityImageWrap">
                <Image
                  src="/images/collaborative-growth-workshop.jpg"
                  alt="Align Mindset members engaged in an interactive workshop"
                  width={520}
                  height={400}
                  className="jcCommunityImg"
                />
              </div>
            </div>

            <div className="jcCommunityCopyCol">
              <span className="jcEyebrow">The Execution Circle</span>
              <h2 id="jc-community-heading" className="jcCommunityTitle">
                Growth accelerates in rooms where people expect you to do the work.
              </h2>
              <p className="jcCommunityLead">
                Mediocrity thrives in isolation where no one notices when you quietly drift. Align
                Mindset brings together driven builders, engineers, and creators who hold each
                other to weekly standards of execution.
              </p>

              <div className="jcRhythmSummary">
                <div className="jcRhythmItem">
                  <strong>Wednesday</strong>
                  <span>Live Execution Lab</span>
                </div>
                <div className="jcRhythmItem">
                  <strong>Friday</strong>
                  <span>Proof of Work Drop</span>
                </div>
              </div>

              <div className="jcCommunityActions">
                <a
                  href={site.communityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="jcPrimaryBtn"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>Join the WhatsApp Circle</span>
                </a>

                <Link href="/workshops" className="jcSecondaryBtn">
                  <span>View Workshops</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

