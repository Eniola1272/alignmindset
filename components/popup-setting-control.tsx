"use client";

import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { updateNewsletterPopupSetting } from "@/lib/actions";
import { useToast } from "@/components/toast-provider";

export function PopupSettingControl({ enabled }: { enabled: boolean }) {
  const { showToast } = useToast();
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [pending, startTransition] = useTransition();

  function togglePopup() {
    const nextEnabled = !isEnabled;

    startTransition(async () => {
      const result = await updateNewsletterPopupSetting(nextEnabled);

      if (result.ok) {
        setIsEnabled(result.enabled);
      }

      showToast({
        title: result.ok
          ? result.enabled
            ? "Popup activated"
            : "Popup paused"
          : "Setting not changed",
        message: result.message,
        tone: result.ok ? "success" : "error"
      });
    });
  }

  return (
    <div className="popupSettingRow">
      <div>
        <strong>Newsletter ebook popup</strong>
        <p>
          Show the free ebook subscription prompt after a visitor has spent 10
          seconds on the site.
        </p>
      </div>
      <div className="popupSettingControl">
        <span className={isEnabled ? "isActive" : undefined}>
          {isEnabled ? "Active" : "Paused"}
        </span>
        <button
          className={isEnabled ? "adminSwitch isOn" : "adminSwitch"}
          type="button"
          role="switch"
          aria-checked={isEnabled}
          aria-label={`${isEnabled ? "Deactivate" : "Activate"} newsletter popup`}
          onClick={togglePopup}
          disabled={pending}
        >
          {pending ? (
            <LoaderCircle className="spinIcon" size={15} aria-hidden="true" />
          ) : (
            <span aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
