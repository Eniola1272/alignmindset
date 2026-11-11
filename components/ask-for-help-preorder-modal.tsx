"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { ArrowRight, ShieldCheck, X } from "lucide-react";
import { BookCheckoutForm } from "@/components/book-checkout-form";
import { askForHelpPreorder, formatNaira } from "@/lib/book-bundle";

type AskForHelpPreorderModalProps = {
  buttonLabel?: string;
  buttonClassName?: string;
  paymentReady: boolean;
};

export function AskForHelpPreorderModal({
  buttonLabel = "Preorder the book",
  buttonClassName = "primaryButton",
  paymentReady
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
              aria-label="Close preorder form"
              onClick={() => setIsOpen(false)}
            >
              <X size={19} aria-hidden="true" />
            </button>

            <div className="preorderModalBook">
              <Image
                src={askForHelpPreorder.coverImage}
                alt="Ask for Help book cover"
                width={1024}
                height={1536}
                sizes="(max-width: 640px) 32vw, 180px"
              />
              <div>
                <span>Digital first-edition preorder</span>
                <h2 id={titleId}>{askForHelpPreorder.title}</h2>
                <p>{askForHelpPreorder.subtitle}</p>
                <strong>{formatNaira(askForHelpPreorder.price)}</strong>
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
                submitLabel={`Pay ${formatNaira(askForHelpPreorder.price)}`}
                disabledReason={
                  paymentReady
                    ? undefined
                    : "Checkout is awaiting the Flutterwave secret key."
                }
              />
              <small>
                Your preorder receipt and release updates will be sent to the
                email you provide.
              </small>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
