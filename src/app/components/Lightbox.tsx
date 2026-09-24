import React, { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, WHITE, DARKER, MUTED, BORDER } from "@/tokens";

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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
