"use client";

import { useActionState, useMemo, useState } from "react";
import {
  FileText,
  Heading2,
  Image,
  MessageSquareQuote,
  Plus,
  Save,
  Trash2,
  Video
} from "lucide-react";
import { savePost, type FormState } from "@/lib/actions";
import type { AdminPost } from "@/lib/admin-data";
import type { ArticleBlock, ArticleCategory } from "@/lib/articles";

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

export function AdminEditor({ post }: { post?: AdminPost }) {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [blocks, setBlocks] = useState<EditableBlock[]>([
    ...(post?.body?.length ? post.body.map(blockWithId) : [createBlock("paragraph")])
  ]);

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
            <select name="category" defaultValue={post?.category ?? "Identity"}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
            Featured image URL
            <input
              name="featuredImageUrl"
              placeholder="https://..."
              defaultValue={post?.featuredImageUrl ?? ""}
            />
          </label>
          <label>
            Read minutes
            <input
              name="readMinutes"
              type="number"
              min="1"
              defaultValue={post?.readMinutes ?? 4}
            />
          </label>
          <label className="checkRow">
            <input name="featured" type="checkbox" defaultChecked={post?.featured} />
            Feature on homepage
          </label>
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
          {state.message ? (
            <p className={state.ok ? "adminMessage success" : "adminMessage"}>
              {state.message}
            </p>
          ) : null}
        </div>
      </aside>
    </form>
  );
}
