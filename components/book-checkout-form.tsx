"use client";

import { useActionState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  initiateBookBundleCheckout,
  type CheckoutState
} from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: CheckoutState = {
  ok: false,
  message: ""
};

export function BookCheckoutForm() {
  const { showToast } = useToast();
  const [state, formAction, pending] = useActionState(
    initiateBookBundleCheckout,
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
      <button className="primaryButton" type="submit" disabled={pending}>
        {pending ? "Opening checkout" : "Get the 4-book bundle"}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
