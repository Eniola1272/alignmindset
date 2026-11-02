"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { subscribeToNewsletter, type FormState } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function JcNewsletterForm() {
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
      title: state.ok ? "You are on the list" : "Check your details",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });

    if (state.ok) {
      formRef.current?.reset();
    }
  }, [showToast, state.message, state.ok]);

  return (
    <form ref={formRef} action={formAction} className="jcForm">
      <div className="jcFormField">
        <label htmlFor={nameId} className="sr-only">Your Name</label>
        <input
          id={nameId}
          name="name"
          type="text"
          placeholder="First name"
          className="jcInput"
          autoComplete="given-name"
        />
      </div>

      <div className="jcFormField">
        <label htmlFor={emailId} className="sr-only">Email Address</label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="Your best email address"
          required
          className="jcInput"
          autoComplete="email"
        />
      </div>

      <div className="jcFormField">
        <label htmlFor={phoneId} className="sr-only">Phone Number (Optional)</label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          placeholder="Phone number (optional for WhatsApp updates)"
          className="jcInput"
          autoComplete="tel"
        />
      </div>

      <div className="jcFormField">
        <button
          type="submit"
          disabled={pending}
          className="jcSubmitBtn"
          aria-label="Subscribe to the Align Dispatch"
        >
          <span>{pending ? "Subscribing..." : "Subscribe to the Dispatch"}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      <p className="jcFormGuarantee">
        <Check size={13} aria-hidden="true" />
        <span>Strict privacy. Free weekly reading. Unsubscribe anytime with one click.</span>
      </p>
    </form>
  );
}

