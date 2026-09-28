import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

type ToastListener = (toast: ToastMessage) => void;
const listeners = new Set<ToastListener>();

export function showToast(message: string, type: ToastType = "info") {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  listeners.forEach((listener) => listener({ id, type, message }));
}

interface ToastProps {
  toasts?: ToastMessage[];
  onDismiss?: (id: string) => void;
}

export function ToastContainer({ toasts: propToasts, onDismiss: propOnDismiss }: ToastProps = {}) {
  const [internalToasts, setInternalToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // If not using external controlled propToasts, listen to global showToast events
    if (!propToasts) {
      const handleNewToast = (newToast: ToastMessage) => {
        setInternalToasts((curr) => [...curr, newToast]);
      };
      listeners.add(handleNewToast);
      return () => {
        listeners.delete(handleNewToast);
      };
    }
  }, [propToasts]);

  const activeToasts = propToasts ?? internalToasts;

  const handleDismiss = (id: string) => {
    if (propOnDismiss) {
      propOnDismiss(id);
    } else {
      setInternalToasts((curr) => curr.filter((t) => t.id !== id));
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full"
      aria-live="polite"
    >
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={handleDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const config =
    toast.type === "success"
      ? {
          bgBorder: "bg-[#14120e]/95 border-[#c8a54a]/60 text-[#f5f3ef]",
          iconBg: "bg-[#c8a54a]/20 text-[#e4c06e] border border-[#c8a54a]/40",
          icon: <CheckIcon />,
        }
      : toast.type === "error"
      ? {
          bgBorder: "bg-[#1c0f0f]/95 border-red-500/60 text-red-100",
          iconBg: "bg-red-500/20 text-red-400 border border-red-500/40",
          icon: <AlertIcon />,
        }
      : {
          bgBorder: "bg-[#14120e]/95 border-neutral-700/80 text-neutral-200",
          iconBg: "bg-neutral-800 text-neutral-300 border border-neutral-700",
          icon: <InfoIcon />,
        };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.94 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${config.bgBorder}`}
      role={toast.type === "error" ? "alert" : "status"}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs ${config.iconBg}`}
          aria-hidden="true"
        >
          {config.icon}
        </span>
        <span className="text-xs sm:text-sm font-sans tracking-wide leading-snug">{toast.message}</span>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="ml-2 shrink-0 p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a54a]"
        aria-label="Dismiss notification"
      >
        <CloseIcon />
      </button>
    </motion.div>
  );
}
