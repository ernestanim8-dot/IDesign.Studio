import React, { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, WHITE, DARKER, MUTED, BORDER } from "@/tokens";
import { submitInquiry } from "@/app/api";

export interface LightboxItem {
  img: string;
  title: string;
  category?: string;
  description?: string;
  client?: string;
  year?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : direction < 0 ? -60 : 0,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : direction < 0 ? 60 : 0,
    scale: 0.96,
  }),
};

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefName, setBriefName] = useState("");
  const [briefEmail, setBriefEmail] = useState("");
  const [briefMessage, setBriefMessage] = useState("");
  const [briefStatus, setBriefStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(-1);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(1);
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    const endX = event.changedTouches[0]?.clientX;
    const endY = event.changedTouches[0]?.clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    if (startX === null || startY === null || endX === undefined || endY === undefined) return;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Swipe down to dismiss (natural mobile gesture)
    if (deltaY > 70 && Math.abs(deltaY) > Math.abs(deltaX) * 1.25) {
      onClose();
      return;
    }

    // Horizontal swipe for next/prev navigation
    if (Math.abs(deltaX) >= 38 && Math.abs(deltaX) > Math.abs(deltaY) && items.length > 1) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleBriefSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentItem || !briefName.trim() || !briefEmail.trim() || !briefMessage.trim()) return;

    setBriefStatus("sending");
    const result = await submitInquiry({
      fullName: briefName,
      email: briefEmail,
      interest: `Artwork request: ${currentItem.title}`,
      timeline: "Flexible / Future",
      message: `Artwork reference: ${currentItem.title}\nCategory: ${currentItem.category || "Portfolio"}\n\nClient request:\n${briefMessage.trim()}`,
    });
    setBriefStatus(result.ok ? "sent" : "error");
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Preload adjacent images so next/prev navigation feels instantaneous
  useEffect(() => {
    if (!isOpen || currentIndex === null || items.length <= 1) return;
    const nextIdx = (currentIndex + 1) % items.length;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    [nextIdx, prevIdx].forEach((idx) => {
      const src = items[idx]?.img;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [isOpen, currentIndex, items]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 9, 7, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
            touchAction: "pan-y",
          }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 2rem)",
              zIndex: 20,
              gap: "0.75rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Category & Counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
                  letterSpacing: "0.15em",
                  color: GOLD,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentItem.category || "Portfolio"}
              </span>
              <span style={{ color: "#4a453e", fontSize: "0.75rem" }}>•</span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(0.62rem, 1.8vw, 0.7rem)",
                  color: "#9e968a",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            {/* Quick Actions: WhatsApp & Close */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
              {/* Direct WhatsApp inquiry for this specific piece */}
              <a
                href={`https://wa.me/233502310663?text=${encodeURIComponent(
                  `Hello iDESIGN! I am interested in work similar to: "${currentItem.title}" (${currentItem.category || "Portfolio"})`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(200, 165, 74, 0.15)",
                  border: `1px solid ${GOLD}`,
                  color: GOLD,
                  padding: "0.4rem clamp(0.6rem, 1.5vw, 0.9rem)",
                  borderRadius: "4px",
                  fontSize: "clamp(0.65rem, 1.8vw, 0.72rem)",
                  fontFamily: "'DM Mono', monospace",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = WHITE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(200, 165, 74, 0.15)";
                  e.currentTarget.style.color = GOLD;
                }}
              >
                <span>💬</span>
                <span className="hidden sm:inline">Inquire on WhatsApp</span>
                <span className="sm:hidden">Inquire</span>
              </a>

              {/* Close button with large touch target */}
              <button
                onClick={onClose}
                aria-label="Close Lightbox"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: WHITE,
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Visual Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: "0 clamp(0.5rem, 2vw, 2rem)",
              minHeight: 0,
            }}
          >
            {/* Prev Arrow */}
            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous Image"
                style={{
                  position: "absolute",
                  left: "clamp(0.5rem, 2vw, 1.5rem)",
                  zIndex: 10,
                  background: "rgba(20, 18, 15, 0.75)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: WHITE,
                  width: "clamp(38px, 5vw, 48px)",
                  height: "clamp(38px, 5vw, 48px)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = DARKER;
                  e.currentTarget.style.transform = "translateX(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(20, 18, 15, 0.75)";
                  e.currentTarget.style.color = WHITE;
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                ←
              </button>
            )}

            {/* Current Image Container with Directional Transition */}
            <div
              style={{
                maxWidth: "clamp(88vw, 92vw, 1200px)",
                maxHeight: "clamp(52vh, 65vh, 73vh)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={currentItem.img}
                  src={currentItem.img}
                  alt={currentItem.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "clamp(52vh, 65vh, 73vh)",
                    objectFit: "contain",
                    borderRadius: "6px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.65)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Next Arrow */}
            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next Image"
                style={{
                  position: "absolute",
                  right: "clamp(0.5rem, 2vw, 1.5rem)",
                  zIndex: 10,
                  background: "rgba(20, 18, 15, 0.75)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: WHITE,
                  width: "clamp(38px, 5vw, 48px)",
                  height: "clamp(38px, 5vw, 48px)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = DARKER;
                  e.currentTarget.style.transform = "translateX(3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(20, 18, 15, 0.75)";
                  e.currentTarget.style.color = WHITE;
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                →
              </button>
            )}
          </div>

          {/* Bottom Caption, Metadata & Mobile Hint */}
          <div
            style={{
              padding: "clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.5rem)",
              textAlign: "center",
              zIndex: 20,
              maxWidth: "780px",
              margin: "0 auto",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.h3
              key={currentItem.title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.05rem, 3vw, 1.35rem)",
                color: WHITE,
                marginBottom: "0.25rem",
                lineHeight: "1.25",
              }}
            >
              {currentItem.title}
            </motion.h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.35rem",
                flexWrap: "wrap",
              }}
            >
              {currentItem.client && (
                <span
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "clamp(0.72rem, 1.8vw, 0.78rem)",
                    color: "#b0a99e",
                  }}
                >
                  Client: <strong style={{ color: WHITE }}>{currentItem.client}</strong>
                </span>
              )}
              {currentItem.year && (
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "clamp(0.68rem, 1.6vw, 0.72rem)",
                    color: GOLD,
                  }}
                >
                  {currentItem.year}
                </span>
              )}
            </div>

            {currentItem.description && (
              <p
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "clamp(0.75rem, 2vw, 0.82rem)",
                  color: "#9c9488",
                  lineHeight: "1.5",
                  maxWidth: "680px",
                  margin: "0 auto",
                  maxHeight: "10vh",
                  overflowY: "auto",
                }}
              >
                {currentItem.description}
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                setBriefStatus("idle");
                setBriefOpen(true);
              }}
              style={{
                marginTop: "0.8rem",
                background: "transparent",
                border: `1px solid ${GOLD}`,
                color: GOLD,
                padding: "0.48rem 0.8rem",
                borderRadius: "3px",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Request something similar
            </button>

            {/* Subtle Mobile Gesture Hint */}
            <div className="sm:hidden" style={{ marginTop: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(200, 165, 74, 0.65)",
                }}
              >
                ‹ swipe to browse • swipe down to close ›
              </span>
            </div>
          </div>

          <AnimatePresence>
            {briefOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 30,
                  display: "grid",
                  placeItems: "center",
                  padding: "1rem",
                  background: "rgba(10, 9, 7, 0.72)",
                }}
                onClick={() => setBriefOpen(false)}
              >
                <motion.form
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleBriefSubmit}
                  onClick={(event) => event.stopPropagation()}
                  style={{
                    width: "min(100%, 460px)",
                    maxHeight: "calc(100vh - 2rem)",
                    overflowY: "auto",
                    background: "#171510",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "6px",
                    padding: "clamp(1.2rem, 4vw, 2rem)",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "1rem", marginBottom: "1.2rem" }}>
                    <div>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: "0.45rem" }}>Artwork request</p>
                      <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: WHITE, lineHeight: 1.15 }}>Tell us what you need</h4>
                      <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.78rem", color: MUTED, marginTop: "0.45rem" }}>Based on: {currentItem.title}</p>
                    </div>
                    <button type="button" onClick={() => setBriefOpen(false)} aria-label="Close request form" style={{ background: "transparent", border: "none", color: MUTED, cursor: "pointer", fontSize: "1.25rem", padding: "0.2rem" }}>x</button>
                  </div>

                  {briefStatus === "sent" ? (
                    <div style={{ fontFamily: "'Work Sans', sans-serif", color: WHITE, lineHeight: 1.6 }}>
                      <p style={{ color: GOLD, fontSize: "1.05rem", marginBottom: "0.4rem" }}>Request received.</p>
                      <p style={{ color: MUTED, fontSize: "0.84rem" }}>We have your brief and will be in touch using the email you provided.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input required value={briefName} onChange={(event) => setBriefName(event.target.value)} placeholder="Your name" style={{ background: "#0f0e0b", border: `1px solid ${BORDER}`, color: WHITE, padding: "0.7rem 0.8rem", borderRadius: "3px", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem", minWidth: 0 }} />
                        <input required type="email" value={briefEmail} onChange={(event) => setBriefEmail(event.target.value)} placeholder="Email address" style={{ background: "#0f0e0b", border: `1px solid ${BORDER}`, color: WHITE, padding: "0.7rem 0.8rem", borderRadius: "3px", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem", minWidth: 0 }} />
                      </div>
                      <textarea required rows={5} value={briefMessage} onChange={(event) => setBriefMessage(event.target.value)} placeholder="Describe the kind of work you would like, the changes you have in mind, and any important details." style={{ width: "100%", marginTop: "0.75rem", background: "#0f0e0b", border: `1px solid ${BORDER}`, color: WHITE, padding: "0.7rem 0.8rem", borderRadius: "3px", resize: "vertical", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem", lineHeight: 1.5 }} />
                      {briefStatus === "error" && <p style={{ color: "#f8aaa5", fontFamily: "'Work Sans', sans-serif", fontSize: "0.78rem", marginTop: "0.65rem" }}>We could not send that request. Please try again or use WhatsApp.</p>}
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.7rem", marginTop: "1rem" }}>
                        <button type="button" onClick={() => setBriefOpen(false)} style={{ background: "transparent", border: "none", color: MUTED, cursor: "pointer", fontFamily: "'Work Sans', sans-serif", fontSize: "0.82rem" }}>Cancel</button>
                        <button type="submit" disabled={briefStatus === "sending"} style={{ background: GOLD, border: "none", borderRadius: "3px", color: DARKER, cursor: briefStatus === "sending" ? "wait" : "pointer", padding: "0.7rem 1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{briefStatus === "sending" ? "Sending..." : "Send request"}</button>
                      </div>
                    </>
                  )}
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
