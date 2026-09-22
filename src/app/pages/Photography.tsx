import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";

import blueMenPedestal from "@/imports/Photography/Commercial/blue-for-men-pedestal.jpg";
import blueMenSplashLight from "@/imports/Photography/Commercial/blue-for-men-splash-light.jpg";
import blueMenRosesVertical from "@/imports/Photography/Commercial/blue-for-men-roses-vertical.jpg";
import blueMenWaterSplash from "@/imports/Photography/Commercial/blue-for-men-water-splash.jpg";
import blueMenSmokeBox from "@/imports/Photography/Commercial/blue-for-men-smoke-box.jpg";

const CATEGORIES = ["All", "Product", "Commercial", "Portrait", "Documentary", "Still Life"];

interface PhotoItem extends LightboxItem {
  id: number;
  tall: boolean;
  cat: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 1,
    title: "Blue for Men — Liquid Splash & Light",
    cat: "Product",
    category: "Product",
    img: blueMenSplashLight,
    tall: false,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "High-speed water splash capture highlighting precision rim lighting, crisp droplet kinetics, and crystal glass reflections.",
  },
  {
    id: 2,
    title: "Blue for Men — Midnight Botanical",
    cat: "Product",
    category: "Product",
    img: blueMenRosesVertical,
    tall: true,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Vertical editorial flacon study with midnight backdrop, aqua rose floral accents, and pristine mirrored surface reflections.",
  },
  {
    id: 3,
    title: "Blue for Men — Kinetic Aqua Crown",
    cat: "Product",
    category: "Product",
    img: blueMenWaterSplash,
    tall: true,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Dynamic fluid crown sculpted around luxury cologne packaging with rising ambient smoke trails.",
  },
  {
    id: 4,
    title: "Blue for Men — Atmospheric Haze",
    cat: "Product",
    category: "Product",
    img: blueMenSmokeBox,
    tall: false,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Commercial still blending high-contrast black backdrop, liquid splash dynamics, and swirling atmospheric mist.",
  },
  {
    id: 5,
    title: "Blue for Men — Studio Pedestal",
    cat: "Product",
    category: "Product",
    img: blueMenPedestal,
    tall: false,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Minimalist pedestal showcase highlighting the architectural flacon silhouette.",
  },
  {
    id: 6,
    title: "Fog & Light",
    cat: "Documentary",
    category: "Documentary",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    year: "2024",
    description: "Atmospheric dawn capture illustrating the interplay of morning mist and golden mountain ridgelines.",
  },
  {
    id: 7,
    title: "Golden Hour Coast",
    cat: "Commercial",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=1600&h=1000&fit=crop&auto=format",
    tall: false,
    client: "Horizon Travel",
    year: "2024",
    description: "Campaign visual for sustainable luxury coastal travel destination.",
  },
  {
    id: 8,
    title: "Solstice Ritual",
    cat: "Documentary",
    category: "Documentary",
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    year: "2023",
    description: "Natural light documentary study on quiet spaces and tranquil Scandinavian geography.",
  },
  {
    id: 9,
    title: "Botanical Still Life No. 7",
    cat: "Still Life",
    category: "Still Life",
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=1600&h=1100&fit=crop&auto=format",
    tall: false,
    client: "Flora Atelier",
    year: "2023",
    description: "Minimalist floral composition highlighting soft texture gradients and balanced shadow play.",
  },
  {
    id: 10,
    title: "Editorial Studio Portrait",
    cat: "Portrait",
    category: "Portrait",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Vogue Creative Spotlight",
    year: "2024",
    description: "High-contrast editorial portrait capturing strength, quiet presence, and organic skin tones.",
  },
  {
    id: 11,
    title: "Brand Story & Craft",
    cat: "Commercial",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&h=1000&fit=crop&auto=format",
    tall: false,
    client: "Heritage Makers Co.",
    year: "2023",
    description: "Authentic behind-the-scenes craft documentation showcasing artisanal handiwork.",
  },
  {
    id: 12,
    title: "Urban Fragment",
    cat: "Documentary",
    category: "Documentary",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=1100&fit=crop&auto=format",
    tall: false,
    year: "2023",
    description: "Geometric lines, architectural shadows, and metropolitan movement.",
  },
  {
    id: 13,
    title: "Quiet Interior & Form",
    cat: "Still Life",
    category: "Still Life",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Nordic Living Studio",
    year: "2024",
    description: "Interior architectural study focusing on green velvet furnishings and serene ambient light.",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Photography() {
  useEffect(() => {
    document.title = "Photography Portfolio — iDESIGN Studio";
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    return PHOTOS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.cat === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingBottom: "4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1800&h=900&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,12,9,0.92) 0%, rgba(13,12,9,0.4) 60%, rgba(13,12,9,0.1) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(2rem,8vw,8rem)", maxWidth: "700px" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: "0.75rem",
            }}
          >
            — Visual Storytelling
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.025em",
              color: WHITE,
              marginBottom: "1rem",
            }}
          >
            Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.62)",
              maxWidth: "460px",
            }}
          >
            Commercial, portrait, and documentary work that captures truth and communicates without words. Click any
            photo to inspect in full resolution.
          </motion.p>
        </div>
      </section>

      {/* Category filter & Search Bar */}
      <section style={{ padding: "3rem 2rem 1.5rem", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Search bar */}
        <div style={{ maxWidth: "480px", margin: "0 auto 1.5rem", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${searchQuery ? GOLD : BORDER}`,
              borderRadius: "4px",
              padding: "0.5rem 0.9rem",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: searchQuery ? "0 0 16px rgba(200, 165, 74, 0.2)" : "none",
            }}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke={searchQuery ? GOLD : MUTED}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "0.6rem", flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, title, product, lighting..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.85rem",
                color: DARK,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: MUTED,
                  fontSize: "1rem",
                  padding: "0 0.2rem",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const count = c === "All" ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c).length;
            const isSelected = activeCategory === c;
            return (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1.1rem",
                  border: `1px solid ${isSelected ? GOLD : BORDER}`,
                  background: isSelected ? GOLD : "transparent",
                  color: isSelected ? WHITE : MUTED,
                  cursor: "pointer",
                  borderRadius: "3px",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span>{c}</span>
                <span
                  style={{
                    opacity: 0.8,
                    fontSize: "0.6rem",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "10px",
                    background: isSelected ? "rgba(0,0,0,0.18)" : "rgba(13,12,9,0.06)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results indicator */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Showing {filteredPhotos.length} of {PHOTOS.length} showcase photographs
          </span>
          {(searchQuery || activeCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              style={{
                marginLeft: "0.8rem",
                background: "transparent",
                border: "none",
                color: GOLD,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Gallery grid section */}
      <section style={{ padding: "1.5rem 2rem 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        {filteredPhotos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1.5rem",
              background: SURFACE,
              border: `1px dashed ${BORDER}`,
              borderRadius: "8px",
            }}
          >
            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.35rem", color: DARK, marginBottom: "0.5rem" }}>
              No showcase photographs found
            </p>
            <p style={{ fontFamily: "'Work Sans',sans-serif", fontSize: "0.875rem", color: MUTED, marginBottom: "1.5rem" }}>
              No matches found for &quot;{searchQuery}&quot; under &quot;{activeCategory}&quot;. Try adjusting your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              style={{
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.75rem 1.8rem",
                background: GOLD,
                color: WHITE,
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {filteredPhotos.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4px",
                  background: SURFACE,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setLightboxIndex(i)}
              >
                <div style={{ paddingBottom: p.tall ? "120%" : "75%", position: "relative" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    animate={{
                      scale: hovered === p.id ? 1.06 : 1,
                      filter: hovered === p.id ? "brightness(0.35)" : "brightness(0.92)",
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Hover overlay hint */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "1.25rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <motion.span
                        animate={{ opacity: hovered === p.id ? 1 : 0, scale: hovered === p.id ? 1 : 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: "rgba(200, 165, 74, 0.9)",
                          color: WHITE,
                          padding: "0.25rem 0.6rem",
                          borderRadius: "3px",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        VIEW FULL ↗
                      </motion.span>
                    </div>

                    <div>
                      <motion.span
                        animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 6 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.58rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: GOLD,
                          marginBottom: "0.25rem",
                          display: "block",
                        }}
                      >
                        {p.cat} {p.year ? `• ${p.year}` : ""}
                      </motion.span>
                      <motion.h3
                        animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 8 }}
                        transition={{ duration: 0.28, delay: 0.04 }}
                        style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.2rem", color: WHITE }}
                      >
                        {p.title}
                      </motion.h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Services offered */}
      <section style={{ background: SURFACE, padding: "5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "0.75rem",
                }}
              >
                — What We Shoot
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.75rem)",
                  color: DARK,
                }}
              >
                Photography Services
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Product", desc: "Studio-grade cosmetic, fragrance, and e-commerce visuals with splash dynamics and rim lighting." },
              { title: "Commercial", desc: "Brand lifestyle and advertising photography engineered to build customer trust and elevate campaigns." },
              { title: "Portrait", desc: "Individual, team, and executive portraiture in studio or on location." },
              { title: "Documentary", desc: "Event and editorial coverage that captures real moments authentically." },
              { title: "Still Life", desc: "Precision product and object photography for luxury catalogues and print." },
            ].map(({ title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: "1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "1.2rem",
                      color: DARK,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      lineHeight: "1.7",
                      color: MUTED,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: DARKER,
          padding: "4rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&h=400&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(1.8rem,4vw,2.75rem)",
              color: WHITE,
              marginBottom: "1rem",
            }}
          >
            Book a photography session
          </h2>
          <p
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "2rem",
            }}
          >
            Commercial, portrait, or documentary — let's capture it right.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.9rem 2.25rem",
                background: GOLD,
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Book Now →
            </Link>
            <a
              href={`https://wa.me/233502330663?text=${encodeURIComponent(
                "Hello iDESIGN! I would like to book a photography session."
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.9rem 2rem",
                background: "transparent",
                color: WHITE,
                border: "1px solid rgba(255,255,255,0.35)",
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              WhatsApp Us 💬
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
