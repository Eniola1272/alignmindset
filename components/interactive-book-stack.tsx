"use client";

import { useState } from "react";

type InteractiveBookStackProps = {
  books: Array<{
    title: string;
    tag: string;
    coverImage?: string;
  }>;
  bundlePrice: string;
  totalValue: string;
};

export function InteractiveBookStack({
  books,
  bundlePrice,
  totalValue
}: InteractiveBookStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="booksHeroVisual" aria-label="Interactive book bundle preview">
      <div className="bundlePriceBadge">
        <small>Bundle offer</small>
        <strong>{bundlePrice}</strong>
        <span>
          <s>{totalValue}</s> total value
        </span>
      </div>
      <p className="bookStackHint">Tap a cover to bring it forward</p>
      {books.map((book, index) => {
        const slot = ((index - activeIndex + books.length) % books.length) + 1;

        return (
          <button
            className={`bookCoverMock bookCoverMock-${slot} bookTheme-${
              index + 1
            } ${book.coverImage ? "hasCoverImage" : ""} ${
              index === activeIndex ? "isActive" : ""
            }`}
            key={book.title}
            type="button"
            aria-pressed={index === activeIndex}
            aria-label={`Bring ${book.title} to the front`}
            onClick={() => setActiveIndex(index)}
          >
            {book.coverImage ? (
              <img src={book.coverImage} alt="" aria-hidden="true" />
            ) : (
              <>
                <span>{book.tag}</span>
                <h2>{book.title}</h2>
                <p>Align Mindset</p>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
