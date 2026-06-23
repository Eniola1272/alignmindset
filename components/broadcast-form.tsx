"use client";

import { useActionState, useEffect, useRef } from "react";
import { Megaphone, Send } from "lucide-react";
import { sendBroadcast, type FormState } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function BroadcastForm() {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    sendBroadcast,
    initialState
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    showToast({
      title: state.ok ? "Update logged" : "Update not sent",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });

    if (state.ok) {
      formRef.current?.reset();
    }
  }, [showToast, state.message, state.ok]);

  return (
    <form ref={formRef} className="broadcastForm" action={formAction}>
      <div className="broadcastHeader">
        <Megaphone size={22} aria-hidden="true" />
        <div>
          <h2>Bulk updates</h2>
          <p>Send a newsletter or SMS update to opted-in subscribers.</p>
        </div>
      </div>
      <label>
        Channel
        <select name="channel" defaultValue="newsletter">
          <option value="newsletter">Newsletter</option>
          <option value="sms">SMS</option>
        </select>
      </label>
      <label>
        Subject
        <input name="subject" placeholder="Wednesday live session reminder" />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={7}
          placeholder="Write the update you want to send..."
          required
        />
      </label>
      <button className="primaryButton adminSaveButton" disabled={pending}>
        <Send size={17} aria-hidden="true" />
        {pending ? "Sending" : "Send / log update"}
      </button>
    </form>
  );
}
