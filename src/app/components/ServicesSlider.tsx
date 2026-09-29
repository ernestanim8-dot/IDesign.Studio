import React, { useRef, useState, useEffect } from "react";
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

// Duplicate for continuous seamless marquee loop
const LOOPED_SERVICES = [...SERVICES, ...SERVICES];

export function ServicesSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  const cardWidth = isMobile ? Math.min(containerWidth - 64, 305) : isTablet ? 340 : 380;
  const cardHeight = isMobile ? 360 : 390;
  const gap = isMobile ? 16 : 22;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="iDESIGN Studio Services Showcase"
      style={{ position: "relative", width: "100%", overflow: "hidden", padding: "0.5rem 0 1rem 0" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes servicesAutoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .services-scroll-track {
          display: flex;
          gap: ${gap}px;
          width: max-content;
          animation: servicesAutoScroll 34s linear infinite;
          will-change: transform;
        }
        .services-scroll-track.paused {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .services-scroll-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* ── Seamless Auto-moving Track ── */}
      <div className={`services-scroll-track ${isPaused ? "paused" : ""}`}>
        {LOOPED_SERVICES.map((service, index) => {
          const { theme } = service;

          return (
            <motion.article
              key={`${service.id}-${index}`}
              id={index < SERVICES.length ? service.anchorId : undefined}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: `0 0 ${cardWidth}px`,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                backgroundColor: theme.bg,
                borderRadius: "14px",
                border: `1px solid ${theme.border}`,
                boxShadow: "0 8px 28px rgba(26,24,20,0.06)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: isMobile ? "1.15rem" : "1.35rem",
                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                position: "relative",
              }}
            >
              {/* ── Top Bar inside Card ── */}
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
                  }}
                />
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
      </div>
    </div>
  );
}

export default ServicesSlider;
