import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";

// Commercial / Product photography imports (Blue for Men shoot)
import blueMenPedestal from "@/imports/Photography/Commercial/blue-for-men-pedestal.jpg";
import blueMenSplashLight from "@/imports/Photography/Commercial/blue-for-men-splash-light.jpg";
import blueMenRosesVertical from "@/imports/Photography/Commercial/blue-for-men-roses-vertical.jpg";
import blueMenWaterSplash from "@/imports/Photography/Commercial/blue-for-men-water-splash.jpg";
import blueMenSmokeBox from "@/imports/Photography/Commercial/blue-for-men-smoke-box.jpg";

const CATEGORIES = [
  "All",
  "Commercial / Product",
  "Fashion / Editorial",
  "Portrait",
  "Beauty",
  "Food",
  "Events / Weddings",
];

interface PhotoItem extends LightboxItem {
  id: number;
  tall: boolean;
  cat: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 1,
    title: "Blue for Men — Studio Spotlight",
    cat: "Commercial / Product",
    category: "Commercial / Product",
    img: blueMenPedestal,
    tall: false,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Atmospheric commercial shoot featuring dynamic mist spray on an illuminated circular podium with dense cinematic haze.",
  },
  {
    id: 2,
    title: "Blue for Men — Liquid Splash & Light",
    cat: "Commercial / Product",
    category: "Commercial / Product",
    img: blueMenSplashLight,
    tall: false,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "High-speed water splash capture highlighting precision rim lighting, crisp droplet kinetics, and crystal glass reflections.",
  },
  {
    id: 3,
    title: "Blue for Men — Midnight Botanical",
    cat: "Commercial / Product",
    category: "Commercial / Product",
    img: blueMenRosesVertical,
    tall: true,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Vertical editorial flacon study with midnight backdrop, aqua rose floral accents, and pristine mirrored surface reflections.",
  },
  {
    id: 4,
    title: "Blue for Men — Kinetic Aqua Crown",
    cat: "Commercial / Product",
    category: "Commercial / Product",
    img: blueMenWaterSplash,
    tall: true,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Dynamic fluid crown sculpted around luxury cologne packaging with rising ambient smoke trails.",
  },
  {
    id: 5,
    title: "Blue for Men — Atmospheric Haze",
    cat: "Commercial / Product",
    category: "Commercial / Product",
    img: blueMenSmokeBox,
    tall: false,
    client: "Blue for Men Fragrance",
    year: "2024",
    description: "Commercial still blending high-contrast black backdrop, liquid splash dynamics, and swirling atmospheric mist.",
  },
  {
    id: 6,
    title: "High Fashion Editorial",
    cat: "Fashion / Editorial",
    category: "Fashion / Editorial",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Editorial Studio",
    year: "2024",
    description: "Contemporary fashion lookbook and styled studio editorial.",
  },
  {
    id: 7,
    title: "Executive Studio Portrait",
    cat: "Portrait",
    category: "Portrait",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Studio Sessions",
    year: "2024",
    description: "High-contrast studio portrait capturing executive presence and organic skin tones.",
  },
  {
    id: 8,
    title: "Radiant Skin & Glow",
    cat: "Beauty",
    category: "Beauty",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&h=1200&fit=crop&auto=format",
    tall: false,
    client: "Cosmetic Aesthetics",
    year: "2024",
    description: "Close-up skincare and beauty aesthetics with natural luminous lighting.",
  },
  {
    id: 9,
    title: "Artisanal Culinary Capture",
    cat: "Food",
    category: "Food",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=1200&fit=crop&auto=format",
    tall: false,
    client: "Gourmet Kitchen",
    year: "2024",
    description: "Vibrant culinary styling showcasing rich textures and fresh ingredients.",
  },
  {
    id: 10,
    title: "Ceremony & Celebration",
    cat: "Events / Weddings",
    category: "Events / Weddings",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=1200&fit=crop&auto=format",
    tall: true,
    client: "Private Client",
    year: "2024",
    description: "Authentic milestone celebration capturing emotion, elegance, and connection.",
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
            backgroundImage: `url(${blueMenPedestal})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
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

      {/* Filter + Search + Gallery */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <FadeUp>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.5rem 1.15rem",
                    border: `1px solid ${activeCategory === c ? GOLD : BORDER}`,
                    background: activeCategory === c ? GOLD : "transparent",
                    color: activeCategory === c ? WHITE : MUTED,
                    cursor: "pointer",
                    borderRadius: "3px",
                    transition: "all 0.2s",
                  }}
                >
                  {c}
                </motion.button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div style={{ position: "relative", minWidth: "240px" }}>
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "20px",
                  padding: "0.5rem 1.25rem 0.5rem 2.25rem",
                  fontSize: "0.82rem",
                  fontFamily: "'Work Sans', sans-serif",
                  color: DARK,
                  outline: "none",
                  width: "100%",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
                onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
              />
              <span
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.8rem",
                  color: MUTED,
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    fontSize: "0.8rem",
                    color: MUTED,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </FadeUp>

        {/* Gallery count / notice */}
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: MUTED, letterSpacing: "0.08em" }}>
            Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? "work" : "works"}
          </p>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: GOLD }}>
            ✦ Click any image for full-screen view
          </span>
        </div>

        {/* Masonry-style grid */}
        {filteredPhotos.length === 0 ? (
          <div
            style={{
              padding: "5rem 2rem",
              textAlign: "center",
              background: SURFACE,
              borderRadius: "8px",
              border: `1px dashed ${BORDER}`,
            }}
          >
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: DARK, marginBottom: "0.5rem" }}>
              No photographs found
            </p>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.9rem", color: MUTED, marginBottom: "1.5rem" }}>
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                padding: "0.5rem 1.25rem",
                background: GOLD,
                color: WHITE,
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Reset Filters
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Commercial / Product", desc: "High-impact product, cosmetic, and brand visuals engineered for campaigns, packaging, and digital advertising." },
              { title: "Fashion / Editorial", desc: "Styled lookbooks, designer collections, model portfolios, and runway-inspired editorial visuals." },
              { title: "Portrait", desc: "Executive, creative, and individual studio portraiture that projects authenticity, character, and command." },
              { title: "Beauty", desc: "Flawless skincare, makeup aesthetics, and cosmetic product details lit with studio precision." },
              { title: "Food", desc: "Appetizing culinary styling and restaurant dish captures highlighting vibrant texture and flavour." },
              { title: "Events / Weddings", desc: "Documentary-grade milestone storytelling capturing every emotion, vow, and celebration." },
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
