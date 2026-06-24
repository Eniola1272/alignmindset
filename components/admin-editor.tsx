"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import {
  Eye,
  FileText,
  Heading2,
  Image,
  MessageSquareQuote,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  Video
} from "lucide-react";
import {
  savePost,
  uploadPostImage,
  type FormState
} from "@/lib/actions";
import type { AdminPost } from "@/lib/admin-data";
import type { ArticleBlock, ArticleCategory } from "@/lib/articles";
import { useToast } from "@/components/toast-provider";

type EditableBlock = ArticleBlock & {
  id: string;
};

const initialState: FormState = {
  ok: false,
  message: ""
};

const categories: ArticleCategory[] = [
  "Identity",
  "Systems",
  "Skills",
  "Action",
  "Assets",
  "Community"
];

function createBlock(type: ArticleBlock["type"]): EditableBlock {
  const id = crypto.randomUUID();

  if (type === "image") {
    return {
      id,
      type,
      url: "",
      alt: "",
      caption: ""
    };
  }

  if (type === "video") {
    return {
      id,
      type,
      url: "",
      caption: ""
    };
  }

  return {
    id,
    type,
    content: ""
  };
}

function blockWithId(block: ArticleBlock): EditableBlock {
  return {
    ...block,
    id: crypto.randomUUID()
  } as EditableBlock;
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

function getVideoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).at(0);
      return id ? `https://player.vimeo.com/video/${id}` : "";
    }

    return url;
  } catch {
    return "";
  }
}

export function AdminEditor({ post }: { post?: AdminPost }) {
  const { showToast } = useToast();
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    post?.featuredImageUrl ?? ""
  );
  const [ogImageUrl, setOgImageUrl] = useState(post?.ogImageUrl ?? "");
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<EditableBlock[]>([
    ...(post?.body?.length ? post.body.map(blockWithId) : [createBlock("paragraph")])
  ]);

  useEffect(() => {
    if (!state.message) {
      return;
    }

    showToast({
      title: state.ok ? "Article saved" : "Article not saved",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });
  }, [showToast, state.message, state.ok]);

  const serializedBlocks = useMemo(
    () =>
      JSON.stringify(
        blocks.map(({ id: _id, ...block }) => {
          if (
            block.type === "paragraph" ||
            block.type === "heading" ||
            block.type === "quote"
          ) {
            return {
              type: block.type,
              content: block.content
            };
          }

          if (block.type === "image") {
            return {
              type: "image",
              url: block.url,
              alt: block.alt,
              caption: block.caption
            };
          }

          if (block.type === "video") {
            return {
              type: "video",
              url: block.url,
              caption: block.caption
            };
          }

          return {
            type: "paragraph",
            content: ""
          };
        })
      ),
    [blocks]
  );

  function updateBlock(
    id: string,
    update: Partial<Record<"content" | "url" | "alt" | "caption", string>>
  ) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === id ? ({ ...block, ...update } as EditableBlock) : block
      )
    );
  }

  function addBlock(type: ArticleBlock["type"]) {
    setBlocks((current) => [...current, createBlock(type)]);
  }

  function removeBlock(id: string) {
    setBlocks((current) =>
      current.length === 1 ? current : current.filter((block) => block.id !== id)
    );
  }

  async function handleImageUpload(
    target: string,
    file: File | undefined,
    onUploaded: (url: string) => void
  ) {
    if (!file) {
      return;
    }

    setUploadingTarget(target);

    const formData = new FormData();
    formData.append("image", file);
    const result = await uploadPostImage(formData);

    setUploadingTarget(null);

    showToast({
      title: result.ok ? "Image uploaded" : "Upload failed",
      message: result.message,
      tone: result.ok ? "success" : "error"
    });

    if (result.ok && result.url) {
      onUploaded(result.url);
    }
  }

  return (
    <form className="adminComposer" action={formAction}>
      <input name="body" type="hidden" value={serializedBlocks} />

      <section className="composerMain" aria-label="Article editor">
        <input
          className="titleInput"
          name="title"
          placeholder="Article title"
          value={title}
          onChange={(event) => {
            const nextTitle = event.target.value;
            setTitle(nextTitle);

            if (!slug) {
              setSlug(makeSlug(nextTitle));
            }
          }}
          required
        />
        <textarea
          className="excerptInput"
          name="excerpt"
          placeholder="A sharp one-sentence promise for the reader..."
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          required
        />

        <div className="blockToolbar" aria-label="Add content block">
          <button type="button" onClick={() => addBlock("paragraph")}>
            <FileText size={17} aria-hidden="true" />
            Text
          </button>
          <button type="button" onClick={() => addBlock("heading")}>
            <Heading2 size={17} aria-hidden="true" />
            Heading
          </button>
          <button type="button" onClick={() => addBlock("quote")}>
            <MessageSquareQuote size={17} aria-hidden="true" />
            Quote
          </button>
          <button type="button" onClick={() => addBlock("image")}>
            <Image size={17} aria-hidden="true" />
            Image
          </button>
          <button type="button" onClick={() => addBlock("video")}>
            <Video size={17} aria-hidden="true" />
            Video
          </button>
        </div>

        <div className="editorBlocks">
          {blocks.map((block, index) => (
            <div className="editorBlock" key={block.id}>
              <div className="blockHandle">
                <span>{block.type}</span>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  aria-label={`Remove block ${index + 1}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>

              {block.type === "paragraph" ? (
                <textarea
                  placeholder="Write the next paragraph..."
                  rows={5}
                  value={block.content}
                  onChange={(event) =>
                    updateBlock(block.id, { content: event.target.value })
                  }
                />
              ) : null}

              {block.type === "heading" ? (
                <input
                  placeholder="Section heading"
                  value={block.content}
                  onChange={(event) =>
                    updateBlock(block.id, { content: event.target.value })
                  }
                />
              ) : null}

              {block.type === "quote" ? (
                <textarea
                  placeholder="Pull quote or memorable line..."
                  rows={3}
                  value={block.content}
                  onChange={(event) =>
                    updateBlock(block.id, { content: event.target.value })
                  }
                />
              ) : null}

              {block.type === "image" ? (
                <div className="mediaInputs">
                  <input
                    placeholder="Image URL"
                    value={block.url}
                    onChange={(event) =>
                      updateBlock(block.id, { url: event.target.value })
                    }
                  />
                  <label className="uploadInline">
                    <Upload size={16} aria-hidden="true" />
                    {uploadingTarget === block.id ? "Uploading" : "Upload image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(
                          block.id,
                          event.target.files?.[0],
                          (url) => updateBlock(block.id, { url })
                        )
                      }
                    />
                  </label>
                  <input
                    placeholder="Alt text"
                    value={block.alt}
                    onChange={(event) =>
                      updateBlock(block.id, { alt: event.target.value })
                    }
                  />
                  <input
                    placeholder="Caption"
                    value={block.caption}
                    onChange={(event) =>
                      updateBlock(block.id, { caption: event.target.value })
                    }
                  />
                  {block.url ? (
                    <img
                      className="editorImagePreview"
                      src={block.url}
                      alt={block.alt || ""}
                    />
                  ) : null}
                </div>
              ) : null}

              {block.type === "video" ? (
                <div className="mediaInputs">
                  <input
                    placeholder="YouTube, Vimeo, or embed URL"
                    value={block.url}
                    onChange={(event) =>
                      updateBlock(block.id, { url: event.target.value })
                    }
                  />
                  <input
                    placeholder="Caption"
                    value={block.caption}
                    onChange={(event) =>
                      updateBlock(block.id, { caption: event.target.value })
                    }
                  />
                  {getVideoEmbedUrl(block.url) ? (
                    <div className="editorVideoPreview">
                      <iframe
                        src={getVideoEmbedUrl(block.url)}
                        title={block.caption || "Video preview"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <aside className="composerSidebar">
        <div className="sidebarPanel">
          <h2>Publishing</h2>
          <label>
            Slug
            <input
              name="slug"
              value={slug}
              onChange={(event) => setSlug(makeSlug(event.target.value))}
              required
            />
          </label>
          <label>
            Category
            <input
              name="categoryLabel"
              list="article-categories"
              defaultValue={post?.categoryLabel ?? post?.category ?? "Identity"}
              placeholder="Mindset, Career, Faith, Skills..."
            />
            <datalist id="article-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label>
            Tags
            <input
              name="tags"
              placeholder="discipline, confidence, career"
              defaultValue={post?.tags.join(", ") ?? ""}
            />
          </label>
          <label>
            Status
            <select name="status" defaultValue={post?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <label>
            Author
            <input name="author" defaultValue={post?.author ?? "Align Mindset Team"} />
          </label>
          <label>
            Schedule publish time
            <input
              name="scheduledFor"
              type="datetime-local"
              defaultValue={toDateTimeLocal(post?.scheduledFor)}
            />
          </label>
          <label>
            Featured image URL
            <input
              name="featuredImageUrl"
              placeholder="https://..."
              value={featuredImageUrl}
              onChange={(event) => setFeaturedImageUrl(event.target.value)}
            />
          </label>
          <label className="uploadInline uploadField">
            <Upload size={16} aria-hidden="true" />
            {uploadingTarget === "featured"
              ? "Uploading"
              : "Upload featured image"}
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleImageUpload(
                  "featured",
                  event.target.files?.[0],
                  setFeaturedImageUrl
                )
              }
            />
          </label>
          {featuredImageUrl ? (
            <img
              className="editorImagePreview sidebarImagePreview"
              src={featuredImageUrl}
              alt=""
            />
          ) : null}
          <label>
            Read minutes
            <input
              name="readMinutes"
              type="number"
              min="1"
              defaultValue={post?.readMinutes ?? 4}
            />
          </label>
          <div className="sidebarDivider">
            <Search size={16} aria-hidden="true" />
            <span>SEO</span>
          </div>
          <label>
            Meta title
            <input
              name="metaTitle"
              placeholder="Defaults to article title"
              defaultValue={post?.metaTitle ?? ""}
            />
          </label>
          <label>
            Meta description
            <textarea
              name="metaDescription"
              rows={3}
              placeholder="Defaults to article excerpt"
              defaultValue={post?.metaDescription ?? ""}
            />
          </label>
          <label>
            OG image URL
            <input
              name="ogImageUrl"
              placeholder="Defaults to featured image"
              value={ogImageUrl}
              onChange={(event) => setOgImageUrl(event.target.value)}
            />
          </label>
          <label className="uploadInline uploadField">
            <Upload size={16} aria-hidden="true" />
            {uploadingTarget === "og" ? "Uploading" : "Upload OG image"}
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleImageUpload("og", event.target.files?.[0], setOgImageUrl)
              }
            />
          </label>
          <label className="checkRow">
            <input name="featured" type="checkbox" defaultChecked={post?.featured} />
            Feature on homepage
          </label>
          {slug ? (
            <Link className="secondaryButton previewButton" href={`/blog/preview/${slug}`}>
              <Eye size={17} aria-hidden="true" />
              Preview draft
            </Link>
          ) : null}
          <button className="primaryButton adminSaveButton" disabled={pending}>
            {pending ? (
              <>
                <Plus size={17} aria-hidden="true" />
                Saving
              </>
            ) : (
              <>
                <Save size={17} aria-hidden="true" />
                Save article
              </>
            )}
          </button>
        </div>
      </aside>
    </form>
  );
}
