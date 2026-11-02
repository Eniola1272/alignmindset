type Story = {
  id: string;
  name: string;
  role: string;
  context: string;
  shift: string;
  tangibleProof: string;
};

const STORIES: Story[] = [
  {
    id: "01",
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
    id: "02",
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
    id: "03",
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
    id: "04",
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
    <section className="edSection edStoriesSection" id="stories" aria-labelledby="stories-heading">
      <div className="shell">
        {/* Section Header */}
        <div className="edSectionHeader">
          <div className="edSectionMeta">
            <span>Documented Field Notes</span>
            <span className="edDot" aria-hidden="true">•</span>
            <span>Section 06</span>
          </div>
          <h2 id="stories-heading" className="edSectionHeading">
            Not overnight miracles. The quiet dignity of daily execution.
          </h2>
          <p className="edSectionLead">
            We do not celebrate sudden overnight transformations or inflated claims. We document
            real participants who recognized where their routines were failing, took responsibility for
            their calendar, and built tangible proof of progress:
          </p>
        </div>

        {/* Field Notes Editorial Ledger Grid */}
        <div className="edDispatchesGrid">
          {STORIES.map((story) => (
            <article key={story.id} className="dispatchRecord">
              <div className="dispatchHeader">
                <span className="dispatchIndex">Case Record {story.id}</span>
                <div className="dispatchParticipant">
                  <h3 className="participantName">{story.name}</h3>
                  <span className="participantRole">{story.role}</span>
                </div>
              </div>

              <div className="dispatchBody">
                <div className="dispatchEntry">
                  <span className="entryLabel">The Friction:</span>
                  <p className="entryText isContext">{story.context}</p>
                </div>

                <div className="dispatchEntry">
                  <span className="entryLabel">The System Shift:</span>
                  <p className="entryText isShift">{story.shift}</p>
                </div>
              </div>

              <div className="dispatchProof">
                <span className="proofLabel">Verified Artifact:</span>
                <p className="proofText">{story.tangibleProof}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
