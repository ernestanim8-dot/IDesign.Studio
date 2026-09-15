import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getInquiries, type InquiryItem } from "../api";
import { GOLD, DARKER } from "@/tokens";

interface InquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiriesDrawer({ isOpen, onClose }: InquiriesDrawerProps) {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const list = await getInquiries();
      setInquiries(list);
    } catch {
      setError("Unable to load inquiries from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl bg-[#11100d] border-l border-[#2e2920] h-full shadow-2xl flex flex-col z-10 text-[#f3efe6]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#2e2920] flex items-center justify-between bg-[#161410]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8a54a] animate-ping" />
                  <span className="text-xs uppercase tracking-widest font-mono text-[#c8a54a]">
                    Studio Operations
                  </span>
                </div>
                <h2 className="text-xl font-serif text-white mt-1">Inbound Client Inquiries</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="px-3 py-1.5 rounded text-xs font-mono border border-[#3e382d] hover:border-[#c8a54a] transition-colors text-[#a8a192]"
                >
                  {loading ? "Refreshing..." : "↻ Refresh"}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
                  aria-label="Close drawer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {error && (
                <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-lg text-sm text-red-200">
                  {error}
                </div>
              )}

              {loading && inquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-3">
                  <div className="w-6 h-6 border-2 border-[#c8a54a] border-t-transparent rounded-full animate-spin" />
                  <p className="font-mono text-xs">Accessing studio repository...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                  <p className="text-3xl mb-2">📬</p>
                  <p className="font-medium text-neutral-300">No Inquiries Found Yet</p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                    Incoming project bookings and contact form submissions from the website will automatically appear here.
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-xl border border-[#2e2a22] bg-[#181612] hover:border-[#c8a54a]/50 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-white text-base">{inq.fullName}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-neutral-400">
                          <a
                            href={`mailto:${inq.email}`}
                            className="hover:text-[#c8a54a] underline decoration-neutral-600 transition-colors"
                          >
                            {inq.email}
                          </a>
                          {inq.phone && (
                            <>
                              <span>•</span>
                              <a
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                              >
                                WA: {inq.phone}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-[#c8a54a]/10 border border-[#c8a54a]/30 text-[#e4c06e]">
                        {inq.interest || "Inquiry"}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed bg-[#100f0d] p-3 rounded border border-[#23201a]">
                      "{inq.message}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 font-mono">
                      <span>Timeline: {inq.timeline || "Flexible"}</span>
                      <span>
                        {new Date(inq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#2e2920] bg-[#14120e] text-xs text-neutral-400 flex items-center justify-between">
              <span className="font-mono">
                Total Inquiries: <strong className="text-white">{inquiries.length}</strong>
              </span>
              <span className="text-[11px] text-neutral-500">Live JSON database</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
