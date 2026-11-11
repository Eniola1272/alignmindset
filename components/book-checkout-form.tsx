"use client";

import { useActionState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  initiateAskForHelpPreorder,
  initiateBookBundleCheckout,
  type CheckoutState
} from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: CheckoutState = {
  ok: false,
  message: ""
};

type BookCheckoutFormProps = {
  product?: "bundle" | "ask-for-help";
  submitLabel?: string;
  disabledReason?: string;
};

export function BookCheckoutForm({
  product = "bundle",
  submitLabel,
  disabledReason
}: BookCheckoutFormProps) {
  const { showToast } = useToast();
  const checkoutAction =
    product === "ask-for-help"
      ? initiateAskForHelpPreorder
      : initiateBookBundleCheckout;
  const [state, formAction, pending] = useActionState(
    checkoutAction,
    initialState
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    showToast({
      title: state.ok ? "Checkout ready" : "Checkout needs attention",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });
  }, [showToast, state.message, state.ok]);

  return (
    <form className="bookCheckoutForm" action={formAction}>
      <label>
        Your name
        <input name="name" placeholder="Full name" required />
      </label>
      <label>
        Email for delivery
        <input name="email" type="email" placeholder="you@example.com" required />
      </label>
      <label>
        Phone number
        <input name="phone" type="tel" placeholder="+234..." />
      </label>
      <button
        className="primaryButton"
        type="submit"
        disabled={pending || Boolean(disabledReason)}
      >
        {pending
          ? "Opening checkout"
          : submitLabel ??
            (product === "ask-for-help"
              ? "Preorder Ask for Help"
              : "Get the 4-book bundle")}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      {disabledReason ? (
        <p className="checkoutSetupNote" role="status">
          {disabledReason}
        </p>
      ) : null}
    </form>
  );
}
