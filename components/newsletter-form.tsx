"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { subscribeToNewsletter, type FormState } from "@/lib/actions";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  return (
    <form className="newsletterForm" action={formAction}>
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
      {state.message ? (
        <p className={state.ok ? "formMessage success" : "formMessage"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
