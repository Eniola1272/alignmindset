export const site = {
  name: "Align Mindset Initiative",
  shortName: "Align Mindset",
  description:
    "Helping people align identity, systems, skills, and daily action toward purposeful growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@alignmindset.org",
  nav: [
    { label: "Programs", href: "/#programs" },
    { label: "Framework", href: "/#framework" },
    { label: "Blog", href: "/blog" },
    { label: "Editorial", href: "/editorial" }
  ]
};

export const pillars = [
  {
    title: "Identity",
    description:
      "Know who you are becoming before chasing another goal. Identity gives growth a center."
  },
  {
    title: "Systems",
    description:
      "Build repeatable routines, environments, and accountability rhythms that outlast motivation."
  },
  {
    title: "Skills",
    description:
      "Choose practical skills, practice deliberately, and create proof that opens real opportunities."
  },
  {
    title: "Action",
    description:
      "Turn learning into weekly execution through simple challenges, reflection, and community momentum."
  },
  {
    title: "Assets",
    description:
      "Package what you learn into notes, projects, portfolios, content, products, and services."
  },
  {
    title: "Leverage",
    description:
      "Use community, tools, digital platforms, and long-term consistency to compound your progress."
  }
];

export const programs = [
  {
    title: "Identity Before Goals",
    eyebrow: "Foundation workshop",
    description:
      "A guided session for clarifying values, direction, and the kind of person your goals require you to become.",
    accent: "green"
  },
  {
    title: "Systems, Not Motivation",
    eyebrow: "Practical cohort",
    description:
      "A four-week rhythm for building routines, reminders, accountability, and weekly execution plans.",
    accent: "gold"
  },
  {
    title: "Skills That Increase Value",
    eyebrow: "Skill sprint",
    description:
      "A hands-on sprint for choosing one useful skill, practicing it, and producing proof of work.",
    accent: "blue"
  },
  {
    title: "Learning to Assets",
    eyebrow: "Creator lab",
    description:
      "A lab for turning notes and lessons into articles, portfolios, services, projects, and reusable resources.",
    accent: "coral"
  }
];

export const communityRhythm = [
  "Monday mindset note",
  "Wednesday discussion question",
  "Friday practical resource",
  "Weekend live session or recap"
];
