import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bgBorder =
    toast.type === "success"
      ? "bg-[#141310] border-[#c8a54a] text-[#f5f3ef]"
      : toast.type === "error"
      ? "bg-[#1f1010] border-red-500 text-red-100"
      : "bg-[#141310] border-neutral-700 text-neutral-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl text-sm font-medium ${bgBorder}`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <span className="text-base">
        {toast.type === "success" ? "✨" : toast.type === "error" ? "⚠️" : "ℹ️"}
      </span>
      <span>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-2 text-neutral-400 hover:text-white text-xs px-1"
        aria-label="Close"
      >
        ✕
      </button>
    </motion.div>
  );
}
