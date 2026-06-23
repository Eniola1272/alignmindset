"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Send, X } from "lucide-react";
import { submitVolunteerApplication, type FormState } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

const initialState: FormState = {
  ok: false,
  message: ""
};

export function VolunteerApplicationModal() {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [state, formAction, pending] = useActionState(
    submitVolunteerApplication,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) {
      return;
    }

    showToast({
      title: state.ok ? "Application received" : "Check the form",
      message: state.message,
      tone: state.ok ? "success" : "error"
    });

    if (state.ok) {
      formRef.current?.reset();
      setOpen(false);
    }
  }, [showToast, state.message, state.ok]);

  return (
    <>
      <button className="primaryButton" onClick={() => setOpen(true)}>
        Volunteer now
        <ArrowRight size={17} aria-hidden="true" />
      </button>

      {open ? (
        <div
          className="modalOverlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            aria-modal="true"
            className="volunteerModal"
            role="dialog"
            aria-labelledby="volunteer-modal-title"
          >
            <button
              className="modalClose"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close volunteer form"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <div className="modalIntro">
              <span>Volunteer application</span>
              <h2 id="volunteer-modal-title">Tell us how you want to help.</h2>
              <p>
                Share enough context for the team to understand your strengths,
                motivation, and the value you hope to bring.
              </p>
            </div>
            <form ref={formRef} className="volunteerForm" action={formAction}>
              <div className="formGridTwo">
                <label>
                  Full name
                  <input name="name" type="text" required />
                </label>
                <label>
                  Phone number
                  <input name="phone" type="tel" required />
                </label>
              </div>
              <label>
                Email address
                <input name="email" type="email" required />
              </label>
              <label>
                Skills possessed
                <textarea
                  name="skills"
                  rows={4}
                  placeholder="Design, writing, moderation, public speaking, event planning..."
                  required
                />
              </label>
              <label>
                Why would you like to volunteer?
                <textarea name="motivation" rows={4} required />
              </label>
              <label>
                How do you hope to add value to the community?
                <textarea name="valueAdd" rows={4} required />
              </label>
              <button className="primaryButton modalSubmit" disabled={pending}>
                <Send size={17} aria-hidden="true" />
                {pending ? "Submitting" : "Submit application"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
