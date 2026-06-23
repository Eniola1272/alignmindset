"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { subscribeToNewsletter, type FormState } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function NewsletterForm() {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    showToast({
      title: state.ok ? "You are on the list" : "Signup needs a check",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });

    if (state.ok) {
      formRef.current?.reset();
    }
  }, [showToast, state.message, state.ok]);

  return (
    <form ref={formRef} className="newsletterForm" action={formAction}>
      <label htmlFor="email">Get practical growth notes</label>
      <input name="name" type="text" placeholder="Your name" />
      <div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <input name="phone" type="tel" placeholder="Phone for SMS updates" />
        <button type="submit" disabled={pending} aria-label="Subscribe">
          <Send size={18} aria-hidden="true" />
          <span>{pending ? "Joining" : "Join"}</span>
        </button>
      </div>
    </form>
  );
}
