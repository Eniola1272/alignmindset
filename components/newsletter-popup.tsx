"use client";

import { useCallback, useEffect, useState } from "react";
import { BookOpenCheck, X } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

const storageKey = "align-newsletter-popup-dismissed";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  const closePopup = useCallback(() => {
    window.localStorage.setItem(storageKey, "true");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem(storageKey)) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 10000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      className="newsletterPopupOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <section
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        className="newsletterPopup"
        role="dialog"
      >
        <button
          aria-label="Close newsletter popup"
          className="modalClose"
          onClick={closePopup}
          type="button"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="newsletterPopupContent">
          <div className="ebookCoverPlaceholder" aria-hidden="true">
            <BookOpenCheck size={20} />
            <span>Free ebook</span>
          </div>
          <h2 id="newsletter-popup-title">
            Get the free ebook.
          </h2>
          <p>
            Subscribe to the Align Mindset newsletter and receive{" "}
            <strong>How to Create Value When You Do Not Have Capital</strong>,
            plus practical notes on discipline, skills, business, money, and value
            creation.
          </p>
          <NewsletterForm
            className="newsletterPopupForm"
            label="Send me the ebook and newsletter"
            submitLabel="Get the ebook"
            onSuccess={closePopup}
          />
        </div>
      </section>
    </div>
  );
}
