"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoaderCircle,
  MessageCircle,
  Send,
  Share2,
  ThumbsUp
} from "lucide-react";
import {
  submitArticleComment,
  toggleArticleUpvote,
  type CommentFormState
} from "@/lib/actions";
import type { ArticleComment } from "@/lib/article-engagement";
import { useToast } from "@/components/toast-provider";

const initialCommentState: CommentFormState = {
  ok: false,
  message: ""
};

const voterKeyStorage = "align-article-voter-key";
const upvotedPostsStorage = "align-upvoted-posts";
const upvoteSyncEvent = "align-article-upvote-changed";

type ArticleActionBarProps = {
  articleId: string;
  slug: string;
  title: string;
  initialUpvoteCount: number;
  commentCount: number;
  className?: string;
};

type ArticleEngagementProps = {
  articleId: string;
  slug: string;
  title: string;
  initialUpvoteCount: number;
  commentCount: number;
  comments: ArticleComment[];
};

function getVoterKey() {
  const stored = window.localStorage.getItem(voterKeyStorage);

  if (stored) {
    return stored;
  }

  const voterKey = crypto.randomUUID();
  window.localStorage.setItem(voterKeyStorage, voterKey);
  return voterKey;
}

function getUpvotedPosts() {
  try {
    const value = JSON.parse(
      window.localStorage.getItem(upvotedPostsStorage) ?? "[]"
    );
    return Array.isArray(value) ? (value as string[]) : [];
  } catch {
    return [];
  }
}

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(value));
}

export function ArticleActionBar({
  articleId,
  slug,
  title,
  initialUpvoteCount,
  commentCount,
  className = ""
}: ArticleActionBarProps) {
  const { showToast } = useToast();
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotePending, setUpvotePending] = useState(false);

  useEffect(() => {
    setUpvoteCount(initialUpvoteCount);
    setUpvoted(getUpvotedPosts().includes(slug));
  }, [initialUpvoteCount, slug]);

  useEffect(() => {
    function syncUpvote(event: Event) {
      const detail = (
        event as CustomEvent<{
          slug: string;
          count: number;
          upvoted: boolean;
        }>
      ).detail;

      if (detail.slug === slug) {
        setUpvoteCount(detail.count);
        setUpvoted(detail.upvoted);
      }
    }

    window.addEventListener(upvoteSyncEvent, syncUpvote);
    return () => window.removeEventListener(upvoteSyncEvent, syncUpvote);
  }, [slug]);

  async function handleUpvote() {
    setUpvotePending(true);
    const result = await toggleArticleUpvote(articleId, slug, getVoterKey());
    setUpvotePending(false);

    if (!result.ok) {
      showToast({
        title: "Upvote not saved",
        message: result.message,
        tone: "error"
      });
      return;
    }

    const savedPosts = new Set(getUpvotedPosts());
    if (result.upvoted) {
      savedPosts.add(slug);
    } else {
      savedPosts.delete(slug);
    }
    window.localStorage.setItem(
      upvotedPostsStorage,
      JSON.stringify([...savedPosts])
    );
    window.dispatchEvent(
      new CustomEvent(upvoteSyncEvent, {
        detail: {
          slug,
          count: result.count,
          upvoted: result.upvoted
        }
      })
    );
  }

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      showToast({
        title: "Link copied",
        message: "The article link is ready to share.",
        tone: "success"
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      showToast({
        title: "Could not share",
        message: "Copy the address from your browser and share it from there.",
        tone: "error"
      });
    }
  }

  return (
    <div
      className={`articleActions ${className}`.trim()}
      aria-label="Article actions"
    >
      <button
        className={upvoted ? "isUpvoted" : undefined}
        type="button"
        onClick={handleUpvote}
        disabled={upvotePending}
        aria-pressed={upvoted}
      >
        {upvotePending ? (
          <LoaderCircle className="spinIcon" size={18} aria-hidden="true" />
        ) : (
          <ThumbsUp size={18} aria-hidden="true" />
        )}
        <span>{upvoted ? "Upvoted" : "Upvote"}</span>
        <strong>{upvoteCount}</strong>
      </button>
      <a href="#comments">
        <MessageCircle size={18} aria-hidden="true" />
        <span>Comments</span>
        <strong>{commentCount}</strong>
      </a>
      <button type="button" onClick={handleShare}>
        <Share2 size={18} aria-hidden="true" />
        <span>Share</span>
      </button>
    </div>
  );
}

export function ArticleEngagement({
  articleId,
  slug,
  title,
  initialUpvoteCount,
  commentCount,
  comments
}: ArticleEngagementProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [commentState, commentAction, commentPending] = useActionState(
    submitArticleComment,
    initialCommentState
  );

  useEffect(() => {
    if (!commentState.submissionId) {
      return;
    }

    showToast({
      title: commentState.ok ? "Comment added" : "Comment not added",
      message: commentState.message,
      tone: commentState.ok ? "success" : "error"
    });

    if (commentState.ok) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [
    commentState.message,
    commentState.ok,
    commentState.submissionId,
    router,
    showToast
  ]);

  return (
    <section className="articleEngagement" aria-labelledby="comments-heading">
      <ArticleActionBar
        articleId={articleId}
        slug={slug}
        title={title}
        initialUpvoteCount={initialUpvoteCount}
        commentCount={commentCount}
      />

      <div className="commentsSection" id="comments">
        <div className="commentsHeading">
          <div>
            <span>Reader discussion</span>
            <h2 id="comments-heading">Join the conversation</h2>
          </div>
          <strong>{commentCount}</strong>
        </div>

        <form ref={formRef} className="commentForm" action={commentAction}>
          <input name="postId" type="hidden" value={articleId} />
          <input name="slug" type="hidden" value={slug} />
          <div className="commentIdentityFields">
            <label>
              Name
              <input
                name="name"
                type="text"
                autoComplete="name"
                maxLength={80}
                required
              />
            </label>
            <label>
              Email <span>Your email won't be displayed</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
          </div>
          <label>
            Comment
            <textarea
              name="comment"
              rows={5}
              maxLength={2000}
              placeholder="Add a thoughtful response..."
              required
            />
          </label>
          <label className="commentWebsiteField" aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <button className="primaryButton commentSubmit" disabled={commentPending}>
            {commentPending ? (
              <LoaderCircle className="spinIcon" size={18} aria-hidden="true" />
            ) : (
              <Send size={18} aria-hidden="true" />
            )}
            {commentPending ? "Posting" : "Post comment"}
          </button>
        </form>

        <div className="commentList">
          {comments.length ? (
            comments.map((comment) => (
              <article className="commentItem" key={comment.id}>
                <div className="commentAvatar" aria-hidden="true">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <header>
                    <strong>{comment.name}</strong>
                    <time dateTime={comment.createdAt}>
                      {formatCommentDate(comment.createdAt)}
                    </time>
                  </header>
                  <p>{comment.content}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="commentEmptyState">
              <MessageCircle size={22} aria-hidden="true" />
              <p>No comments yet. Add the first thoughtful response.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
