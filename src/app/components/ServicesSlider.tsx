import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { GOLD, GOLD_LIGHT, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";

import photographyImg from "@/imports/Photography/Portrait/Birthday/IMG_1168.jpg";
import creativeConceptsImg from "@/imports/Branding/SWGC/SWGC MOCKUP copy.jpg";
import advertisingImg from "@/imports/Advertising/Tina Special Bundle/Tina-1.jpg";
import socialMediaImg from "@/imports/Advertising/3mma’s Glamour Banner/3mma’s Glamour Banner copy copy copy.jpg";
import creativeDirectionImg from "@/imports/Branding/IDesign/Notebook 2.jpg";
import graphicDesignImg from "@/imports/Branding/IDesign/Notebook.jpg";

export interface ServiceCardItem {
  id: string;
  anchorId: string;
  number: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  to: string;
  theme: {
    bg: string;
    text: string;
    descColor: string;
    border: string;
    accent: string;
    tagBg: string;
    btnBg: string;
    btnText: string;
    btnBorder: string;
    isDark: boolean;
  };
}

export const SERVICES: ServiceCardItem[] = [
  {
    id: "photography",
    anchorId: "photography",
    number: "01",
    title: "Photography",
    tag: "Commercial & Portrait",
    desc: "Studio fashion, high-performance commercial campaigns, and editorial portraiture with calibrated lighting and emotional depth.",
    img: photographyImg,
    to: "/photography",
    theme: {
      bg: "#141310",
      text: "#ffffff",
      descColor: "rgba(255, 255, 255, 0.65)",
      border: "rgba(200, 165, 74, 0.28)",
      accent: "#c8a54a",
      tagBg: "rgba(200, 165, 74, 0.12)",
      btnBg: "rgba(255, 255, 255, 0.08)",
      btnText: "#ffffff",
      btnBorder: "rgba(200, 165, 74, 0.4)",
      isDark: true,
    },
  },
  {
    id: "branding",
    anchorId: "branding",
    number: "02",
    title: "Branding & Identity",
    tag: "Visual Architecture",
    desc: "Complete visual identity packages, bespoke logo marks, typography standards, and comprehensive brand books engineered for longevity.",
    img: creativeConceptsImg,
    to: "/creative-concepts",
    theme: {
      bg: "#f5f0e6",
      text: "#1a1814",
      descColor: "#6c6559",
      border: "#ded4c3",
      accent: "#b08530",
      tagBg: "rgba(176, 133, 48, 0.1)",
      btnBg: "#1a1814",
      btnText: "#ffffff",
      btnBorder: "#1a1814",
      isDark: false,
    },
  },
  {
    id: "advertising",
    anchorId: "advertising",
    number: "03",
    title: "Advertising Design",
    tag: "Campaigns & Rollouts",
    desc: "Commercial launch visuals, outdoor billboards, and promotional campaign collateral designed to command instant attention.",
    img: advertisingImg,
    to: "/graphic-design",
    theme: {
      bg: "#1c1715",
      text: "#ffffff",
      descColor: "rgba(255, 255, 255, 0.68)",
      border: "rgba(228, 168, 106, 0.25)",
      accent: "#e4a86a",
      tagBg: "rgba(228, 168, 106, 0.12)",
      btnBg: "rgba(255, 255, 255, 0.08)",
      btnText: "#ffffff",
      btnBorder: "rgba(228, 168, 106, 0.35)",
      isDark: true,
    },
  },
  {
    id: "social-media",
    anchorId: "social-media",
    number: "04",
    title: "Social Media Creatives",
    tag: "Digital Feed Systems",
    desc: "Dynamic social suites, visual storytelling carousels, and high-impact digital banners optimized for omnichannel feeds.",
    img: socialMediaImg,
    to: "/graphic-design",
    theme: {
      bg: "#ffffff",
      text: "#1a1814",
      descColor: "#726b61",
      border: "#e5ded3",
      accent: "#c8a54a",
      tagBg: "rgba(200, 165, 74, 0.1)",
      btnBg: "#f4efe6",
      btnText: "#1a1814",
      btnBorder: "#ded4c3",
      isDark: false,
    },
  },
  {
    id: "creative-concepts",
    anchorId: "creative-concepts",
    number: "05",
    title: "Creative Concepts & UI",
    tag: "Art Direction & Digital",
    desc: "Multi-disciplinary art direction, bespoke web interfaces, and unified creative packages uniting photography and digital craft.",
    img: creativeDirectionImg,
    to: "/creative-concepts",
    theme: {
      bg: "#0d0f10",
      text: "#ffffff",
      descColor: "rgba(255, 255, 255, 0.65)",
      border: "rgba(200, 165, 74, 0.22)",
      accent: "#c8a54a",
      tagBg: "rgba(200, 165, 74, 0.12)",
      btnBg: "rgba(200, 165, 74, 0.15)",
      btnText: "#ffffff",
      btnBorder: "rgba(200, 165, 74, 0.35)",
      isDark: true,
    },
  },
  {
    id: "graphic-design",
    anchorId: "graphic-design",
    number: "06",
    title: "Print & Packaging",
    tag: "Packaging & Craft",
    desc: "Luxury stationery, custom apparel, retail packaging, and editorial publications crafted with typographic finesse and print oversight.",
    img: graphicDesignImg,
    to: "/graphic-design",
    theme: {
      bg: "#eee8dc",
      text: "#1a1814",
      descColor: "#686154",
      border: "#d6cca1",
      accent: "#8c6b2b",
      tagBg: "rgba(140, 107, 43, 0.1)",
      btnBg: "#1a1814",
      btnText: "#ffffff",
      btnBorder: "#1a1814",
      isDark: false,
    },
  },
];

export function ServicesSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Support hash navigation (#photography, #graphic-design, etc.)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const idx = SERVICES.findIndex((s) => s.anchorId === hash || s.id === hash);
      if (idx !== -1) setCurrentIndex(idx);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const total = SERVICES.length;
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  // Exact landscape card proportions matching sample video
  const cardWidth = isMobile ? Math.min(containerWidth - 64, 305) : isTablet ? 340 : 380;
  const cardHeight = isMobile ? 360 : 390;
  const gap = isMobile ? 16 : 22;

  // Max scroll distance
  const totalTrackWidth = total * cardWidth + (total - 1) * gap;
  const visibleWidth = containerWidth;
  const maxScroll = Math.max(0, totalTrackWidth - visibleWidth + 48);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(activeTag)) return;
      if (containerRef.current && containerRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevSlide();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          nextSlide();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Calculate target X scroll offset
  const targetX = Math.min(currentIndex * (cardWidth + gap), maxScroll);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="iDESIGN Studio Services"
      className="outline-none focus-visible:ring-1 focus-visible:ring-[#c8a54a]/40"
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
    >
      {/* ── Subtitle, Counter & Navigation Controls ── */}
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem 1.75rem 1.5rem",
        }}
      >
        {/* Left: Counter & drag prompt */}
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: GOLD,
              fontWeight: 600,
            }}
          >
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span style={{ width: 24, height: 1, background: BORDER }} />
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Drag or swipe cards horizontally
          </span>
        </div>

        {/* Right: Prev & Next Arrow Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous service"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentIndex === 0 ? "rgba(255,255,255,0.4)" : "#ffffff",
              border: `1px solid ${currentIndex === 0 ? "rgba(224,216,204,0.4)" : BORDER}`,
              color: currentIndex === 0 ? "#bbb" : DARK,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              boxShadow: currentIndex === 0 ? "none" : "0 2px 8px rgba(26,24,20,0.05)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = GOLD;
                e.currentTarget.style.transform = "translateX(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = DARK;
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentIndex === total - 1}
            aria-label="Next service"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentIndex === total - 1 ? "rgba(255,255,255,0.4)" : "#ffffff",
              border: `1px solid ${currentIndex === total - 1 ? "rgba(224,216,204,0.4)" : BORDER}`,
              color: currentIndex === total - 1 ? "#bbb" : DARK,
              cursor: currentIndex === total - 1 ? "not-allowed" : "pointer",
              boxShadow: currentIndex === total - 1 ? "none" : "0 2px 8px rgba(26,24,20,0.05)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (currentIndex < total - 1) {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = GOLD;
                e.currentTarget.style.transform = "translateX(2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex < total - 1) {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = DARK;
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Flowing Horizontal Cards Track ── */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "1.5rem" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setTimeout(() => setIsDragging(false), 60);
            const threshold = 35;
            if (info.offset.x < -threshold) {
              nextSlide();
            } else if (info.offset.x > threshold) {
              prevSlide();
            }
          }}
          animate={{ x: -targetX }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "flex",
            gap: `${gap}px`,
            paddingLeft: isMobile
              ? "1.5rem"
              : `clamp(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem), 8rem)`,
            paddingRight: "2.5rem",
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
            userSelect: "none",
          }}
        >
          {SERVICES.map((service, index) => {
            const isCurrent = index === currentIndex;
            const { theme } = service;

            return (
              <motion.article
                key={service.id}
                id={service.anchorId}
                aria-roledescription="slide"
                aria-label={`${service.number} of ${total}: ${service.title}`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                    return;
                  }
                  if (index !== currentIndex) {
                    setCurrentIndex(index);
                  }
                }}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  backgroundColor: theme.bg,
                  borderRadius: "14px",
                  border: `1px solid ${theme.border}`,
                  boxShadow: isCurrent
                    ? "0 18px 45px -10px rgba(26,24,20,0.14), 0 2px 8px rgba(200,165,74,0.12)"
                    : "0 6px 24px rgba(26,24,20,0.05)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: isMobile ? "1.15rem" : "1.35rem",
                  transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                  position: "relative",
                }}
              >
                {/* ── Top Bar inside Card (like editorial browser card) ── */}
                <div className="flex items-center justify-between" style={{ zIndex: 2 }}>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: theme.accent,
                      }}
                    >
                      {service.number}
                    </span>
                    <span style={{ width: 14, height: 1, background: theme.accent, opacity: 0.6 }} />
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: theme.descColor,
                        fontWeight: 500,
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Explore Pill Button */}
                  <Link
                    to={service.to}
                    onClick={(e) => {
                      if (isDragging) e.preventDefault();
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "20px",
                      backgroundColor: theme.btnBg,
                      color: theme.btnText,
                      border: `1px solid ${theme.btnBorder}`,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = GOLD;
                      e.currentTarget.style.borderColor = GOLD;
                      e.currentTarget.style.color = WHITE;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme.btnBg;
                      e.currentTarget.style.borderColor = theme.btnBorder;
                      e.currentTarget.style.color = theme.btnText;
                    }}
                  >
                    <span>Explore</span>
                    <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>↗</span>
                  </Link>
                </div>

                {/* ── Center Framed Visual (Hero Artwork inside card) ── */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: isMobile ? "165px" : "185px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: theme.isDark ? "#080706" : "#e8e2d5",
                    border: `1px solid ${theme.border}`,
                    margin: "0.75rem 0",
                  }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    loading={index <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      pointerEvents: "none",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  {/* Subtle darkening vignette on bottom */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: theme.isDark
                        ? "linear-gradient(to top, rgba(13,12,9,0.45) 0%, transparent 55%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* ── Bottom Editorial Content ── */}
                <div style={{ zIndex: 2 }}>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: isMobile ? "1.25rem" : "1.45rem",
                      lineHeight: "1.15",
                      letterSpacing: "-0.015em",
                      color: theme.text,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 300,
                      lineHeight: "1.55",
                      color: theme.descColor,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      margin: 0,
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default ServicesSlider;
