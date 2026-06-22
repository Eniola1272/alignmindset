import { createSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase";

export type ArticleCategory =
  | "Identity"
  | "Systems"
  | "Skills"
  | "Action"
  | "Assets"
  | "Community";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  publishedAt: string;
  readMinutes: number;
  author: string;
  featured: boolean;
  body: string[];
};

type SupabasePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  published_at: string;
  read_minutes: number;
  author: string;
  featured: boolean;
  body: string[];
};

export const categories: ArticleCategory[] = [
  "Identity",
  "Systems",
  "Skills",
  "Action",
  "Assets",
  "Community"
];

export const seedArticles: Article[] = [
  {
    id: "seed-1",
    slug: "align-your-identity-before-your-goals",
    title: "Align Your Identity Before Your Goals",
    excerpt:
      "Goals become easier to sustain when your daily choices match who you are intentionally becoming.",
    category: "Identity",
    publishedAt: "2026-06-18",
    readMinutes: 5,
    author: "Align Mindset Team",
    featured: true,
    body: [
      "Most people begin with a target: pass the exam, earn more, build a business, become disciplined. Targets matter, but they often collapse when they are not supported by identity.",
      "Identity asks a deeper question: who must I become to make this goal normal? A person who studies consistently does not only need a timetable. They need to see themselves as someone who protects learning time even when the mood changes.",
      "This is why Align Mindset starts with identity. When people are clear about the kind of person they are becoming, systems become easier to build, skills become easier to practice, and action becomes less dramatic.",
      "Try this: write one goal, then write the identity behind it. Do not stop at what you want. Name the person who can sustain it."
    ]
  },
  {
    id: "seed-2",
    slug: "build-systems-not-motivation",
    title: "Build Systems, Not Motivation",
    excerpt:
      "A simple guide to routines, reminders, environments, and accountability that keep you moving.",
    category: "Systems",
    publishedAt: "2026-06-14",
    readMinutes: 6,
    author: "Align Mindset Team",
    featured: true,
    body: [
      "Motivation is useful, but it is not a reliable operating system. It rises and falls with mood, pressure, energy, and the people around you.",
      "A system is different. A system is the structure that tells you what happens next even when you are not inspired. It can be a study block, a weekly review, a mentor check-in, a quiet workspace, or a phone reminder.",
      "Start small. Choose one goal and give it a weekly rhythm. Decide the day, time, place, and next action. Then add accountability: someone or somewhere that expects your progress.",
      "The point is not to remove effort. The point is to reduce confusion. Once the next action is obvious, execution becomes much lighter."
    ]
  },
  {
    id: "seed-3",
    slug: "skills-that-increase-your-value",
    title: "Skills That Increase Your Value",
    excerpt:
      "How to choose a practical skill, practice deliberately, and create proof that opens doors.",
    category: "Skills",
    publishedAt: "2026-06-10",
    readMinutes: 7,
    author: "Align Mindset Team",
    featured: true,
    body: [
      "Skills create options. They help you contribute, earn, solve problems, communicate better, and become useful in rooms you want to enter.",
      "The best skill to start with is usually not the trendiest one. It is the skill that fits your direction, solves a real problem, and can be practiced publicly enough to create proof.",
      "Pick one skill for the next thirty days. Learn the basics, practice daily or weekly, and publish evidence: a design, article, spreadsheet, landing page, presentation, analysis, or service offer.",
      "Progress becomes more believable when it leaves artifacts behind."
    ]
  },
  {
    id: "seed-4",
    slug: "from-learning-to-assets",
    title: "From Learning to Assets",
    excerpt:
      "Turn books, videos, and sessions into notes, portfolios, projects, content, services, or products.",
    category: "Assets",
    publishedAt: "2026-06-06",
    readMinutes: 5,
    author: "Align Mindset Team",
    featured: false,
    body: [
      "Learning is powerful, but unused learning fades quickly. The question after every lesson should be: what can this become?",
      "A lesson can become a note. A note can become an article. An article can become a talk. A talk can become a workshop. A workshop can become a product or a service.",
      "This does not mean monetizing everything. It means respecting your learning enough to shape it into something that can help you and others again.",
      "After your next book, video, or meeting, create one asset within forty-eight hours. Keep it simple. Make the lesson useful."
    ]
  },
  {
    id: "seed-5",
    slug: "how-to-revive-a-quiet-community",
    title: "How to Revive a Quiet Community",
    excerpt:
      "A practical 14-day rhythm for reactivating a group without forcing everyone to talk at once.",
    category: "Community",
    publishedAt: "2026-06-02",
    readMinutes: 8,
    author: "Align Mindset Team",
    featured: false,
    body: [
      "A quiet group is not a failed group. Most communities have a small active core and a much larger silent audience. The goal is to create rhythm, not noise.",
      "Start by reintroducing the vision. Tell members what the group is for, what kind of value is coming, and how they can participate without pressure.",
      "Then run a simple poll. Ask what they need most: reading, discipline, career growth, skills, entrepreneurship, faith, or mindset. Let the answers shape your first month.",
      "Finally, create a predictable weekly rhythm. People respond better when they know what to expect and when to show up."
    ]
  },
  {
    id: "seed-6",
    slug: "weekly-action-challenges-that-work",
    title: "Weekly Action Challenges That Work",
    excerpt:
      "End every meeting with one clear action so the community learns by doing, not just listening.",
    category: "Action",
    publishedAt: "2026-05-29",
    readMinutes: 4,
    author: "Align Mindset Team",
    featured: false,
    body: [
      "Good teaching gives people clarity. Good challenges help people turn clarity into movement.",
      "Every Align Mindset session should end with one action that members can complete within a week. It should be specific, small enough to start, and meaningful enough to build momentum.",
      "For example: write one skill you want to build, why it matters, and the exact hour you will dedicate to it this week.",
      "The challenge is the bridge between inspiration and transformation."
    ]
  }
];

function mapPost(post: SupabasePost): Article {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.published_at,
    readMinutes: post.read_minutes,
    author: post.author,
    featured: post.featured,
    body: post.body
  };
}

export async function getArticles(): Promise<Article[]> {
  if (!hasSupabaseConfig()) {
    return seedArticles;
  }

  const supabase = createSupabaseBrowserClient();

  if (!supabase) {
    return seedArticles;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, category, published_at, read_minutes, author, featured, body"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data?.length) {
    return seedArticles;
  }

  return (data as SupabasePost[]).map(mapPost);
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getFeaturedArticles() {
  const articles = await getArticles();
  return articles.filter((article) => article.featured).slice(0, 4);
}
