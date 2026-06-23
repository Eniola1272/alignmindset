"use client";

import { useActionState } from "react";
import { Megaphone, Send } from "lucide-react";
import { sendBroadcast, type FormState } from "@/lib/actions";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function BroadcastForm() {
  const [state, formAction, pending] = useActionState(
    sendBroadcast,
    initialState
  );

  return (
    <form className="broadcastForm" action={formAction}>
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
      {state.message ? (
        <p className={state.ok ? "adminMessage success" : "adminMessage"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
