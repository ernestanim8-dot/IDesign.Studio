import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getInquiries, verifyStudioPin, type InquiryItem } from "../api";
import { GOLD, DARKER } from "@/tokens";
import { Link } from "react-router";

interface InquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiriesDrawer({ isOpen, onClose }: InquiriesDrawerProps) {
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState(() => window.localStorage.getItem("idesign-admin-pin") || "");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [error, setError] = useState("");
  const [pinError, setPinError] = useState("");
  const [showPin, setShowPin] = useState(false);

  // Auto-verify if saved PIN exists on open
  useEffect(() => {
    if (isOpen) {
      if (savedPin) {
        attemptUnlock(savedPin, false);
      } else {
        setIsUnlocked(false);
        setPin("");
        setPinError("");
      }
    }
  }, [isOpen]);

  const attemptUnlock = async (candidatePin: string, isManual: boolean = true) => {
    const trimmed = candidatePin.trim();
    if (!trimmed) {
      setPinError("Please enter your studio PIN.");
      return;
    }

    setPinLoading(true);
    setPinError("");

    try {
      const res = await verifyStudioPin(trimmed);
      if (res.ok) {
        window.localStorage.setItem("idesign-admin-pin", trimmed);
        setSavedPin(trimmed);
        setIsUnlocked(true);
        loadInquiries(trimmed);
      } else {
        setIsUnlocked(false);
        if (isManual) {
          setPinError(res.error || "Incorrect Studio PIN. Access restricted.");
        } else {
          // Saved PIN was expired/invalidated
          window.localStorage.removeItem("idesign-admin-pin");
          setSavedPin("");
        }
      }
    } catch {
      setIsUnlocked(false);
      setPinError("Connection error. Could not verify PIN.");
    } finally {
      setPinLoading(false);
    }
  };

  const loadInquiries = async (tokenToUse: string) => {
    setLoading(true);
    setError("");
    try {
      const list = await getInquiries(tokenToUse);
      setInquiries(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load inquiries. Check the PIN and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLock = () => {
    window.localStorage.removeItem("idesign-admin-pin");
    setSavedPin("");
    setIsUnlocked(false);
    setPin("");
    setPinError("");
    setInquiries([]);
  };

  const handleDigitPress = (digit: string) => {
    if (pin.length < 14) {
      const next = pin + digit;
      setPin(next);
      setPinError("");
      if (next.length === 10) {
        // Auto-attempt unlock on 10 digits
        attemptUnlock(next);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setPinError("");
  };

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
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="relative w-full max-w-xl bg-[#11100d] border-l border-[#2e2920] h-full shadow-2xl flex flex-col z-10 text-[#f3efe6]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#2e2920] flex items-center justify-between bg-[#161410]">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isUnlocked ? "bg-emerald-400" : "bg-[#c8a54a]"} animate-pulse`} />
                  <span className="text-xs uppercase tracking-widest font-mono text-[#c8a54a]">
                    {isUnlocked ? "Studio Access Granted" : "Studio Operations — Restricted"}
                  </span>
                </div>
                <h2 className="text-xl font-serif text-white mt-1">
                  {isUnlocked ? "Inbound Client Inquiries" : "Studio Manager Access"}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {isUnlocked && (
                  <>
                    <button
                      onClick={() => loadInquiries(savedPin)}
                      disabled={loading}
                      title="Refresh inquiries"
                      className="px-2.5 py-1.5 rounded text-xs font-mono border border-[#3e382d] hover:border-[#c8a54a] transition-colors text-[#a8a192] flex items-center gap-1.5"
                    >
                      <span className={loading ? "animate-spin" : ""}>↻</span>
                      <span className="hidden sm:inline">{loading ? "Refreshing..." : "Refresh"}</span>
                    </button>
                    <button
                      onClick={handleLock}
                      title="Lock Studio"
                      className="px-2.5 py-1.5 rounded text-xs font-mono border border-red-900/60 bg-red-950/30 hover:bg-red-900/40 text-red-300 transition-colors flex items-center gap-1"
                    >
                      🔒 Lock
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors ml-1"
                  aria-label="Close drawer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            {!isUnlocked ? (
              /* PIN Code Lock Screen */
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1c1914] border border-[#3d3728] flex items-center justify-center text-3xl shadow-inner mb-6 text-[#c8a54a]">
                  🔒
                </div>

                <h3 className="text-2xl font-serif text-white mb-2">Studio Authentication</h3>
                <p className="text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
                  Client inquiries, contacts, and notifications are confidential. Enter your studio PIN to unlock this dashboard.
                </p>

                {/* PIN Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    attemptUnlock(pin);
                  }}
                  className="w-full max-w-xs space-y-4"
                >
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        setPinError("");
                      }}
                      placeholder="Enter Studio PIN"
                      autoFocus
                      maxLength={16}
                      className="w-full text-center tracking-[0.2em] font-mono text-xl py-3 px-4 rounded-xl bg-[#161410] border border-[#3e382d] focus:border-[#c8a54a] focus:ring-1 focus:ring-[#c8a54a] text-white placeholder:text-[#555047] placeholder:tracking-normal placeholder:text-sm outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-neutral-300 font-mono"
                    >
                      {showPin ? "Hide" : "Show"}
                    </button>
                  </div>

                  {pinError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 py-2 px-3 rounded-lg"
                    >
                      {pinError}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={pinLoading || !pin.trim()}
                    className="w-full py-3 rounded-xl bg-[#c8a54a] hover:bg-[#d6b55e] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#c8a54a]/10 flex items-center justify-center gap-2"
                  >
                    {pinLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Unlock Inquiries</span>
                    )}
                  </button>
                </form>

                {/* Quick Keypad for Mobile / Ease of Use */}
                <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs mt-6 pt-6 border-t border-[#23201a]">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => handleDigitPress(digit)}
                      className="py-3 rounded-lg bg-[#161410] hover:bg-[#201d16] border border-[#2b271f] hover:border-[#c8a54a]/40 text-lg font-mono text-white transition-colors active:scale-95"
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setPin("");
                      setPinError("");
                    }}
                    className="py-3 rounded-lg bg-[#161410] hover:bg-[#201d16] border border-[#2b271f] text-xs font-mono text-neutral-400 transition-colors uppercase tracking-wider"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDigitPress("0")}
                    className="py-3 rounded-lg bg-[#161410] hover:bg-[#201d16] border border-[#2b271f] hover:border-[#c8a54a]/40 text-lg font-mono text-white transition-colors active:scale-95"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={handleBackspace}
                    className="py-3 rounded-lg bg-[#161410] hover:bg-[#201d16] border border-[#2b271f] text-xs font-mono text-neutral-400 transition-colors uppercase tracking-wider"
                  >
                    ⌫
                  </button>
                </div>
              </div>
            ) : (
              /* Unlocked Inquiries List */
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
                  inquiries.map((inq) => {
                    const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, "") : "";
                    const whatsappMsg = encodeURIComponent(
                      `Hi ${inq.fullName}, thank you for reaching out to iDESIGN Studio regarding ${inq.interest}!`
                    );

                    return (
                      <div
                        key={inq.id}
                        className="p-5 rounded-xl border border-[#2e2a22] bg-[#181612] hover:border-[#c8a54a]/50 transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-white text-base">{inq.fullName}</h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-neutral-400">
                              <a
                                href={`mailto:${inq.email}?subject=${encodeURIComponent(`iDESIGN Studio — Re: ${inq.interest}`)}`}
                                className="hover:text-[#c8a54a] underline decoration-neutral-600 transition-colors"
                              >
                                {inq.email}
                              </a>
                              {cleanPhone && (
                                <>
                                  <span>•</span>
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center gap-1"
                                  >
                                    <span>WhatsApp: {inq.phone}</span>
                                    <span>↗</span>
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-[#c8a54a]/10 border border-[#c8a54a]/30 text-[#e4c06e]">
                            {inq.interest || "Inquiry"}
                          </span>
                        </div>

                        <div className="text-xs text-neutral-300 leading-relaxed bg-[#100f0d] p-3.5 rounded-lg border border-[#23201a]">
                          <p className="whitespace-pre-wrap">{inq.message}</p>
                        </div>

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
                    );
                  })
                )}
              </div>
            )}

            {/* Footer */}
            <div className="p-4 border-t border-[#2e2920] bg-[#14120e] text-xs text-neutral-400 flex items-center justify-between">
              <span className="font-mono">
                {isUnlocked ? (
                  <>Total Inquiries: <strong className="text-white">{inquiries.length}</strong></>
                ) : (
                  <>Studio Authentication Required</>
                )}
              </span>
              {isUnlocked && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="text-[11px] text-[#c8a54a] hover:text-[#e4c06e] transition-colors"
                >
                  Open full dashboard &rarr;
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
