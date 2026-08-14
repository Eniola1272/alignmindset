"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { Send } from "lucide-react";
import { subscribeToNewsletter, type FormState } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: FormState = {
  ok: false,
  message: ""
};

type NewsletterFormProps = {
  className?: string;
  label?: string;
  submitLabel?: string;
  onSuccess?: () => void;
};

export function NewsletterForm({
  className = "",
  label = "Get practical growth notes",
  submitLabel = "Join",
  onSuccess
}: NewsletterFormProps) {
  const { showToast } = useToast();
  const emailId = useId();
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
      onSuccess?.();
    }
  }, [onSuccess, showToast, state.message, state.ok]);

  return (
    <form
      ref={formRef}
      className={`newsletterForm ${className}`.trim()}
      action={formAction}
    >
      <label htmlFor={emailId}>{label}</label>
      <input name="name" type="text" placeholder="Your name" />
      <div>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="Email Address"
          required
        />
        <input name="phone" type="tel" placeholder="Phone Number" />
        <button className="flex items-center gap-2" type="submit" disabled={pending} aria-label="Subscribe">
          <span>{pending ? "Joining" : submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
