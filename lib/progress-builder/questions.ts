import type {
  ConditionalVisibility,
  QuestionDefinition,
  SectionDefinition
} from "./types";

export const PROGRESS_BUILDER_SECTIONS: SectionDefinition[] = [
  {
    id: "section_present_position",
    number: 1,
    title: "Where You Are Now",
    subtitle: "Present Position",
    description:
      "Clarify your current starting point, honest frustrations, and where friction has been holding you back."
  },
  {
    id: "section_desired_result",
    number: 2,
    title: "What You Want to Change",
    subtitle: "Desired Result",
    description:
      "Define what a successful 90-day turnaround looks like and the one milestone that matters most."
  },
  {
    id: "section_strengths_interests",
    number: 3,
    title: "Strengths and Interests",
    subtitle: "Natural Leverage",
    description:
      "Uncover your existing abilities, natural inclinations, and what you can learn without being forced."
  },
  {
    id: "section_skill_direction",
    number: 4,
    title: "Choosing a Skill or Direction",
    subtitle: "Focus and Depth",
    description:
      "Zero in on one primary high-value skill or track to commit to for the next 90 days."
  },
  {
    id: "section_learning_history",
    number: 5,
    title: "Learning History",
    subtitle: "Patterns and Course Selection",
    description:
      "Analyze what worked or failed in the past so your new plan doesn't repeat past dropouts."
  },
  {
    id: "section_limitations_resources",
    number: 6,
    title: "Time, Tools and Limitations",
    subtitle: "Realistic Constraints",
    description:
      "Map out available hours, devices, internet reliability, and daily distractions to manage."
  },
  {
    id: "section_daily_system",
    number: 7,
    title: "Daily Progress System",
    subtitle: "Habits and Protection",
    description:
      "Build a realistic daily routine with non-zero minimums for busy or low-energy days."
  },
  {
    id: "section_projects_evidence",
    number: 8,
    title: "Projects and Evidence",
    subtitle: "Proof of Work",
    description:
      "Define 30, 60, and 90-day projects that prove your competence beyond paper certificates."
  },
  {
    id: "section_opportunities",
    number: 9,
    title: "Opportunities and Career Preparation",
    subtitle: "Market Readiness",
    description:
      "Align your CV, portfolio, LinkedIn, and application rhythm to open real doors."
  },
  {
    id: "section_accountability_commitment",
    number: 10,
    title: "Accountability and Commitment",
    subtitle: "Staying the Course",
    description:
      "Establish review rhythms, eliminate distractions, and lock in your first 24-hour action."
  }
];

export const PROGRESS_BUILDER_QUESTIONS: QuestionDefinition[] = [
  // SECTION 1: Where You Are Now
  {
    question_id: "current_status",
    section_id: "section_present_position",
    label: "What is your current day-to-day occupation or status?",
    helper_text: "Help us understand your baseline routine and current commitments.",
    input_type: "single_choice",
    options: [
      { value: "employed_fulltime", label: "Employed full-time" },
      { value: "employed_parttime", label: "Employed part-time / contract" },
      { value: "freelancing", label: "Freelancing / self-employed" },
      { value: "student", label: "Undergraduate / student" },
      { value: "nysc_intern", label: "NYSC / intern" },
      { value: "job_hunting", label: "Looking for work / unemployed" },
      { value: "career_break", label: "Taking a career transition break" }
    ],
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "dissatisfaction_area",
    section_id: "section_present_position",
    label: "What area of your life or career are you currently most dissatisfied with?",
    helper_text: "Be honest. Naming the real pain point ensures your 90-day plan addresses it directly.",
    input_type: "single_choice",
    options: [
      { value: "low_income", label: "Income & financial stagnation" },
      { value: "unclear_direction", label: "Lack of clear career path or confusion" },
      { value: "lack_of_marketable_skills", label: "Lack of in-demand, marketable skills" },
      { value: "inconsistency_procrastination", label: "Inconsistency and chronic procrastination" },
      { value: "no_portfolio_proof", label: "Learning without tangible projects or proof" },
      { value: "lack_of_opportunities", label: "Sending applications with zero responses" }
    ],
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "recent_improvement_attempts",
    section_id: "section_present_position",
    label: "What have you been trying to improve or change recently?",
    helper_text: "Share the specific goals, routines, or fields you have attempted to work on.",
    input_type: "textarea",
    placeholder: "e.g., I tried learning data analytics on YouTube and applying for remote internships...",
    required: true,
    display_order: 3,
    validation_rules: { minLength: 10 },
    active: true,
    version: "1.0"
  },
  {
    question_id: "started_not_completed",
    section_id: "section_present_position",
    label: "What have you started in the past 6–12 months but left uncompleted?",
    helper_text: "Courses, books, portfolios, or side projects you abandoned halfway.",
    input_type: "textarea",
    placeholder: "e.g., An online Python course, a portfolio website, and a certification exam prep...",
    required: false,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "primary_blocker",
    section_id: "section_present_position",
    label: "What has been the biggest barrier preventing you from progressing?",
    helper_text: "Select the primary root cause holding you back.",
    input_type: "single_choice",
    options: [
      { value: "information_overload", label: "Information overload & not knowing where to start" },
      { value: "poor_time_management", label: "Demanding job/school with poor time protection" },
      { value: "isolation_no_accountability", label: "Learning alone with no one to hold me accountable" },
      { value: "financial_device_constraints", label: "Financial pressure or unreliable laptop/data" },
      { value: "self_doubt_perfectionism", label: "Imposter syndrome and fear of putting work out there" }
    ],
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "clarity_rating",
    section_id: "section_present_position",
    label: "How clear are you about your exact career or skill direction right now? (1–10)",
    helper_text: "1 = Completely lost and overwhelmed, 10 = Crystal clear with absolute focus.",
    input_type: "rating_scale",
    required: true,
    display_order: 6,
    validation_rules: { min: 1, max: 10 },
    active: true,
    version: "1.0"
  },
  {
    question_id: "consistency_rating",
    section_id: "section_present_position",
    label: "How consistent are you with daily deliberate action? (1–10)",
    helper_text: "1 = Rare spurts followed by weeks of inactivity, 10 = Unshakable daily discipline.",
    input_type: "rating_scale",
    required: true,
    display_order: 7,
    validation_rules: { min: 1, max: 10 },
    active: true,
    version: "1.0"
  },

  // SECTION 2: What You Want to Change
  {
    question_id: "desired_90_day_change",
    section_id: "section_desired_result",
    label: "If the next 90 days went exceptionally well, what would be different in your life?",
    helper_text: "Describe the concrete shift in your capability, daily rhythm, or confidence.",
    input_type: "textarea",
    placeholder: "e.g., I would have finished my frontend portfolio, built 3 full projects, and have a daily 90-minute study routine that feels natural...",
    required: true,
    display_order: 1,
    validation_rules: { minLength: 15 },
    active: true,
    version: "1.0"
  },
  {
    question_id: "single_most_important_result",
    section_id: "section_desired_result",
    label: "What single result matters more than anything else right now?",
    helper_text: "Narrow it down to the one priority that unlocks everything else.",
    input_type: "text",
    placeholder: "e.g., Landing my first junior design contract or publishing my portfolio",
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "why_it_matters",
    section_id: "section_desired_result",
    label: "Why does this specific result matter so much to you personally?",
    helper_text: "Your core emotional driver will fuel you when motivation wanes.",
    input_type: "textarea",
    placeholder: "e.g., I need financial independence and want to stop relying on family allowances...",
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "cost_of_inaction",
    section_id: "section_desired_result",
    label: "What happens if nothing changes and you stay where you are for another 90 days?",
    helper_text: "Acknowledge the real cost of putting off your progress.",
    input_type: "textarea",
    placeholder: "e.g., I will remain stuck in survival mode, losing another 3 months of momentum and feeling deeper regret...",
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "target_outcome_type",
    section_id: "section_desired_result",
    label: "Which primary path best describes your goal for the next 90 days?",
    helper_text: "This guides the career and evidence questions in subsequent sections.",
    input_type: "single_choice",
    options: [
      { value: "employment", label: "Securing employment or an internship" },
      { value: "freelancing", label: "Building freelance client income" },
      { value: "business_growth", label: "Growing an entrepreneurial business or offer" },
      { value: "career_change", label: "Pivoting to a new high-growth tech or creative field" },
      { value: "skill_development", label: "Deep foundational skill acquisition and mastery" },
      { value: "personal_discipline", label: "Building unshakeable personal systems & habits" }
    ],
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "measurable_90_day_metric",
    section_id: "section_desired_result",
    label: "What specific, measurable metric will define success at Day 90?",
    helper_text: "Numbers create accountability (e.g., 3 completed projects, 15 proposals sent, 100 hours logged).",
    input_type: "text",
    placeholder: "e.g., 3 portfolio-ready web apps live on GitHub and Vercel",
    required: true,
    display_order: 6,
    active: true,
    version: "1.0"
  },

  // SECTION 3: Strengths and Interests
  {
    question_id: "enjoyed_activities",
    section_id: "section_strengths_interests",
    label: "What types of work or activities do you naturally enjoy doing?",
    helper_text: "Activities where time flies and you feel energised rather than drained.",
    input_type: "textarea",
    placeholder: "e.g., Organizing systems, writing explanations, sketching UI ideas, solving logic puzzles...",
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "what_others_ask_help_with",
    section_id: "section_strengths_interests",
    label: "What do friends, colleagues, or family frequently ask you to help them with?",
    helper_text: "This often reveals latent skills you take for granted.",
    input_type: "textarea",
    placeholder: "e.g., Proofreading documents, fixing tech issues, designing social media flyers, organizing events...",
    required: false,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "existing_skills",
    section_id: "section_strengths_interests",
    label: "What skills or tools do you already possess some familiarity with?",
    helper_text: "Software, languages, frameworks, or practical trade skills you have touched.",
    input_type: "text",
    placeholder: "e.g., HTML/CSS basics, Canva, Excel, Google Docs, Figma basics, copywriting",
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "curious_subjects",
    section_id: "section_strengths_interests",
    label: "What topics or subjects can you read, watch, or learn about without being forced?",
    helper_text: "Genuine curiosity makes deep practice sustainable.",
    input_type: "text",
    placeholder: "e.g., Product design, AI automation, financial markets, backend architecture, storytelling",
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "past_proud_achievement",
    section_id: "section_strengths_interests",
    label: "What past project, achievement, or challenge are you most proud of completing?",
    helper_text: "Remind yourself of what you are capable of when focused.",
    input_type: "textarea",
    placeholder: "e.g., Leading our university final project team to a top grade despite tight deadlines...",
    required: false,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "strengths_archetype",
    section_id: "section_strengths_interests",
    label: "Which primary activity category best describes your natural style?",
    helper_text: "Select up to 2 areas where your strengths shine most.",
    input_type: "multiple_choice",
    options: [
      { value: "builder_technical", label: "Builder / Technical (Code, systems, mechanics, troubleshooting)" },
      { value: "creator_visual", label: "Creator / Visual (Design, UI/UX, video, aesthetics, brand)" },
      { value: "communicator_writer", label: "Communicator / Writer (Content, essays, teaching, marketing)" },
      { value: "analyst_researcher", label: "Analyst / Researcher (Data, insights, pattern discovery, finance)" },
      { value: "organizer_operations", label: "Organizer / Operations (Project management, coordination, process)" },
      { value: "connector_sales", label: "Connector / Sales (Community, partnerships, customer empathy)" }
    ],
    required: true,
    display_order: 6,
    active: true,
    version: "1.0"
  },

  // SECTION 4: Choosing a Skill or Direction
  {
    question_id: "skill_readiness",
    section_id: "section_skill_direction",
    label: "Do you already know the specific skill you want to focus on, or do you need help narrowing it down?",
    input_type: "single_choice",
    options: [
      { value: "decided", label: "I have already chosen my primary skill track" },
      { value: "deciding_between_two", label: "I am torn between two related options" },
      { value: "need_guidance", label: "I need Align Mindset's assessment to recommend the best direction" }
    ],
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "target_skill_name",
    section_id: "section_skill_direction",
    label: "What skill or track are you targeting (or considering)?",
    helper_text: "e.g., Frontend Web Development (React), Product Design (UI/UX), Data Analysis (Python/SQL), Content Strategy, Digital Marketing.",
    input_type: "text",
    placeholder: "e.g., Frontend Web Development (React & TypeScript)",
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "skill_interest_reason",
    section_id: "section_skill_direction",
    label: "Why does this particular skill track attract you?",
    helper_text: "Is it market demand, creative fulfillment, remote work potential, or natural fit?",
    input_type: "textarea",
    placeholder: "e.g., It matches my love for problem solving, offers strong remote opportunities, and has visible proof of work...",
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "has_researched_daily_work",
    section_id: "section_skill_direction",
    label: "Have you researched what this work actually looks like on a typical workday?",
    helper_text: "Understanding the unglamorous day-to-day prevents early disillusionment.",
    input_type: "yes_no",
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "knows_practitioner",
    section_id: "section_skill_direction",
    label: "Do you know anyone currently working in this field who can give you reality checks?",
    input_type: "yes_no",
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "single_skill_commitment_agreement",
    section_id: "section_skill_direction",
    label: "Will you agree to stay focused on this ONE skill for 90 days without jumping to a new shiny trend?",
    helper_text: "Shiny object syndrome is the #1 killer of progress. Depth creates leverage.",
    input_type: "single_choice",
    options: [
      { value: "yes_committed", label: "Yes, 100% committed to this one skill for 90 days" },
      { value: "hesitant", label: "I struggle with shiny object syndrome and need guardrails" }
    ],
    required: true,
    display_order: 6,
    active: true,
    version: "1.0"
  },

  // SECTION 5: Learning History
  {
    question_id: "past_courses_started",
    section_id: "section_learning_history",
    label: "What specific courses, tutorials, or bootcamps have you taken in the past?",
    helper_text: "List platforms or instructors (e.g., Coursera, Udemy, YouTube playlists, ALX, freeCodeCamp).",
    input_type: "textarea",
    placeholder: "e.g., Completed Harvard CS50 week 1-4, bought a JavaScript Udemy course, watched UI tutorials...",
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "past_abandonment_reasons",
    section_id: "section_learning_history",
    label: "When you abandoned learning paths in the past, what was the primary cause?",
    input_type: "multiple_choice",
    options: [
      { value: "tutorial_hell", label: "Tutorial hell — watching without building projects" },
      { value: "lack_of_accountability", label: "No one noticed whether I studied or not" },
      { value: "too_difficult_got_stuck", label: "Hit a difficult blocker and had no mentor or help" },
      { value: "loss_of_interest", label: "Doubted whether it was the right path and lost interest" },
      { value: "time_constraints", label: "Work, family, or academic schedule overwhelmed me" },
      { value: "bad_course_structure", label: "Course was outdated, dry, or poorly structured" }
    ],
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "learning_style_preference",
    section_id: "section_learning_history",
    label: "How do you learn most effectively and retain knowledge best?",
    input_type: "single_choice",
    options: [
      { value: "project_based", label: "Project-first: Building real things and looking up docs as I go" },
      { value: "structured_video", label: "Step-by-step video courses with exercises" },
      { value: "reading_docs", label: "Reading official documentation, books, and articles" },
      { value: "cohort_community", label: "Cohort community with peer discussions and deadlines" }
    ],
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "has_existing_course",
    section_id: "section_learning_history",
    label: "Do you already have a specific course, book, or curriculum selected for this 90-day sprint?",
    input_type: "yes_no",
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "existing_course_details",
    section_id: "section_learning_history",
    label: "What is the name, provider/URL, and expected duration of your selected course?",
    helper_text: "Include whether it offers a verified certificate or capstone project.",
    input_type: "textarea",
    placeholder: "e.g., The Odin Project (Full Stack JavaScript), free online, approx 150 hours...",
    required: true,
    display_order: 5,
    conditional_visibility: {
      dependsOn: "has_existing_course",
      operator: "equals",
      value: true
    },
    active: true,
    version: "1.0"
  },
  {
    question_id: "wants_course_recommendation",
    section_id: "section_learning_history",
    label: "Would you like AMI's plan generator to recommend a reputable learning track for your skill?",
    input_type: "single_choice",
    options: [
      { value: "yes_recommend", label: "Yes, recommend high-quality, proven curricula" },
      { value: "curate_self", label: "No, I prefer to assemble my own resources" }
    ],
    required: true,
    display_order: 6,
    conditional_visibility: {
      dependsOn: "has_existing_course",
      operator: "equals",
      value: false
    },
    active: true,
    version: "1.0"
  },

  // SECTION 6: Time, Tools and Limitations
  {
    question_id: "weekly_hours_capacity",
    section_id: "section_limitations_resources",
    label: "How many hours per week can you realistically commit to learning and building?",
    helper_text: "Be honest. A realistic 10 hours consistently beats an unsustainable promise of 30 hours.",
    input_type: "single_choice",
    options: [
      { value: "5_to_10", label: "5 – 10 hours / week (approx. 1 – 1.5 hours/day)" },
      { value: "10_to_15", label: "10 – 15 hours / week (approx. 2 hours/day)" },
      { value: "15_to_20", label: "15 – 20 hours / week (approx. 2.5 – 3 hours/day)" },
      { value: "20_plus", label: "20+ hours / week (full-time intensive transition)" }
    ],
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "daily_protected_window",
    section_id: "section_limitations_resources",
    label: "Which time window can you most reliably protect every single day?",
    input_type: "single_choice",
    options: [
      { value: "early_morning", label: "Early Morning (5:00 AM – 8:00 AM) before daily noise begins" },
      { value: "lunch_midday", label: "Midday / Lunch break (12:00 PM – 2:00 PM)" },
      { value: "evening", label: "Evening (6:00 PM – 9:00 PM) after work/school" },
      { value: "night_owl", label: "Late Night (9:00 PM – 12:00 AM) when everywhere is quiet" }
    ],
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "primary_hardware_device",
    section_id: "section_limitations_resources",
    label: "What device will you primarily use for your learning and project work?",
    input_type: "single_choice",
    options: [
      { value: "personal_laptop", label: "Personal laptop / desktop in good working condition" },
      { value: "shared_laptop", label: "Shared family or office computer" },
      { value: "phone_only", label: "Smartphone only (need low-hardware mobile friendly tasks)" },
      { value: "tablet", label: "Tablet / iPad with external keyboard" }
    ],
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "internet_reliability",
    section_id: "section_limitations_resources",
    label: "How reliable and accessible is your internet connection?",
    input_type: "single_choice",
    options: [
      { value: "fiber_broadband", label: "Fast, reliable broadband or Wi-Fi" },
      { value: "stable_mobile_data", label: "Mobile data (adequate for videos and downloads)" },
      { value: "intermittent_data", label: "Intermittent / limited mobile data (need offline notes/code)" },
      { value: "severe_limitations", label: "Strictly limited data; need downloaded resources" }
    ],
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "primary_distractions",
    section_id: "section_limitations_resources",
    label: "What usually distracts or derails you when you sit down to focus?",
    input_type: "multiple_choice",
    options: [
      { value: "social_media_phone", label: "Social media (TikTok, Instagram, X/Twitter, WhatsApp status)" },
      { value: "video_streaming_gaming", label: "YouTube rabbit holes, streaming shows, or video games" },
      { value: "family_errands", label: "Family demands, household chores, frequent interruptions" },
      { value: "fatigue_brain_fog", label: "Physical exhaustion from commute or demanding job" },
      { value: "overwhelm_anxiety", label: "Feeling overwhelmed and switching between tasks" }
    ],
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "habits_to_cut_down",
    section_id: "section_limitations_resources",
    label: "What activity or habit are you willing to reduce or cut out to protect this time?",
    helper_text: "Making progress requires making room. What will you sacrifice?",
    input_type: "text",
    placeholder: "e.g., Cutting 90 minutes of mindless evening scrolling; limiting late night calls",
    required: true,
    display_order: 6,
    active: true,
    version: "1.0"
  },

  // SECTION 7: Daily Progress System
  {
    question_id: "daily_sustainable_minutes",
    section_id: "section_daily_system",
    label: "What daily practice time can you realistically sustain, even on busy days?",
    input_type: "single_choice",
    options: [
      { value: "30", label: "30 minutes per day" },
      { value: "45", label: "45 minutes per day" },
      { value: "60", label: "60 minutes per day (1 hour)" },
      { value: "90", label: "90 minutes per day (1.5 hours)" },
      { value: "120", label: "120 minutes per day (2 hours)" }
    ],
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "working_days_per_week",
    section_id: "section_daily_system",
    label: "How many days per week will you commit to this daily system?",
    input_type: "single_choice",
    options: [
      { value: "5", label: "5 days / week (e.g., Monday through Friday)" },
      { value: "6", label: "6 days / week (with one designated rest/recharge day)" },
      { value: "7", label: "7 days / week (including light weekend reviews)" }
    ],
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "physical_work_location",
    section_id: "section_daily_system",
    label: "Where specifically will your daily learning sessions physically take place?",
    helper_text: "A designated environment triggers deep focus.",
    input_type: "text",
    placeholder: "e.g., At my desk in my room with headphones on, or at a local workspace/library",
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "emergency_minimum_action",
    section_id: "section_daily_system",
    label: "What is your 'emergency minimum' action on days when everything goes wrong?",
    helper_text: "Never break the chain. What is a 10-15 minute minimum that keeps the identity alive?",
    input_type: "text",
    placeholder: "e.g., 15 minutes of reviewing my notes, reading 5 pages of docs, or committing one tiny fix",
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "missed_day_recovery_rule",
    section_id: "section_daily_system",
    label: "What is your explicit recovery rule if you miss one day?",
    helper_text: "Missing one day is an accident; missing two is the start of a new bad habit.",
    input_type: "single_choice",
    options: [
      { value: "never_miss_twice", label: "Never miss twice in a row — next day session is non-negotiable" },
      { value: "double_next_morning", label: "Do a 20-minute morning reset session the very next morning" },
      { value: "weekend_catchup", label: "Add a protected 60-minute block to my weekend catch-up slot" }
    ],
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },

  // SECTION 8: Projects and Evidence
  {
    question_id: "weekly_evidence_output",
    section_id: "section_projects_evidence",
    label: "What tangible evidence will you produce at the end of every week?",
    helper_text: "Certificates alone do not prove competence. Real work does.",
    input_type: "single_choice",
    options: [
      { value: "git_commits_code", label: "GitHub repository commits and deployed demo links" },
      { value: "figma_designs", label: "Figma design files and interactive prototypes" },
      { value: "written_case_studies", label: "Documented case study, technical note, or summary article" },
      { value: "video_breakdown", label: "Screen recording / Loom explaining what was built and learned" }
    ],
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "day_30_milestone_project",
    section_id: "section_projects_evidence",
    label: "What beginner/foundational project can you complete by Day 30?",
    helper_text: "A simple, well-executed project that applies the first month of learning.",
    input_type: "text",
    placeholder: "e.g., Responsive multi-page portfolio landing page or functional UI component library",
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "day_60_milestone_project",
    section_id: "section_projects_evidence",
    label: "What intermediate project can you complete by Day 60?",
    helper_text: "A more complex project integrating state, APIs, databases, or thorough user research.",
    input_type: "text",
    placeholder: "e.g., Interactive task management web app with user authentication and database",
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "day_90_capstone_project",
    section_id: "section_projects_evidence",
    label: "What polished capstone project can you present to the world by Day 90?",
    helper_text: "A flagship piece of proof you would proudly show to an employer or paying client.",
    input_type: "text",
    placeholder: "e.g., Complete end-to-end client solution with live production deployment and case study",
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "public_portfolio_location",
    section_id: "section_projects_evidence",
    label: "Where will your projects and code be hosted for public viewing?",
    input_type: "multiple_choice",
    options: [
      { value: "github", label: "GitHub" },
      { value: "personal_website", label: "Personal portfolio website / custom domain" },
      { value: "behance_dribbble", label: "Behance / Dribbble" },
      { value: "medium_substack", label: "Medium / Substack / Dev.to" },
      { value: "notion_drive", label: "Notion public page or Google Drive" }
    ],
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "feedback_sources",
    section_id: "section_projects_evidence",
    label: "Who can review your projects and provide honest technical or design critique?",
    input_type: "text",
    placeholder: "e.g., Align Mindset community members, a senior colleague on WhatsApp, Reddit community",
    required: false,
    display_order: 6,
    active: true,
    version: "1.0"
  },

  // SECTION 9: Opportunities and Career Preparation
  {
    question_id: "has_updated_cv",
    section_id: "section_opportunities",
    label: "Do you have an updated CV/resume reflecting your current projects and capabilities?",
    input_type: "single_choice",
    options: [
      { value: "yes_ready", label: "Yes, modern and updated" },
      { value: "needs_revision", label: "Needs significant rewriting and modernization" },
      { value: "none", label: "Do not have one ready yet" }
    ],
    required: true,
    display_order: 1,
    conditional_visibility: {
      dependsOn: "target_outcome_type",
      operator: "includes",
      value: "employment"
    },
    active: true,
    version: "1.0"
  },
  {
    question_id: "linkedin_profile_status",
    section_id: "section_opportunities",
    label: "How complete and active is your LinkedIn profile?",
    input_type: "single_choice",
    options: [
      { value: "all_star", label: "Complete with headline, banner, and active posting" },
      { value: "basic", label: "Basic profile created, but rarely active" },
      { value: "inactive_or_none", label: "No profile or completely outdated" }
    ],
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "freelance_offer_clarity",
    section_id: "section_opportunities",
    label: "What specific service or deliverable will you offer to paying clients?",
    helper_text: "Describe the specific problem you solve for them and the expected deliverable.",
    input_type: "textarea",
    placeholder: "e.g., I design and build modern 5-page business websites with CMS and SEO for local SMEs...",
    required: true,
    display_order: 3,
    conditional_visibility: {
      dependsOn: "target_outcome_type",
      operator: "includes",
      value: "freelancing"
    },
    active: true,
    version: "1.0"
  },
  {
    question_id: "weekly_application_target",
    section_id: "section_opportunities",
    label: "How many high-quality, customized applications or proposals will you submit weekly in Month 3?",
    input_type: "single_choice",
    options: [
      { value: "3_to_5", label: "3 – 5 focused, highly-personalized applications / week" },
      { value: "5_to_10", label: "5 – 10 quality applications / week" },
      { value: "10_plus", label: "10+ applications / week" }
    ],
    required: true,
    display_order: 4,
    active: true,
    version: "1.0"
  },
  {
    question_id: "willing_to_share_publicly",
    section_id: "section_opportunities",
    label: "Are you willing to share your learning milestones publicly (e.g. on LinkedIn or X/Twitter)?",
    helper_text: "Building in public creates inbound serendipity and attracts mentors.",
    input_type: "yes_no",
    required: true,
    display_order: 5,
    active: true,
    version: "1.0"
  },
  {
    question_id: "gap_to_first_opportunity",
    section_id: "section_opportunities",
    label: "In your honest opinion, what is the single biggest missing piece between you and your first real win?",
    input_type: "textarea",
    placeholder: "e.g., A polished portfolio with 2 real-world case studies and the courage to reach out directly...",
    required: true,
    display_order: 6,
    active: true,
    version: "1.0"
  },

  // SECTION 10: Accountability and Commitment
  {
    question_id: "accountability_partner",
    section_id: "section_accountability_commitment",
    label: "Who can hold you accountable throughout these 90 days?",
    helper_text: "Choose someone who will be lovingly firm with you.",
    input_type: "single_choice",
    options: [
      { value: "mentor", label: "A mentor or senior colleague" },
      { value: "ami_community", label: "Align Mindset community accountability group" },
      { value: "trusted_friend", label: "A trusted friend or study partner" },
      { value: "sibling_family", label: "Sibling or family member" },
      { value: "self_tracked", label: "Self-accountability with public weekly check-ins" }
    ],
    required: true,
    display_order: 1,
    active: true,
    version: "1.0"
  },
  {
    question_id: "review_cadence",
    section_id: "section_accountability_commitment",
    label: "How frequently will your progress be reviewed?",
    input_type: "single_choice",
    options: [
      { value: "weekly_sunday", label: "Weekly every Sunday evening" },
      { value: "biweekly", label: "Bi-weekly every two weeks" },
      { value: "monthly", label: "Monthly milestone check" }
    ],
    required: true,
    display_order: 2,
    active: true,
    version: "1.0"
  },
  {
    question_id: "weekly_evidence_commitment",
    section_id: "section_accountability_commitment",
    label: "Will you commit to submitting weekly evidence of your work throughout the 90 days?",
    input_type: "yes_no",
    required: true,
    display_order: 3,
    active: true,
    version: "1.0"
  },
  {
    question_id: "commitment_score",
    section_id: "section_accountability_commitment",
    label: "On a scale of 1 to 10, how committed are you to executing this 90-day plan?",
    helper_text: "1 = Just curious, 10 = Fully prepared to make sacrifices and see it through.",
    input_type: "rating_scale",
    required: true,
    display_order: 4,
    validation_rules: { min: 1, max: 10 },
    active: true,
    version: "1.0"
  },
  {
    question_id: "low_commitment_intervention",
    section_id: "section_accountability_commitment",
    label: "Since your commitment score is under 7, what needs to change before you begin?",
    helper_text: "What obstacle or hesitation must be resolved for you to give this your all?",
    input_type: "textarea",
    placeholder: "e.g., I need to resolve my exam timetable first, or I need to talk to my manager about reducing overtime...",
    required: true,
    display_order: 5,
    conditional_visibility: {
      dependsOn: "commitment_score",
      operator: "less_than",
      value: 7
    },
    active: true,
    version: "1.0"
  },
  {
    question_id: "move_commitment_higher",
    section_id: "section_accountability_commitment",
    label: "What would move your commitment one point higher right now?",
    input_type: "text",
    placeholder: "e.g., Having a clear step-by-step roadmap so I never wonder what to do next",
    required: true,
    display_order: 6,
    active: true,
    version: "1.0"
  },
  {
    question_id: "first_24_hour_action",
    section_id: "section_accountability_commitment",
    label: "What single, immediate action will you complete within the next 24 hours?",
    helper_text: "Momentum begins immediately. Make it small, concrete, and achievable today.",
    input_type: "text",
    placeholder: "e.g., Create my GitHub repo and complete Chapter 1 of the JavaScript docs tonight",
    required: true,
    display_order: 7,
    active: true,
    version: "1.0"
  }
];

export function isQuestionVisible(
  question: QuestionDefinition,
  answers: Record<string, any>
): boolean {
  if (!question.conditional_visibility) {
    return true;
  }

  const { dependsOn, operator, value } = question.conditional_visibility;
  const dependencyAnswer = answers[dependsOn];

  if (dependencyAnswer === undefined || dependencyAnswer === null) {
    return false;
  }

  switch (operator) {
    case "equals":
      return dependencyAnswer === value;
    case "not_equals":
      return dependencyAnswer !== value;
    case "includes":
      if (Array.isArray(dependencyAnswer)) {
        return dependencyAnswer.includes(value);
      }
      return String(dependencyAnswer).includes(String(value));
    case "less_than":
      return Number(dependencyAnswer) < Number(value);
    case "greater_than":
      return Number(dependencyAnswer) > Number(value);
    case "not_empty":
      if (Array.isArray(dependencyAnswer)) {
        return dependencyAnswer.length > 0;
      }
      return String(dependencyAnswer).trim().length > 0;
    default:
      return true;
  }
}

export function getVisibleQuestionsForSection(
  sectionId: string,
  answers: Record<string, any>
): QuestionDefinition[] {
  return PROGRESS_BUILDER_QUESTIONS.filter(
    (q) => q.section_id === sectionId && q.active && isQuestionVisible(q, answers)
  ).sort((a, b) => a.display_order - b.display_order);
}

export function calculateCompletionPercentage(
  answers: Record<string, any>
): number {
  const visibleQuestions = PROGRESS_BUILDER_QUESTIONS.filter(
    (q) => q.active && isQuestionVisible(q, answers)
  );

  if (visibleQuestions.length === 0) return 0;

  const answeredCount = visibleQuestions.filter((q) => {
    const val = answers[q.question_id];
    if (val === undefined || val === null || val === "") return false;
    if (Array.isArray(val) && val.length === 0) return false;
    return true;
  }).length;

  return Math.min(100, Math.round((answeredCount / visibleQuestions.length) * 100));
}

export function validateSectionAnswers(
  sectionId: string,
  answers: Record<string, any>
): { valid: boolean; errors: Record<string, string> } {
  const visible = getVisibleQuestionsForSection(sectionId, answers);
  const errors: Record<string, string> = {};

  for (const q of visible) {
    const val = answers[q.question_id];

    if (q.required) {
      if (
        val === undefined ||
        val === null ||
        val === "" ||
        (Array.isArray(val) && val.length === 0)
      ) {
        errors[q.question_id] = "This question requires an answer.";
        continue;
      }
    }

    if (val !== undefined && val !== null && val !== "") {
      if (q.validation_rules?.minLength && typeof val === "string") {
        if (val.trim().length < q.validation_rules.minLength) {
          errors[q.question_id] = `Please enter at least ${q.validation_rules.minLength} characters.`;
        }
      }
      if (q.validation_rules?.min !== undefined && typeof val === "number") {
        if (val < q.validation_rules.min) {
          errors[q.question_id] = `Minimum value is ${q.validation_rules.min}.`;
        }
      }
      if (q.validation_rules?.max !== undefined && typeof val === "number") {
        if (val > q.validation_rules.max) {
          errors[q.question_id] = `Maximum value is ${q.validation_rules.max}.`;
        }
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
