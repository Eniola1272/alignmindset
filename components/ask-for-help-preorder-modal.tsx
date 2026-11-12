"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { ArrowRight, ShieldCheck, X } from "lucide-react";
import { BookCheckoutForm } from "@/components/book-checkout-form";
import { askForHelpBook, formatNaira } from "@/lib/book-bundle";

type AskForHelpPreorderModalProps = {
  buttonLabel?: string;
  buttonClassName?: string;
  checkoutReady: boolean;
  disabledReason?: string;
};

export function AskForHelpPreorderModal({
  buttonLabel = "Buy the digital book",
  buttonClassName = "primaryButton",
  checkoutReady,
  disabledReason
}: AskForHelpPreorderModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={buttonClassName}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonLabel}
        <ArrowRight size={17} aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          className="preorderModalOverlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            className="preorderModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <button
              className="preorderModalClose"
              type="button"
              aria-label="Close checkout form"
              onClick={() => setIsOpen(false)}
            >
              <X size={19} aria-hidden="true" />
            </button>

            <div className="preorderModalBook">
              <Image
                src={askForHelpBook.coverImage}
                alt="Ask for Help book cover"
                width={1024}
                height={1536}
                sizes="(max-width: 640px) 32vw, 180px"
              />
              <div>
                <span>Digital edition · Instant download</span>
                <h2 id={titleId}>{askForHelpBook.title}</h2>
                <p>{askForHelpBook.subtitle}</p>
                <div className="preorderModalPrice">
                  <s>{formatNaira(askForHelpBook.regularPrice)}</s>
                  <strong>{formatNaira(askForHelpBook.price)}</strong>
                </div>
              </div>
            </div>

            <div className="preorderModalForm">
              <div className="preorderSecureNote">
                <ShieldCheck size={17} aria-hidden="true" />
                <span>
                  Your card or transfer details are handled securely by
                  Flutterwave.
                </span>
              </div>
              <BookCheckoutForm
                product="ask-for-help"
                submitLabel={`Pay ${formatNaira(askForHelpBook.price)}`}
                disabledReason={
                  checkoutReady
                    ? undefined
                    : disabledReason || "Checkout is not ready yet."
                }
              />
              <small>
                Your download appears after payment and is also sent to the
                email you provide.
              </small>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
