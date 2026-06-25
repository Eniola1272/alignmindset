"use client";

import { useFormStatus } from "react-dom";
import { Download, ListFilter, LoaderCircle, LockKeyhole, LogOut, Save, Trash2 } from "lucide-react";

type PendingSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  icon?: "delete" | "download" | "filter" | "login" | "logout" | "save";
  pendingLabel?: string;
};

const icons = {
  delete: Trash2,
  download: Download,
  filter: ListFilter,
  login: LockKeyhole,
  logout: LogOut,
  save: Save
};

export function PendingSubmitButton({
  children,
  className,
  icon,
  pendingLabel = "Working"
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();
  const Icon = pending ? LoaderCircle : icon ? icons[icon] : null;

  return (
    <button className={className} type="submit" disabled={pending}>
      {Icon ? (
        <Icon
          className={pending ? "spinIcon" : undefined}
          size={16}
          aria-hidden="true"
        />
      ) : null}
      {pending ? pendingLabel : children}
    </button>
  );
}
