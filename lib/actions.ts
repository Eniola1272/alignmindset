"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminCookie,
  isAdminAuthenticated,
  setAdminCookie
} from "@/lib/admin";
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
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

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
      name,
      phone,
      newsletter_opt_in: true,
      sms_opt_in: Boolean(phone),
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
  const featuredImageUrl = String(formData.get("featuredImageUrl") ?? "").trim();
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
      featured_image_url: featuredImageUrl || null,
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

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");

  return {
    ok: true,
    message:
      status === "published"
        ? `Published "${title}" at /blog/${slug}.`
        : `Saved "${title}" as ${status}.`
  };
}

export async function deletePost(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=session");
  }

  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const supabase = createSupabaseServerClient();

  if (!id || !supabase) {
    redirect("/admin?error=delete");
  }

  await supabase.from("posts").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/admin");
  redirect("/admin?deleted=1");
}

export async function sendBroadcast(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(await isAdminAuthenticated())) {
    return {
      ok: false,
      message: "Your admin session expired. Sign in again to send updates."
    };
  }

  const channel = String(formData.get("channel") ?? "newsletter");
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (channel !== "newsletter" && channel !== "sms") {
    return {
      ok: false,
      message: "Choose newsletter or SMS."
    };
  }

  if (!message || (channel === "newsletter" && !subject)) {
    return {
      ok: false,
      message: "Add a subject for newsletters and a message for every update."
    };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: false,
      message: "Supabase service role credentials are required."
    };
  }

  const { data: subscribers, error: subscriberError } = await supabase
    .from("subscribers")
    .select("email, phone, name, newsletter_opt_in, sms_opt_in")
    .eq(channel === "newsletter" ? "newsletter_opt_in" : "sms_opt_in", true);

  if (subscriberError) {
    return {
      ok: false,
      message: subscriberError.message
    };
  }

  const recipients = (subscribers ?? []).filter((subscriber) =>
    channel === "newsletter" ? subscriber.email : subscriber.phone
  );
  const webhookUrl = process.env.BROADCAST_WEBHOOK_URL;
  let status = webhookUrl ? "sent_to_webhook" : "saved_no_provider";

  if (webhookUrl && recipients.length) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.BROADCAST_WEBHOOK_SECRET
          ? {
              Authorization: `Bearer ${process.env.BROADCAST_WEBHOOK_SECRET}`
            }
          : {})
      },
      body: JSON.stringify({
        channel,
        subject,
        message,
        recipients
      })
    });

    if (!response.ok) {
      status = "webhook_failed";
    }
  }

  const { error: campaignError } = await supabase
    .from("broadcast_campaigns")
    .insert({
      channel,
      subject: subject || null,
      message,
      recipient_count: recipients.length,
      status,
      provider: webhookUrl ? "webhook" : "none"
    });

  if (campaignError) {
    return {
      ok: false,
      message: campaignError.message
    };
  }

  revalidatePath("/admin");

  if (!webhookUrl) {
    return {
      ok: true,
      message: `Saved ${channel} update for ${recipients.length} recipients. Add BROADCAST_WEBHOOK_URL to actually send.`
    };
  }

  if (status === "webhook_failed") {
    return {
      ok: false,
      message: `The campaign was logged, but the webhook returned an error for ${recipients.length} recipients.`
    };
  }

  return {
    ok: true,
    message: `Sent ${channel} update to the configured webhook for ${recipients.length} recipients.`
  };
}
