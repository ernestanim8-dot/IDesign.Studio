import { useEffect, useCallback, useRef } from "react";
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

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined || Math.abs(end - start) < 48 || items.length < 2) return;
    if (end < start) handleNext(); else handlePrev();
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
          transition={{ duration: 0.24 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 9, 7, 0.94)",
            backdropFilter: "blur(18px)",
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
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
              padding: "1.25rem 2rem",
              zIndex: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: GOLD,
                  textTransform: "uppercase",
                }}
              >
                {currentItem.category || "Portfolio"}
              </span>
              <span style={{ color: "#4a453e", fontSize: "0.75rem" }}>•</span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#9e968a",
                  letterSpacing: "0.08em",
                }}
              >
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Direct WhatsApp inquiry for this specific piece */}
              <a
                href={`https://wa.me/233502330663?text=${encodeURIComponent(
                  `Hello iDESIGN! I am interested in work similar to: "${currentItem.title}" (${currentItem.category || "Portfolio"})`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(200, 165, 74, 0.15)",
                  border: `1px solid ${GOLD}`,
                  color: GOLD,
                  padding: "0.45rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  fontFamily: "'DM Mono', monospace",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
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
                Inquire on WhatsApp 💬
              </a>

              {/* Close button */}
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
                  fontSize: "1.2rem",
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
              padding: "0 1rem",
            }}
          >
            {/* Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Image"
              style={{
                position: "absolute",
                left: "1.5rem",
                zIndex: 10,
                background: "rgba(20, 18, 15, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: WHITE,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.color = DARKER;
                e.currentTarget.style.transform = "translateX(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(20, 18, 15, 0.7)";
                e.currentTarget.style.color = WHITE;
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              ←
            </button>

            {/* Current Image Container */}
            <div
              style={{
                maxWidth: "88vw",
                maxHeight: "72vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentItem.img}
                  src={currentItem.img}
                  alt={currentItem.title}
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "72vh",
                    objectFit: "contain",
                    borderRadius: "6px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Image"
              style={{
                position: "absolute",
                right: "1.5rem",
                zIndex: 10,
                background: "rgba(20, 18, 15, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: WHITE,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.color = DARKER;
                e.currentTarget.style.transform = "translateX(3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(20, 18, 15, 0.7)";
                e.currentTarget.style.color = WHITE;
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              →
            </button>
          </div>

          {/* Bottom Caption & Metadata */}
          <div
            style={{
              padding: "1.25rem 2rem 2rem",
              textAlign: "center",
              zIndex: 2,
              maxWidth: "760px",
              margin: "0 auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.h3
              key={currentItem.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.4rem",
                color: WHITE,
                marginBottom: "0.3rem",
              }}
            >
              {currentItem.title}
            </motion.h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              {currentItem.client && (
                <span
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.8rem",
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
                    fontSize: "0.75rem",
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
                  fontSize: "0.85rem",
                  color: "#9c9488",
                  lineHeight: "1.6",
                }}
              >
                {currentItem.description}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
