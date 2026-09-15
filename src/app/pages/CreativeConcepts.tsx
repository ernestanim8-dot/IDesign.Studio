import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";

const PACKAGES = [
  {
    id: "starter",
    name: "Starter Package",
    basePrice: 800,
    priceDisplay: "From $800",
    turnaround: "10-14 business days",
    features: [
      "Logo design (2 core concepts + 2 revision rounds)",
      "Business card design & print-ready files",
      "Curated color palette & typography guide",
      "Vector & raster digital deliverables",
    ],
    highlight: false,
  },
  {
    id: "studio",
    name: "Studio Complete",
    basePrice: 2200,
    priceDisplay: "From $2,200",
    turnaround: "3-4 weeks",
    features: [
      "Full brand visual identity & logo marks",
      "Stationery suite (letterhead, envelope, cards)",
      "Comprehensive 24-page brand guidelines",
      "Social media visual template kit (12 assets)",
      "2 on-location or studio photography sessions",
      "Direct print oversight & proofing",
    ],
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Brand Suite",
    basePrice: 4500,
    priceDisplay: "From $4,500",
    turnaround: "5-6 weeks",
    features: [
      "Everything in Studio Complete",
      "Bespoke 5-page responsive portfolio/website",
      "Full campaign art direction & styling",
      "Packaging & merchandise design",
      "Ongoing monthly retainer option",
      "Dedicated senior creative director",
    ],
    highlight: false,
  },
];

interface AddOn {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const ADD_ONS: AddOn[] = [
  {
    id: "photo_session",
    name: "Extra Half-Day Photography Session",
    price: 450,
    desc: "3 hours on location or studio, 25 retouched high-res images.",
  },
  {
    id: "stationery_print",
    name: "Premium Stationery Print Run (500 units)",
    price: 280,
    desc: "350gsm matte paper with gold foil stamped accents.",
  },
  {
    id: "social_templates",
    name: "Animated Social Media Templates",
    price: 350,
    desc: "Figma & Canva kit with motion graphics for Instagram/LinkedIn.",
  },
  {
    id: "website_build",
    name: "Custom Responsive Portfolio / Web App",
    price: 1200,
    desc: "Modern, high-performance website with custom domain wiring.",
  },
  {
    id: "express_delivery",
    name: "Express Priority Turnaround",
    price: 400,
    desc: "Dedicate front-of-queue scheduling to compress timeline by 40%.",
  },
];

interface ConceptProject extends LightboxItem {
  id: number;
  client: string;
  wide: boolean;
}

const PROJECTS: ConceptProject[] = [
  {
    id: 1,
    title: "Vessel Brand Identity",
    client: "Vessel Co.",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1400&h=900&fit=crop&auto=format",
    wide: true,
    category: "Brand & Packaging",
    year: "2024",
    description: "Complete identity system, packaging range, and botanical art direction.",
  },
  {
    id: 2,
    title: "Arbor Full Concept & Print",
    client: "Arbor Foods",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=1200&fit=crop&auto=format",
    wide: false,
    category: "Identity & Strategy",
    year: "2023",
    description: "Eco-conscious visual language, bespoke iconography, and printed brand collateral.",
  },
  {
    id: 3,
    title: "Soleil Identity & Campaign",
    client: "Soleil Spa",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=1200&fit=crop&auto=format",
    wide: false,
    category: "Art Direction",
    year: "2023",
    description: "Serene warm minimalism, editorial photography direction, and print suite.",
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

export function CreativeConcepts() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Quote Calculator State
  const [selectedPackageId, setSelectedPackageId] = useState<string>("studio");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(["photo_session"]);

  const currentPackage = useMemo(() => {
    return PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];
  }, [selectedPackageId]);

  const activeAddOns = useMemo(() => {
    return ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id));
  }, [selectedAddOnIds]);

  const totalPrice = useMemo(() => {
    const addOnsTotal = activeAddOns.reduce((acc, curr) => acc + curr.price, 0);
    return currentPackage.basePrice + addOnsTotal;
  }, [currentPackage, activeAddOns]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const constructWhatsAppQuote = () => {
    const addOnsList =
      activeAddOns.length > 0
        ? activeAddOns.map((a) => `  + ${a.name} ($${a.price})`).join("\n")
        : "  (None)";

    const message = [
      "👋 Hello iDESIGN Studio!",
      "",
      "I used your online package calculator to configure an estimate:",
      `• Base Tier: ${currentPackage.name} ($${currentPackage.basePrice})`,
      `• Estimated Base Turnaround: ${currentPackage.turnaround}`,
      "• Selected Add-Ons:",
      addOnsList,
      "",
      `💰 Estimated Total: $${totalPrice.toLocaleString()}`,
      "",
      "Could we discuss timeline and confirm availability?",
    ].join("\n");

    return encodeURIComponent(message);
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "7rem 2rem 5rem",
          background: DARKER,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1800&h=700&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
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
              marginBottom: "1rem",
            }}
          >
            — Full-Service Packages
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
              marginBottom: "1.25rem",
            }}
          >
            Creative Concepts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.62)",
              maxWidth: "540px",
              margin: "0 auto 2rem",
            }}
          >
            End-to-end creative identity packages — strategy, visual language, print collateral, and digital assets, all
            developed together for total brand coherence.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-4">
            <a
              href="#calculator"
              style={{
                display: "inline-flex",
                fontFamily: "'Work Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.9rem 2rem",
                background: GOLD,
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Calculate Your Package ↓
            </a>
            <a
              href={`https://wa.me/233502330663?text=${encodeURIComponent(
                "Hello iDESIGN! I would like to discuss a custom creative package."
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
              WhatsApp Consultation 💬
            </a>
          </motion.div>
        </div>
      </section>

      {/* Packages Overview Cards */}
      <section
        style={{
          background: SURFACE,
          padding: "5rem 2rem",
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
                — Core Tiers
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.75rem)", color: DARK }}>
                Standard Creative Packages
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map(({ id, name, priceDisplay, features, highlight, turnaround }, i) => (
              <FadeUp key={name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: highlight ? GOLD : "#fff",
                    border: `1px solid ${highlight ? GOLD : BORDER}`,
                    borderRadius: "6px",
                    padding: "2rem",
                    boxShadow: highlight
                      ? "0 12px 40px rgba(200,165,74,0.25)"
                      : "0 2px 12px rgba(26,24,20,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: highlight ? "rgba(255,255,255,0.75)" : GOLD,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "2rem",
                      color: highlight ? WHITE : DARK,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {priceDisplay}
                  </p>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.68rem",
                      color: highlight ? "rgba(255,255,255,0.7)" : MUTED,
                      marginBottom: "1.5rem",
                      display: "block",
                    }}
                  >
                    ⏱ {turnaround}
                  </span>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem", flex: 1 }}>
                    {features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                        <span style={{ color: highlight ? "rgba(255,255,255,0.8)" : GOLD, fontSize: "0.8rem", marginTop: "1px" }}>
                          ✓
                        </span>
                        <span
                          style={{
                            fontFamily: "'Work Sans',sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 300,
                            color: highlight ? "rgba(255,255,255,0.85)" : MUTED,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPackageId(id);
                      const calcElem = document.getElementById("calculator");
                      calcElem?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      fontFamily: "'Work Sans',sans-serif",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.85rem",
                      background: highlight ? WHITE : GOLD,
                      color: highlight ? GOLD : WHITE,
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                  >
                    Customize in Calculator ↓
                  </button>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Package & Quote Calculator */}
      <section id="calculator" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
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
              — Interactive Estimator
            </p>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem,4vw,3rem)", color: DARK }}>
              Build Your Custom Package
            </h2>
            <p
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.95rem",
                color: MUTED,
                maxWidth: "600px",
                margin: "0.5rem auto 0",
              }}
            >
              Select your base framework and toggle optional services. You can dispatch your customized quote directly to
              our WhatsApp.
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Options Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Step 1: Base Tier */}
            <div
              style={{
                background: WHITE,
                padding: "2rem",
                borderRadius: "6px",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 2px 12px rgba(26,24,20,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <span
                  style={{
                    background: GOLD,
                    color: WHITE,
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  1
                </span>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: DARK }}>
                  Select Base Framework
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      style={{
                        padding: "1.25rem 1rem",
                        borderRadius: "5px",
                        border: `2px solid ${isSelected ? GOLD : BORDER}`,
                        background: isSelected ? "rgba(200,165,74,0.06)" : SURFACE,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Work Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: DARK,
                          }}
                        >
                          {pkg.name.split(" ")[0]}
                        </span>
                        {isSelected && <span style={{ color: GOLD, fontWeight: "bold" }}>●</span>}
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: "1.2rem",
                          color: GOLD,
                          marginBottom: "0.2rem",
                        }}
                      >
                        ${pkg.basePrice}
                      </p>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem",
                          color: MUTED,
                          display: "block",
                        }}
                      >
                        {pkg.turnaround}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-Ons */}
            <div
              style={{
                background: WHITE,
                padding: "2rem",
                borderRadius: "6px",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 2px 12px rgba(26,24,20,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <span
                  style={{
                    background: GOLD,
                    color: WHITE,
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  2
                </span>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: DARK }}>
                  Modular Add-Ons & Extras
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      style={{
                        padding: "1rem 1.25rem",
                        borderRadius: "5px",
                        border: `1px solid ${isChecked ? GOLD : BORDER}`,
                        background: isChecked ? "rgba(200,165,74,0.05)" : WHITE,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        transition: "all 0.18s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => { }}
                          style={{
                            accentColor: GOLD,
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                          }}
                        />
                        <div>
                          <p
                            style={{
                              fontFamily: "'Work Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                              color: DARK,
                              marginBottom: "0.15rem",
                            }}
                          >
                            {addon.name}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Work Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: MUTED,
                            }}
                          >
                            {addon.desc}
                          </p>
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          color: GOLD,
                          whiteSpace: "nowrap",
                        }}
                      >
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Summary & WhatsApp Action (1 col) */}
          <div
            style={{
              position: "sticky",
              top: "90px",
              background: DARKER,
              color: WHITE,
              padding: "2.25rem",
              borderRadius: "6px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              border: `1px solid #2e2a22`,
            }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: "0.5rem",
              }}
            >
              Estimate Summary
            </p>
            <h4
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.4rem",
                color: WHITE,
                marginBottom: "1.5rem",
              }}
            >
              {currentPackage.name}
            </h4>

            <div style={{ borderTop: "1px solid #2e2a22", paddingTop: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", color: "#b5aea2" }}>
                  Base package:
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: WHITE }}>
                  ${currentPackage.basePrice}
                </span>
              </div>

              {activeAddOns.map((a) => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "#948d82",
                      maxWidth: "180px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    + {a.name}
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: GOLD }}>
                    ${a.price}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid #3a342a",
                paddingTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                TOTAL ESTIMATE:
              </span>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2rem",
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Direct WhatsApp Quote Forwarder */}
            <a
              href={`https://wa.me/233502330663?text=${constructWhatsAppQuote()}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.95rem 1rem",
                background: "#25D366",
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Forward Quote via WhatsApp 💬
            </a>

            <Link
              to="/contact"
              style={{
                display: "block",
                textAlign: "center",
                width: "100%",
                padding: "0.8rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ded9d0",
                textDecoration: "none",
                borderRadius: "3px",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Email Specification Instead →
            </Link>

            <span
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                color: "#756f64",
                marginTop: "1rem",
              }}
            >
              * Estimates are subject to review of asset files and custom specifications.
            </span>
          </div>
        </div>
      </section>

      {/* Concept Portfolio Showcase with Lightbox */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1280px", margin: "0 auto", borderTop: `1px solid ${BORDER}` }}>
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
              — Case Studies
            </p>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.75rem)", color: DARK }}>
              Concept Work
            </h2>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", color: MUTED }}>
              Click any project to view complete art direction in full screen.
            </p>
          </div>
        </FadeUp>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.1}>
              <div
                className={p.wide ? "md:col-span-2" : ""}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "5px",
                  background: SURFACE,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setLightboxIndex(i)}
              >
                <div style={{ paddingBottom: p.wide ? "48%" : "70%", position: "relative" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    animate={{
                      scale: hovered === p.id ? 1.06 : 1,
                      filter: hovered === p.id ? "brightness(0.38)" : "brightness(0.9)",
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.5rem",
                    }}
                  >
                    <motion.p
                      animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 8 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: GOLD,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.client} — {p.year}
                    </motion.p>
                    <motion.h3
                      animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 10 }}
                      transition={{ duration: 0.28, delay: 0.04 }}
                      style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.3rem", color: WHITE }}
                    >
                      {p.title}
                    </motion.h3>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={PROJECTS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
