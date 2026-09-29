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

export interface ServiceItem {
  id: string;
  anchorId?: string;
  number: string;
  title: string;
  tag: string;
  desc: string;
  features: string[];
  img: string;
  to: string;
  ctaText: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "photography",
    anchorId: "photography",
    number: "01",
    title: "Photography",
    tag: "Commercial · Portrait · Fashion",
    desc: "Commercial, portrait, and documentary photography engineered with disciplined lighting, editorial composition, and raw emotional resonance.",
    features: ["Studio & Fashion Sessions", "Commercial Campaigns", "Event Documentary", "Editorial Retouching"],
    img: photographyImg,
    to: "/photography",
    ctaText: "Explore Photography",
  },
  {
    id: "branding",
    anchorId: "branding",
    number: "02",
    title: "Branding & Identity",
    tag: "Visual Systems · Strategy · Guidelines",
    desc: "Comprehensive brand architectures, bespoke logo marks, typography standards, and cohesive corporate identity packages built for longevity.",
    features: ["Bespoke Logo Design", "Full Brand Guidelines", "Stationery & Collateral", "Typography & Color Systems"],
    img: creativeConceptsImg,
    to: "/creative-concepts",
    ctaText: "Explore Branding",
  },
  {
    id: "advertising",
    anchorId: "advertising",
    number: "03",
    title: "Advertising Design",
    tag: "Campaigns · Billboards · Rollouts",
    desc: "High-conversion commercial campaign visuals, outdoor billboards, launch banners, and promotional collateral designed to capture instant attention.",
    features: ["Campaign Key Visuals", "Billboards & Large Format", "Promotional Rollouts", "Retail Graphics"],
    img: advertisingImg,
    to: "/graphic-design",
    ctaText: "Explore Advertising",
  },
  {
    id: "social-media",
    anchorId: "social-media",
    number: "04",
    title: "Social Media Creatives",
    tag: "Feed Systems · Carousels · Digital",
    desc: "Dynamic social suites, visual storytelling carousels, and high-impact digital graphics optimized for Instagram, LinkedIn, and omnichannel feeds.",
    features: ["Instagram Carousels", "Brand Social Suites", "Digital Ad Creatives", "Content Strategy Templates"],
    img: socialMediaImg,
    to: "/graphic-design",
    ctaText: "Explore Social Creatives",
  },
  {
    id: "creative-concepts",
    anchorId: "creative-concepts",
    number: "05",
    title: "Creative Concepts & UI/UX",
    tag: "Art Direction · Digital · Strategy",
    desc: "Multi-disciplinary art direction, bespoke web & digital interface concepts, and unified creative packages that blend photography with modern digital craft.",
    features: ["Creative Direction", "Digital Product UI/UX", "Interactive Prototypes", "Cross-Media Styling"],
    img: creativeDirectionImg,
    to: "/creative-concepts",
    ctaText: "Explore Concepts",
  },
  {
    id: "graphic-design",
    anchorId: "graphic-design",
    number: "06",
    title: "Print & Packaging Design",
    tag: "Packaging · Editorial · Merchandise",
    desc: "Tactile print materials, luxury stationery, merchandise, custom apparel, and retail packaging crafted with precise typographic finesse and print oversight.",
    features: ["Product & Box Packaging", "Apparel & Merchandise", "Editorial Publications", "Print Oversight & Proofing"],
    img: graphicDesignImg,
    to: "/graphic-design",
    ctaText: "Explore Print Design",
  },
];

export function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Measure container for responsive peek calculation
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Support hash navigation if user lands on or clicks #photography, #advertising, or #graphic-design
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const index = SERVICES_DATA.findIndex((s) => s.anchorId === hash || s.id === hash);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const total = SERVICES_DATA.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") {
        return;
      }
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
  }, [nextSlide, prevSlide]);

  // Determine refined, compact card widths based on viewport container
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  const cardWidth = isMobile
    ? Math.min(containerWidth - 56, 320)
    : isTablet
      ? Math.min(containerWidth * 0.48, 380)
      : Math.min(containerWidth * 0.35, 430);

  const gap = isMobile ? 14 : isTablet ? 18 : 22;

  // Center the active card in the container
  const centerOffset = containerWidth / 2 - cardWidth / 2;
  const targetX = centerOffset - currentIndex * (cardWidth + gap);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activeService = SERVICES_DATA[currentIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="iDESIGN Studio Services"
      className="outline-none focus-visible:ring-2 focus-visible:ring-[#c8a54a]/50 rounded-xl"
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
    >
      {/* ── Slider Navigation & Editorial Header Strip ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem 1.5rem 1.5rem",
        }}
      >
        <div>
          <div className="flex items-center gap-3" style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GOLD,
                fontWeight: 600,
              }}
            >
              Service {activeService.number} of {String(total).padStart(2, "0")}
            </span>
            <span style={{ width: 32, height: 1, background: GOLD, opacity: 0.6 }} />
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              {activeService.tag}
            </span>
          </div>

          {/* Minimal visual progress bar */}
          <div className="flex items-center gap-3" style={{ marginTop: "0.5rem" }}>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                color: currentIndex === 0 ? GOLD : MUTED,
                fontWeight: 600,
              }}
            >
              01
            </span>
            <div
              style={{
                width: "clamp(120px, 20vw, 220px)",
                height: "2px",
                background: BORDER,
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                animate={{
                  width: `${((currentIndex + 1) / total) * 100}%`,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                  borderRadius: "2px",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                color: currentIndex === total - 1 ? GOLD : MUTED,
                fontWeight: 600,
              }}
            >
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Minimal Previous & Next Controls */}
        <div className="flex items-center gap-3">
          {/* Dot navigation */}
          <div className="hidden md:flex items-center gap-1.5" style={{ marginRight: "0.75rem" }}>
            {SERVICES_DATA.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to service ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: idx === currentIndex ? GOLD : BORDER,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Prev Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous service"
            className="group"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentIndex === 0 ? "rgba(255,255,255,0.4)" : "#fff",
              border: `1px solid ${currentIndex === 0 ? "rgba(224,216,204,0.4)" : BORDER}`,
              color: currentIndex === 0 ? "#bbb" : DARK,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              boxShadow: currentIndex === 0 ? "none" : "0 2px 10px rgba(26,24,20,0.05)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = GOLD;
                e.currentTarget.style.transform = "translateX(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(200,165,74,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = DARK;
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(26,24,20,0.05)";
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentIndex === total - 1}
            aria-label="Next service"
            className="group"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentIndex === 0 ? "rgba(255,255,255,0.4)" : "#fff",
              border: `1px solid ${currentIndex === 0 ? "rgba(224,216,204,0.4)" : BORDER}`,
              color: currentIndex === 0 ? "#bbb" : DARK,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              boxShadow: currentIndex === 0 ? "none" : "0 2px 8px rgba(26,24,20,0.04)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = GOLD;
                e.currentTarget.style.transform = "translateX(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(200,165,74,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = DARK;
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(26,24,20,0.04)";
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentIndex === total - 1}
            aria-label="Next service"
            className="group"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentIndex === total - 1 ? "rgba(255,255,255,0.4)" : "#fff",
              border: `1px solid ${currentIndex === total - 1 ? "rgba(224,216,204,0.4)" : BORDER}`,
              color: currentIndex === total - 1 ? "#bbb" : DARK,
              cursor: currentIndex === total - 1 ? "not-allowed" : "pointer",
              boxShadow: currentIndex === total - 1 ? "none" : "0 2px 8px rgba(26,24,20,0.04)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (currentIndex < total - 1) {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = GOLD;
                e.currentTarget.style.transform = "translateX(2px)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(200,165,74,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex < total - 1) {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = DARK;
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(26,24,20,0.04)";
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Horizontal Draggable Track ── */}
      <div style={{ position: "relative", width: "100%", padding: "0.25rem 0 1.5rem 0" }}>
        <motion.div
          ref={sliderTrackRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setTimeout(() => setIsDragging(false), 60);
            const threshold = 45;
            const velocityThreshold = 220;
            if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
              nextSlide();
            } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
              prevSlide();
            }
          }}
          animate={{ x: targetX }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "flex",
            gap: `${gap}px`,
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
            userSelect: "none",
          }}
        >
          {SERVICES_DATA.map((service, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === currentIndex - 1;
            const isNext = index === currentIndex + 1;

            return (
              <motion.article
                key={service.id}
                id={service.anchorId}
                aria-roledescription="slide"
                aria-label={`${service.number} of ${total}: ${service.title}`}
                aria-current={isActive ? "true" : undefined}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                    return;
                  }
                  if (!isActive) {
                    e.preventDefault();
                    setCurrentIndex(index);
                  }
                }}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  width: `${cardWidth}px`,
                  background: "#ffffff",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: `1px solid ${isActive ? "rgba(200,165,74,0.4)" : BORDER}`,
                  boxShadow: isActive
                    ? "0 24px 60px -15px rgba(26,24,20,0.12), 0 2px 8px rgba(200,165,74,0.1)"
                    : "0 4px 20px rgba(26,24,20,0.04)",
                  cursor: isActive ? "default" : "pointer",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  position: "relative",
                }}
              >
                {/* Image Container with Refined Aspect Ratio */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: isMobile ? "160px" : isTablet ? "185px" : "210px",
                    overflow: "hidden",
                    backgroundColor: DARKER,
                  }}
                >
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    loading={index <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    animate={{
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Dark subtle vignette overlay for contrast and typography */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(13,12,9,0.55) 0%, rgba(13,12,9,0.1) 40%, transparent 80%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.9rem",
                      left: "0.9rem",
                      right: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Service Number Tag */}
                    <div
                      style={{
                        background: "rgba(13,12,9,0.78)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(200,165,74,0.35)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: GOLD,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.68rem",
                          letterSpacing: "0.15em",
                          color: WHITE,
                          fontWeight: 600,
                        }}
                      >
                        {service.number}
                      </span>
                    </div>

                    {/* Active Status Badge */}
                    {isActive && (
                      <div
                        style={{
                          background: "rgba(200,165,74,0.92)",
                          backdropFilter: "blur(8px)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "4px",
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.58rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: WHITE,
                          fontWeight: 600,
                        }}
                      >
                        Active Focus
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Editorial Content */}
                <div
                  style={{
                    padding: isMobile ? "1rem 1.15rem" : "1.25rem 1.45rem 1.35rem 1.45rem",
                  }}
                >
                  {/* Category Tag */}
                  <div className="flex items-center gap-2" style={{ marginBottom: "0.45rem" }}>
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: GOLD,
                        fontWeight: 600,
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: isMobile ? "1.2rem" : "1.45rem",
                      lineHeight: "1.15",
                      letterSpacing: "-0.02em",
                      color: DARK,
                      marginBottom: "0.45rem",
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.84rem",
                      fontWeight: 300,
                      lineHeight: "1.6",
                      color: MUTED,
                      marginBottom: "1rem",
                      maxWidth: "580px",
                    }}
                  >
                    {service.desc}
                  </p>

                  {/* Key Capabilities Pills */}
                  <div
                    className="flex flex-wrap gap-1.5"
                    style={{
                      marginBottom: "1.1rem",
                      paddingBottom: "0.9rem",
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                  >
                    {service.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.58rem",
                          letterSpacing: "0.05em",
                          color: DARK,
                          background: SURFACE,
                          padding: "0.22rem 0.55rem",
                          borderRadius: "3px",
                          border: `1px solid ${BORDER}`,
                        }}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Footer */}
                  <div className="flex items-center justify-between">
                    <Link
                      to={service.to}
                      onClick={(e) => {
                        if (isDragging) {
                          e.preventDefault();
                        }
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontFamily: "'Work Sans',sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        padding: "0.55rem 1.25rem",
                        background: isActive ? GOLD : "transparent",
                        color: isActive ? WHITE : GOLD,
                        border: `1px solid ${GOLD}`,
                        borderRadius: "3px",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (isActive) {
                          e.currentTarget.style.background = GOLD_LIGHT;
                          e.currentTarget.style.borderColor = GOLD_LIGHT;
                          e.currentTarget.style.boxShadow = "0 6px 18px rgba(200,165,74,0.3)";
                        } else {
                          e.currentTarget.style.background = GOLD;
                          e.currentTarget.style.color = WHITE;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isActive) {
                          e.currentTarget.style.background = GOLD;
                          e.currentTarget.style.borderColor = GOLD;
                          e.currentTarget.style.boxShadow = "none";
                        } else {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = GOLD;
                        }
                      }}
                    >
                      <span>{service.ctaText}</span>
                      <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>→</span>
                    </Link>

                    {/* Subtle status indicator */}
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        color: MUTED,
                        textTransform: "uppercase",
                      }}
                    >
                      {isActive ? "Viewing 0" + (index + 1) : "Click to view"}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* ── Mobile/Tablet Swipe Hint ── */}
      <div
        className="flex items-center justify-center gap-2 text-center md:hidden"
        style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
      >
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          ← Drag or swipe cards to navigate →
        </span>
      </div>
    </div>
  );
}

export default ServicesSlider;
