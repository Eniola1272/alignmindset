import { Fragment } from "react";
import type { ArticleBlock } from "@/lib/articles";

function getParagraphs(content: string) {
  return content
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function getVideoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).at(0);
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }

    return url;
  } catch {
    return "";
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="articleBody">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return <h2 key={`${block.type}-${index}`}>{block.content}</h2>;
        }

        if (block.type === "quote") {
          return <blockquote key={`${block.type}-${index}`}>{block.content}</blockquote>;
        }

        if (block.type === "image") {
          return (
            <figure className="articleMedia" key={`${block.type}-${index}`}>
              <img src={block.url} alt={block.alt || ""} />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        if (block.type === "video") {
          const embedUrl = getVideoEmbedUrl(block.url);

          return (
            <figure className="articleMedia" key={`${block.type}-${index}`}>
              <div className="videoFrame">
                <iframe
                  src={embedUrl}
                  title={block.caption || "Article video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        const paragraphs = getParagraphs(block.content);

        return (
          <Fragment key={`${block.type}-${index}`}>
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${block.type}-${index}-${paragraphIndex}`}>
                {paragraph}
              </p>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
