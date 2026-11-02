"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { subscribeToNewsletter, type FormState } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function ModernCtaForm() {
  const { showToast } = useToast();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    showToast({
      title: state.ok ? "You're all set" : "Check your input",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });

    if (state.ok) {
      formRef.current?.reset();
    }
  }, [showToast, state.message, state.ok]);

  return (
    <form ref={formRef} action={formAction} className="modernVerticalForm">
      <div className="formFieldRow">
        <label htmlFor={nameId} className="sr-only">Your Name</label>
        <input
          id={nameId}
          name="name"
          type="text"
          placeholder="Your full name"
          className="modernSingleBorderInput"
          autoComplete="name"
        />
      </div>

      <div className="formFieldRow">
        <label htmlFor={emailId} className="sr-only">Email Address</label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="Email address (e.g. name@domain.com)"
          required
          className="modernSingleBorderInput"
          autoComplete="email"
        />
      </div>

      <div className="formFieldRow">
        <label htmlFor={phoneId} className="sr-only">Phone Number (Optional)</label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          placeholder="Phone number (optional for WhatsApp updates)"
          className="modernSingleBorderInput"
          autoComplete="tel"
        />
      </div>

      <div className="formFieldRow">
        <button
          type="submit"
          disabled={pending}
          className="modernFormSubmitBtn"
          aria-label="Get the free ebook and newsletter"
        >
          <span>{pending ? "Sending..." : "Get the Free Ebook & Notes"}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      <p className="formGuaranteeText">
        <CheckCircle2 size={13} aria-hidden="true" />
        <span>Strict privacy. No spam. One-click unsubscribe anytime.</span>
      </p>
    </form>
  );
}

