import { Sparkles, User } from "lucide-react";

type Story = {
  name: string;
  role: string;
  context: string;
  shift: string;
  tangibleProof: string;
};

const STORIES: Story[] = [
  {
    name: "Daniel O.",
    role: "Early-Career Developer",
    context:
      "Trapped in 8 months of tutorial paralysis — consuming endless video lectures without ever deploying a project or writing original code from scratch.",
    shift:
      "Adopted the 90-day milestone framework and locked in a 60-minute protected morning focus window before starting his workday.",
    tangibleProof:
      "Shipped two full-stack applications with authenticated databases and published documented case studies on GitHub."
  },
  {
    name: "Aisha M.",
    role: "University Student",
    context:
      "Constantly waited for mood and inspiration to strike, resulting in erratic study sessions, frantic cramming, and weeks of unacknowledged drift.",
    shift:
      "Implemented the 15-minute emergency minimum rule and instituted a non-negotiable Sunday evening reflection audit.",
    tangibleProof:
      "Maintained a 42-day unbroken study habit and finished her foundational data analysis curriculum with completed project files."
  },
  {
    name: "Mariam T.",
    role: "Community Member",
    context:
      "Built in complete isolation without external accountability, allowing self-doubt and quiet procrastination to delay her launch for months.",
    shift:
      "Began attending Wednesday live cohort labs and committed to publicly logging Friday evidence of work completed.",
    tangibleProof:
      "Synthesized her scattered notes into a published resource guide and received her first paid client inquiry."
  },
  {
    name: "Fisayo L.",
    role: "Product Designer",
    context:
      "Kept dozens of unfinished design explorations private on Figma, waiting for them to feel 'perfect' before showing anyone.",
    shift:
      "Applied the 'From Learning to Assets' framework, choosing to package practice drills into public, documented case studies.",
    tangibleProof:
      "Published 3 end-to-end user experience case studies and earned an apprenticeship with a digital product team."
  }
];

export function ProgressStories() {
  return (
    <section className="sectionPad storiesSection" id="stories" aria-labelledby="stories-heading">
      <div className="shell">
        <div className="storiesHeaderCenter">
          <span className="editorialEyebrow">Progress Stories</span>
          <h2 id="stories-heading" className="storiesMainHeading">
            Not overnight miracles. The quiet dignity of daily execution.
          </h2>
          <p className="storiesSubtitle">
            We do not celebrate sudden overnight transformations or exaggerated claims. We celebrate
            people who recognized where their routines were failing, took responsibility for their
            calendar, and built tangible proof of progress:
          </p>
        </div>

        <div className="storiesGrid">
          {STORIES.map((story) => (
            <div key={story.name} className="storyCard">
              <div className="storyCardHeader">
                <div className="storyAvatar">
                  <User size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="storyName">{story.name}</h3>
                  <span className="storyRole">{story.role}</span>
                </div>
              </div>

              <div className="storyBlock">
                <span className="storyLabel">The Honest Struggle:</span>
                <p className="storyText isContext">{story.context}</p>
              </div>

              <div className="storyBlock">
                <span className="storyLabel">The System Shift:</span>
                <p className="storyText isShift">{story.shift}</p>
              </div>

              <div className="storyProofBadge">
                <Sparkles size={14} aria-hidden="true" />
                <div>
                  <strong>Tangible Proof:</strong>
                  <p>{story.tangibleProof}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
