"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

type ToastTone = "success" | "error" | "info";

type ToastInput = {
  title?: string;
  message: string;
  tone?: ToastTone;
};

type Toast = ToastInput & {
  id: string;
  tone: ToastTone;
};

type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, tone = "info" }: ToastInput) => {
      const id = crypto.randomUUID();

      setToasts((current) => [
        ...current,
        {
          id,
          title,
          message,
          tone
        }
      ]);

      window.setTimeout(() => dismissToast(id), 4800);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toastViewport" role="status" aria-live="polite">
        {toasts.map((toast) => {
          const Icon = toneIcons[toast.tone];

          return (
            <div className={`toastItem toast-${toast.tone}`} key={toast.id}>
              <Icon size={19} aria-hidden="true" />
              <div>
                {toast.title ? <strong>{toast.title}</strong> : null}
                <p>{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}
