"use server";

import { redirect } from "next/navigation";
import { clearAdminCookie, isAdminAuthenticated, setAdminCookie } from "@/lib/admin";
import type { ArticleBlock, ArticleCategory } from "@/lib/articles";
import { createSupabaseServerClient } from "@/lib/supabase";

export type FormState = {
  ok: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return {
      ok: false,
      message: "Add a valid email so we know where to send the notes."
    };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: true,
      message:
        "You are on the list locally. Add Supabase keys to store subscribers."
    };
  }

  const { error } = await supabase.from("subscribers").upsert(
    {
      email,
      source: "website",
      subscribed_at: new Date().toISOString()
    },
    { onConflict: "email" }
  );

  if (error) {
    return {
      ok: false,
      message: "Something blocked the signup. Please try again."
    };
  }

  return {
    ok: true,
    message: "You are in. Expect practical notes, not inbox noise."
  };
}

const categories: ArticleCategory[] = [
  "Identity",
  "Systems",
  "Skills",
  "Action",
  "Assets",
  "Community"
];

const statuses = ["draft", "review", "published", "archived"] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseBlocks(value: FormDataEntryValue | null): ArticleBlock[] {
  if (typeof value !== "string") {
    return [];
  }

  try {
    const blocks = JSON.parse(value) as unknown;

    if (!Array.isArray(blocks)) {
      return [];
    }

    const parsedBlocks = blocks.map<ArticleBlock | null>((block) => {
        if (!block || typeof block !== "object") {
          return null;
        }

        const item = block as Record<string, unknown>;

        if (
          (item.type === "paragraph" ||
            item.type === "heading" ||
            item.type === "quote") &&
          typeof item.content === "string" &&
          item.content.trim()
        ) {
          return {
            type: item.type,
            content: item.content.trim()
          } satisfies ArticleBlock;
        }

        if (
          item.type === "image" &&
          typeof item.url === "string" &&
          item.url.trim()
        ) {
          return {
            type: "image",
            url: item.url.trim(),
            alt: typeof item.alt === "string" ? item.alt.trim() : "",
            caption:
              typeof item.caption === "string" ? item.caption.trim() : ""
          } satisfies ArticleBlock;
        }

        if (
          item.type === "video" &&
          typeof item.url === "string" &&
          item.url.trim()
        ) {
          return {
            type: "video",
            url: item.url.trim(),
            caption:
              typeof item.caption === "string" ? item.caption.trim() : ""
          } satisfies ArticleBlock;
        }

        return null;
      });

    return parsedBlocks.filter(
      (block): block is ArticleBlock => Boolean(block)
    );
  } catch {
    return [];
  }
}

export async function loginToAdmin(formData: FormData) {
  const secret = String(formData.get("secret") ?? "");

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    redirect("/admin?error=1");
  }

  await setAdminCookie();
  redirect("/admin");
}

export async function logoutFromAdmin() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function savePost(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(await isAdminAuthenticated())) {
    return {
      ok: false,
      message: "Your admin session expired. Sign in again to publish."
    };
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? title));
  const author =
    String(formData.get("author") ?? "").trim() || "Align Mindset Team";
  const category = String(formData.get("category") ?? "Identity");
  const status = String(formData.get("status") ?? "draft");
  const readMinutes = Number(formData.get("readMinutes") ?? 4);
  const featured = formData.get("featured") === "on";
  const body = parseBlocks(formData.get("body"));

  if (!title || !excerpt || !slug) {
    return {
      ok: false,
      message: "Title, slug, and excerpt are required."
    };
  }

  if (!categories.includes(category as ArticleCategory)) {
    return {
      ok: false,
      message: "Choose a valid category."
    };
  }

  if (!statuses.includes(status as (typeof statuses)[number])) {
    return {
      ok: false,
      message: "Choose a valid publishing status."
    };
  }

  if (!body.length) {
    return {
      ok: false,
      message: "Add at least one text, image, quote, or video block."
    };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: false,
      message:
        "Supabase service role credentials are required to save posts from admin."
    };
  }

  const { error } = await supabase.from("posts").upsert(
    {
      slug,
      title,
      excerpt,
      category,
      status,
      author,
      body,
      featured,
      read_minutes: Number.isFinite(readMinutes) ? readMinutes : 4,
      published_at: status === "published" ? new Date().toISOString() : null
    },
    { onConflict: "slug" }
  );

  if (error) {
    return {
      ok: false,
      message: error.message
    };
  }

  return {
    ok: true,
    message:
      status === "published"
        ? `Published "${title}" at /blog/${slug}.`
        : `Saved "${title}" as ${status}.`
  };
}
