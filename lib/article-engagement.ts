import { createSupabaseServerClient } from "@/lib/supabase";

export type ArticleComment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

export type ArticleEngagement = {
  upvoteCount: number;
  commentCount: number;
  comments: ArticleComment[];
};

type CommentRow = {
  id: string;
  name: string;
  content: string;
  created_at: string;
};

export async function getArticleEngagement(
  postId: string
): Promise<ArticleEngagement> {
  const supabase = createSupabaseServerClient();

  if (!supabase || !postId) {
    return { upvoteCount: 0, commentCount: 0, comments: [] };
  }

  const [upvotesResult, commentsResult] = await Promise.all([
    supabase
      .from("post_upvotes")
      .select("id", { count: "exact", head: true })
      .eq("post_id", postId),
    supabase
      .from("post_comments")
      .select("id, name, content, created_at", { count: "exact" })
      .eq("post_id", postId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(50)
  ]);

  const rows = (commentsResult.data ?? []) as CommentRow[];

  return {
    upvoteCount: upvotesResult.count ?? 0,
    commentCount: commentsResult.count ?? 0,
    comments: rows.map((comment) => ({
      id: comment.id,
      name: comment.name,
      content: comment.content,
      createdAt: comment.created_at
    }))
  };
}
