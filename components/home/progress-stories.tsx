import { Quote, Sparkles, User } from "lucide-react";

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
    context: "Stuck in 8 months of tutorial hell, watching endless videos without deploying a single project.",
    shift: "Applied the Day 30 / Day 60 milestone system and protected 60 morning minutes before work.",
    tangibleProof: "Shipped two full-stack applications with Supabase auth and published documented case studies on GitHub."
  },
  {
    name: "Aisha M.",
    role: "University Student",
    context: "Constantly waiting for mood and energy, repeatedly missing self-imposed study schedules.",
    shift: "Adopted the 15-minute emergency minimum rule and Sunday weekly reviews.",
    tangibleProof: "Maintained a 42-day continuous study habit and completed her foundational data analysis curriculum."
  },
  {
    name: "Mariam T.",
    role: "Community Member",
    context: "Felt isolated building alone with no external accountability or feedback loop.",
    shift: "Joined Wednesday live calls and committed to logging Friday proof-of-work updates.",
    tangibleProof: "Organized her chaotic notes into a published resource guide and received her first paid client inquiry."
  },
  {
    name: "Fisayo L.",
    role: "Product Designer",
    context: "Had scattered design concepts stored locally on Figma without public visibility.",
    shift: "Committed to the 'From Learning to Assets' framework, packaging practice drills into public case studies.",
    tangibleProof: "Published 3 end-to-end case studies and secured a junior product design apprenticeship."
  }
];

export function ProgressStories() {
  return (
    <section className="sectionPad storiesSection" id="stories" aria-labelledby="stories-heading">
      <div className="shell">
        <div className="storiesHeaderCenter">
          <span className="editorialEyebrow">Authentic Proof</span>
          <h2 id="stories-heading" className="storiesMainHeading">
            Real people. Honest struggles. Concrete progress.
          </h2>
          <p className="storiesSubtitle">
            We don&apos;t celebrate overnight miracles or exaggerated claims. We celebrate people who
            replace drift with daily systems and leave tangible artifacts behind:
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

