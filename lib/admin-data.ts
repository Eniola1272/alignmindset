import "server-only";

import type { ArticleBlock, ArticleCategory } from "@/lib/articles";
import { createSupabaseServerClient } from "@/lib/supabase";

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  status: "draft" | "review" | "published" | "archived";
  author: string;
  body: ArticleBlock[];
  featured: boolean;
  featuredImageUrl: string;
  readMinutes: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminSubscriber = {
  id: string;
  email: string;
  name: string;
  phone: string;
  source: string;
  newsletterOptIn: boolean;
  smsOptIn: boolean;
  subscribedAt: string;
};

export type AdminCampaign = {
  id: string;
  channel: "newsletter" | "sms";
  subject: string;
  message: string;
  recipientCount: number;
  status: string;
  createdAt: string;
};

export type AdminDashboardData = {
  posts: AdminPost[];
  subscribers: AdminSubscriber[];
  campaigns: AdminCampaign[];
  stats: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    subscribers: number;
    smsSubscribers: number;
    newsletterSubscribers: number;
  };
  error?: string;
};

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  status: AdminPost["status"];
  author: string;
  body: ArticleBlock[];
  featured: boolean;
  featured_image_url: string | null;
  read_minutes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type SubscriberRow = {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  source: string;
  newsletter_opt_in?: boolean | null;
  sms_opt_in?: boolean | null;
  subscribed_at: string;
};

type CampaignRow = {
  id: string;
  channel: "newsletter" | "sms";
  subject?: string | null;
  message: string;
  recipient_count: number;
  status: string;
  created_at: string;
};

const emptyData: AdminDashboardData = {
  posts: [],
  subscribers: [],
  campaigns: [],
  stats: {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    subscribers: 0,
    smsSubscribers: 0,
    newsletterSubscribers: 0
  }
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      ...emptyData,
      error: "Supabase service role credentials are missing."
    };
  }

  const [postsResult, subscribersResult, campaignsResult] = await Promise.all([
    supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, category, status, author, body, featured, featured_image_url, read_minutes, published_at, created_at, updated_at"
      )
      .order("updated_at", { ascending: false }),
    supabase
      .from("subscribers")
      .select(
        "id, email, name, phone, source, newsletter_opt_in, sms_opt_in, subscribed_at"
      )
      .order("subscribed_at", { ascending: false }),
    supabase
      .from("broadcast_campaigns")
      .select("id, channel, subject, message, recipient_count, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8)
  ]);

  if (postsResult.error) {
    return {
      ...emptyData,
      error: postsResult.error.message
    };
  }

  const posts = ((postsResult.data ?? []) as PostRow[]).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    status: post.status,
    author: post.author,
    body: post.body ?? [],
    featured: post.featured,
    featuredImageUrl: post.featured_image_url ?? "",
    readMinutes: post.read_minutes,
    publishedAt: post.published_at,
    createdAt: post.created_at,
    updatedAt: post.updated_at
  }));

  const subscribers = subscribersResult.error
    ? []
    : ((subscribersResult.data ?? []) as SubscriberRow[]).map((subscriber) => ({
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name ?? "",
        phone: subscriber.phone ?? "",
        source: subscriber.source,
        newsletterOptIn: subscriber.newsletter_opt_in ?? true,
        smsOptIn: subscriber.sms_opt_in ?? Boolean(subscriber.phone),
        subscribedAt: subscriber.subscribed_at
      }));

  const campaigns = campaignsResult.error
    ? []
    : ((campaignsResult.data ?? []) as CampaignRow[]).map((campaign) => ({
        id: campaign.id,
        channel: campaign.channel,
        subject: campaign.subject ?? "",
        message: campaign.message,
        recipientCount: campaign.recipient_count,
        status: campaign.status,
        createdAt: campaign.created_at
      }));

  return {
    posts,
    subscribers,
    campaigns,
    stats: {
      totalPosts: posts.length,
      publishedPosts: posts.filter((post) => post.status === "published").length,
      draftPosts: posts.filter((post) => post.status === "draft").length,
      subscribers: subscribers.length,
      smsSubscribers: subscribers.filter((subscriber) => subscriber.smsOptIn)
        .length,
      newsletterSubscribers: subscribers.filter(
        (subscriber) => subscriber.newsletterOptIn
      ).length
    },
    error:
      subscribersResult.error?.message || campaignsResult.error?.message || ""
  };
}
