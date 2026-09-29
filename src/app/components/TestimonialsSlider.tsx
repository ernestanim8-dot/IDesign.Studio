import React, { useState, useEffect, useRef, useCallback } from "react";
import { GOLD, DARK, MUTED, BORDER, WHITE } from "@/tokens";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  rating: number;
  initials: string;
  image?: string;
}

interface TestimonialsSliderProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Drag / swipe states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Measure container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine cards visible per viewport
  const visibleCards = containerWidth < 640 ? 1 : containerWidth < 1024 ? 2 : 3;
  const maxIndex = Math.max(0, testimonials.length - visibleCards);

  // Keep currentIndex bounded when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const gap = containerWidth < 640 ? 16 : 24;
  const cardWidth = Math.max(260, (containerWidth - gap * (visibleCards - 1)) / visibleCards);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay every 6 seconds unless paused or dragging
  useEffect(() => {
    if (isPaused || isDragging || maxIndex === 0) return;
    const timer = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, maxIndex, goNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      goNext();
    } else if (dragOffset > 50) {
      goPrev();
    }
    setDragOffset(0);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      goNext();
    } else if (dragOffset > 50) {
      goPrev();
    }
    setDragOffset(0);
  };

  const currentTranslate = -(currentIndex * (cardWidth + gap)) + (isDragging ? dragOffset : 0);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div style={{ color: GOLD, fontSize: "0.95rem", letterSpacing: "2px", display: "flex", alignItems: "center" }}>
        {"★".repeat(fullStars)}
        {hasHalf && <span style={{ opacity: 0.85 }}>★</span>}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Client Testimonials Slider"
      style={{ position: "relative", width: "100%", userSelect: isDragging ? "none" : "auto" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) {
          setIsDragging(false);
          setDragOffset(0);
        }
      }}
    >
      {/* ── Carousel Viewport ── */}
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          padding: "1rem 0",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            transform: `translateX(${currentTranslate}px)`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={`${t.author}-${i}`}
              style={{
                flex: `0 0 ${cardWidth}px`,
                width: `${cardWidth}px`,
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: "10px",
                padding: containerWidth < 640 ? "1.75rem" : "2.25rem",
                boxShadow: "0 6px 20px rgba(26,24,20,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "310px",
                position: "relative",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200, 165, 74, 0.4)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(200, 165, 74, 0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(26,24,20,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Decorative quotation watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.5rem",
                  fontSize: "3.5rem",
                  lineHeight: "1",
                  fontFamily: "'DM Serif Display', serif",
                  color: "rgba(200, 165, 74, 0.12)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                “
              </div>

              <div>
                <div style={{ marginBottom: "1.1rem" }}>{renderStars(t.rating)}</div>
                <p
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 300,
                    lineHeight: "1.75",
                    color: DARK,
                    marginBottom: "1.75rem",
                    fontStyle: "italic",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  borderTop: `1px solid ${BORDER}`,
                  paddingTop: "1.1rem",
                  zIndex: 2,
                }}
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.author}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `1.5px solid ${GOLD}`,
                      boxShadow: "0 2px 8px rgba(200, 165, 74, 0.25)",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      background: "rgba(200, 165, 74, 0.12)",
                      border: `1.5px solid ${GOLD}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: GOLD,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                )}
                <div>
                  <h4
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      color: DARK,
                    }}
                  >
                    {t.author}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.76rem",
                      color: MUTED,
                      marginTop: "1px",
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slider Navigation Controls (Arrows & Pagination Dots) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          marginTop: "2.25rem",
        }}
      >
        {/* Previous Button */}
        <button
          onClick={goPrev}
          aria-label="Previous testimonial"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: `1px solid rgba(200, 165, 74, 0.35)`,
            background: "rgba(200, 165, 74, 0.08)",
            color: GOLD,
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = GOLD;
            e.currentTarget.style.color = "#141310";
            e.currentTarget.style.borderColor = GOLD;
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(200, 165, 74, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(200, 165, 74, 0.08)";
            e.currentTarget.style.color = GOLD;
            e.currentTarget.style.borderColor = "rgba(200, 165, 74, 0.35)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ←
        </button>

        {/* Dots */}
        <div
          role="tablist"
          aria-label="Testimonial selection"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to testimonial slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background: i === currentIndex ? GOLD : "rgba(200, 165, 74, 0.25)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          aria-label="Next testimonial"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: `1px solid rgba(200, 165, 74, 0.35)`,
            background: "rgba(200, 165, 74, 0.08)",
            color: GOLD,
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = GOLD;
            e.currentTarget.style.color = "#141310";
            e.currentTarget.style.borderColor = GOLD;
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(200, 165, 74, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(200, 165, 74, 0.08)";
            e.currentTarget.style.color = GOLD;
            e.currentTarget.style.borderColor = "rgba(200, 165, 74, 0.35)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default TestimonialsSlider;
