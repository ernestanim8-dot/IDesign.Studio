import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GOLD, WHITE } from "@/tokens";

import photographyImg from "@/imports/Photography/Portrait/Birthday/IMG_1168.jpg";
import creativeConceptsImg from "@/imports/Branding/SWGC/SWGC MOCKUP copy.jpg";
import advertisingImg from "@/imports/Advertising/Tina Special Bundle/Tina-1.jpg";
import socialMediaImg from "@/imports/Advertising/Fashion/Fashion copy.jpg";
import creativeDirectionImg from "@/imports/Branding/IDesign/Notebook 2.jpg";
import graphicDesignImg from "@/imports/Branding/IDesign/Notebook.jpg";
import eventImg from "@/imports/Photography/Events/graduation-2025/gctu-2025-02-cap-and-scroll.jpg";
import foodImg from "@/imports/Photography/Food/Frosty Bite/IMG_0006.jpg";
import logoDesignImg from "@/imports/Branding/EC LOGO/3D Wall Logo MockUp 2.jpg";
import beautyImg from "@/imports/Advertising/Adom Beauty/Adom Beauty copy.jpg";

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
  {
    id: "event-photography",
    anchorId: "event-photography",
    number: "07",
    title: "Event Photography",
    tag: "Ceremonies & Milestones",
    desc: "Graduation ceremonies, corporate galas, investitures, and landmark occasions documented with unobtrusive precision and emotional clarity.",
    img: eventImg,
    to: "/photography",
    theme: {
      bg: "#0f0e17",
      text: "#ffffff",
      descColor: "rgba(255,255,255,0.62)",
      border: "rgba(180,155,220,0.22)",
      accent: "#b49bdc",
      tagBg: "rgba(180,155,220,0.12)",
      btnBg: "rgba(180,155,220,0.14)",
      btnText: "#ffffff",
      btnBorder: "rgba(180,155,220,0.35)",
      isDark: true,
    },
  },
  {
    id: "food-photography",
    anchorId: "food-photography",
    number: "08",
    title: "Food Photography",
    tag: "Product & Culinary",
    desc: "Studio-controlled and on-location food styling, beverage campaigns, and restaurant menu visuals engineered for appetite appeal.",
    img: foodImg,
    to: "/photography",
    theme: {
      bg: "#fdf7ee",
      text: "#1c1713",
      descColor: "#6e6154",
      border: "#e8dac8",
      accent: "#c07c2a",
      tagBg: "rgba(192, 124, 42, 0.1)",
      btnBg: "#1c1713",
      btnText: "#ffffff",
      btnBorder: "#1c1713",
      isDark: false,
    },
  },
  {
    id: "logo-design",
    anchorId: "logo-design",
    number: "09",
    title: "Logo & Corporate ID",
    tag: "Mark & Symbol Design",
    desc: "Bespoke logomarks, wordmarks, and full corporate identity systems built to project authority across every medium and surface.",
    img: logoDesignImg,
    to: "/creative-concepts",
    theme: {
      bg: "#111318",
      text: "#ffffff",
      descColor: "rgba(255,255,255,0.63)",
      border: "rgba(100,180,255,0.2)",
      accent: "#64b4ff",
      tagBg: "rgba(100,180,255,0.1)",
      btnBg: "rgba(100,180,255,0.14)",
      btnText: "#ffffff",
      btnBorder: "rgba(100,180,255,0.32)",
      isDark: true,
    },
  },
  {
    id: "beauty-cosmetics",
    anchorId: "beauty-cosmetics",
    number: "10",
    title: "Beauty & Cosmetics",
    tag: "Glamour Campaigns",
    desc: "High-gloss beauty campaigns, skincare and cosmetic brand visuals, and luxury product photography for premium market positioning.",
    img: beautyImg,
    to: "/graphic-design",
    theme: {
      bg: "#1a0d18",
      text: "#ffffff",
      descColor: "rgba(255,255,255,0.64)",
      border: "rgba(230,140,180,0.22)",
      accent: "#e68cb4",
      tagBg: "rgba(230,140,180,0.12)",
      btnBg: "rgba(230,140,180,0.14)",
      btnText: "#ffffff",
      btnBorder: "rgba(230,140,180,0.32)",
      isDark: true,
    },
  },
];

const AUTO_MS = 300_000;

function wrap(i: number, len: number) {
  return ((i % len) + len) % len;
}

export function ServicesSlider() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const dirRef = useRef<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<() => void>(() => {});
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Keep advanceRef fresh on every render
  useEffect(() => {
    advanceRef.current = () => {
      dirRef.current = 1;
      setActiveIndex((prev) => wrap(prev + 1, SERVICES.length));
    };
  });

  const startInterval = useCallback(() => {
    if (prefersReduced) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => advanceRef.current(), AUTO_MS);
  }, [prefersReduced]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => { startInterval(); return stopInterval; }, [startInterval, stopInterval]);

  useEffect(() => {
    if (isInteracting) stopInterval(); else startInterval();
  }, [isInteracting, startInterval, stopInterval]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const goPrev = useCallback(() => {
    dirRef.current = -1;
    setActiveIndex((prev) => wrap(prev - 1, SERVICES.length));
    startInterval();
  }, [startInterval]);

  const goNext = useCallback(() => {
    dirRef.current = 1;
    setActiveIndex((prev) => wrap(prev + 1, SERVICES.length));
    startInterval();
  }, [startInterval]);

  const goTo = useCallback((i: number, current: number) => {
    dirRef.current = i >= current ? 1 : -1;
    setActiveIndex(i);
    startInterval();
  }, [startInterval]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
  }, [goPrev, goNext]);

  const onPointerDown = useCallback((clientX: number) => {
    dragStartX.current = clientX; isDragging.current = false; setIsInteracting(true);
  }, []);
  const onPointerUp = useCallback((clientX: number) => {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 40) { isDragging.current = true; delta < 0 ? goNext() : goPrev(); }
    dragStartX.current = null; setIsInteracting(false);
  }, [goNext, goPrev]);

  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  const cardW = isMobile ? Math.min(containerWidth - 64, 305) : isTablet ? 340 : 380;
  const cardH = isMobile ? 360 : 390;

  const service = SERVICES[activeIndex];
  const { theme } = service;

  const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const easeIn = [0.4, 0, 1, 1] as [number, number, number, number];

  const variants = {
    enter: (dir: 1 | -1) => ({ x: prefersReduced ? 0 : dir * 80, opacity: 0, scale: prefersReduced ? 1 : 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOut } },
    exit: (dir: 1 | -1) => ({ x: prefersReduced ? 0 : dir * -80, opacity: 0, scale: prefersReduced ? 1 : 0.96, transition: { duration: 0.35, ease: easeIn } }),
  };

  const btnBase: React.CSSProperties = {
    width: 38, height: 38, borderRadius: "50%",
    border: "1px solid rgba(200,165,74,0.35)",
    background: "rgba(200,165,74,0.08)", color: GOLD,
    fontSize: "1.1rem", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s ease", flexShrink: 0,
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="iDESIGN Studio Services Showcase"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
      onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
      onMouseDown={(e) => onPointerDown(e.clientX)}
      onMouseUp={(e) => onPointerUp(e.clientX)}
      style={{ position: "relative", width: "100%", padding: "0.5rem 0 2.5rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", outline: "none", userSelect: "none", cursor: "grab" }}
    >
      {/* ── Card Stage ── */}
      <div style={{ position: "relative", width: cardW, height: cardH }} aria-live="polite" aria-atomic="true">
        <AnimatePresence custom={dirRef.current} mode="popLayout">
          <motion.article
            key={service.id}
            custom={dirRef.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            id={service.anchorId}
            aria-label={`${service.title}: ${service.desc}`}
            style={{ position: "absolute", inset: 0, backgroundColor: theme.bg, borderRadius: "14px", border: `1px solid ${theme.border}`, boxShadow: "0 12px 48px rgba(26,24,20,0.12)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: isMobile ? "1.15rem" : "1.35rem" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between" style={{ zIndex: 2 }}>
              <div className="flex items-center gap-2">
                <span style={{ width: 14, height: 1, background: theme.accent, opacity: 0.6 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: theme.descColor, fontWeight: 500 }}>
                  {service.tag}
                </span>
              </div>
              <Link
                to={service.to}
                aria-label={`Explore ${service.title}`}
                onClick={(e) => { if (isDragging.current) e.preventDefault(); }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "'Work Sans',sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.35rem 0.75rem", borderRadius: "20px", backgroundColor: theme.btnBg, color: theme.btnText, border: `1px solid ${theme.btnBorder}`, textDecoration: "none", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = WHITE; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.btnBg; e.currentTarget.style.borderColor = theme.btnBorder; e.currentTarget.style.color = theme.btnText; }}
              >
                <span>Explore</span>
                <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>↗</span>
              </Link>
            </div>

            {/* Image */}
            <div style={{ position: "relative", width: "100%", height: isMobile ? "165px" : "185px", borderRadius: "8px", overflow: "hidden", backgroundColor: theme.isDark ? "#080706" : "#e8e2d5", border: `1px solid ${theme.border}`, margin: "0.75rem 0" }}>
              <img src={service.img} alt={service.title} loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: theme.isDark ? "linear-gradient(to top,rgba(13,12,9,0.45) 0%,transparent 55%)" : "linear-gradient(to top,rgba(0,0,0,0.18) 0%,transparent 50%)", pointerEvents: "none" }} />
            </div>

            {/* Content */}
            <div style={{ zIndex: 2 }}>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: isMobile ? "1.25rem" : "1.45rem", lineHeight: "1.15", letterSpacing: "-0.015em", color: theme.text, marginBottom: "0.35rem" }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: "'Work Sans',sans-serif", fontSize: "0.8rem", fontWeight: 300, lineHeight: "1.55", color: theme.descColor, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 }}>
                {service.desc}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={goPrev} aria-label="Previous service" style={btnBase}
          onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#141310"; e.currentTarget.style.borderColor = GOLD; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200,165,74,0.08)"; e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = "rgba(200,165,74,0.35)"; }}>
          ←
        </button>

        <div role="tablist" aria-label="Service selection" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${s.title}`}
              onClick={() => goTo(i, activeIndex)}
              style={{ width: i === activeIndex ? 22 : 7, height: 7, borderRadius: 4, border: "none", background: i === activeIndex ? GOLD : "rgba(200,165,74,0.25)", cursor: "pointer", padding: 0, transition: "all 0.3s ease", flexShrink: 0 }}
            />
          ))}
        </div>

        <button onClick={goNext} aria-label="Next service" style={btnBase}
          onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#141310"; e.currentTarget.style.borderColor = GOLD; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200,165,74,0.08)"; e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = "rgba(200,165,74,0.35)"; }}>
          →
        </button>
      </div>

      {/* ── Progress bar ── */}
      {!prefersReduced && (
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(200,165,74,0.12)", overflow: "hidden" }}>
          <motion.div
            key={`progress-${activeIndex}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInteracting ? 0 : 1 }}
            transition={isInteracting ? { duration: 0 } : { duration: AUTO_MS / 1000, ease: "linear" }}
            style={{ height: "100%", background: GOLD, transformOrigin: "left center" }}
          />
        </div>
      )}
    </div>
  );
}

export default ServicesSlider;
