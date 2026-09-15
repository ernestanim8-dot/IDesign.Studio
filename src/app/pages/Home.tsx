import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import logoFull from "@/imports/i_design_logo.png";
import { GOLD, GOLD_LIGHT, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { getStats } from "../api";

const SERVICES = [
  {
    title: "Photography",
    desc: "Commercial, portrait, and documentary photography that tells your brand's story with clarity and emotion.",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=700&h=480&fit=crop&auto=format",
    icon: "📷",
    to: "/photography",
  },
  {
    title: "Creative Concepts",
    desc: "End-to-end creative identity packages — strategy, visual language, print collateral, and digital assets under one roof.",
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=700&h=480&fit=crop&auto=format",
    icon: "✦",
    to: "/creative-concepts",
  },
  {
    title: "Graphic Design",
    desc: "Logos, packaging, editorial layouts, and brand systems that communicate your values with confidence and style.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=480&fit=crop&auto=format",
    icon: "◈",
    to: "/graphic-design",
  },
];

const STATS = [
  { value: "5+", label: "Years in Business" },
  { value: "340+", label: "Projects Completed" },
  { value: "80+", label: "Happy Clients" },
  { value: "3", label: "Services Under One Roof" },
];

const TESTIMONIALS = [
  {
    quote:
      "iDESIGN transformed our entire brand architecture. Having photography and graphic design done by the same team gave our launch unprecedented visual coherence.",
    author: "Kofi Owusu",
    role: "Founder & CEO, Meridian Goods",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote:
      "The photography session was seamless, and the turnaround on print assets was lightning fast. They are our go-to creative partners in West Africa.",
    author: "Sarah Lindqvist",
    role: "Creative Director, Nordic Living Studio",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote:
      "Exceptional attention to typographic nuance and paper stock choices. The packaging design elevated our products directly onto luxury retail shelves.",
    author: "Nana Yaa Boateng",
    role: "Brand Strategist, Flora Botanicals",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  },
];

const FAQS = [
  {
    q: "What is your typical project timeline?",
    a: "Standard brand identity packages take between 2 to 4 weeks depending on scope and revision cycles. Dedicated photography sessions and print runs can often be scheduled with 3–5 business days notice.",
  },
  {
    q: "Can I commission photography without hiring you for graphic design?",
    a: "Absolutely. While many clients take advantage of our integrated services, we regularly shoot commercial, portrait, and documentary commissions as standalone projects.",
  },
  {
    q: "How do you deliver design and photography deliverables?",
    a: "All final brand files are provided in vector formats (.AI, .EPS, .SVG, .PDF) alongside high-resolution web formats (.PNG, .WebP, .JPG). Photography is delivered through a private high-resolution client gallery ready for both print and digital use.",
  },
  {
    q: "How does billing and deposits work?",
    a: "We work with a 50% commencement deposit upon contract signing, with the remaining 50% balance payable upon final asset delivery and approval. We accept bank transfer, Mobile Money, and card payments.",
  },
  {
    q: "Can we handle inquiries and project updates on WhatsApp?",
    a: "Yes! We maintain an active WhatsApp studio line (+233 50 233 0663) for instant responses, consultation calls, and progress updates throughout your project.",
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

export function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("about-preview");
  const [liveStats, setLiveStats] = useState(STATS);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, 110]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getStats().then((data) => {
      if (data) {
        setLiveStats([
          { value: `${data.yearsExperience}+`, label: "Years in Business" },
          { value: `${data.projectsCompleted}+`, label: "Projects Completed" },
          { value: data.clientSatisfaction, label: "Client Satisfaction" },
          { value: `${data.awardsWon}`, label: "Design Awards" },
        ]);
      }
    });
  }, []);

  useEffect(() => {
    const sectionIds = ["about-preview", "photography", "graphic-design", "advertising", "featured-work", "cta"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    sectionIds.forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "94vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <motion.div style={{ position: "absolute", inset: "-10% 0", y: parallax }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&h=1200&fit=crop&auto=format')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg,rgba(13,12,9,0.88) 0%,rgba(13,12,9,0.58) 55%,rgba(13,12,9,0.22) 100%)",
          }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: heroReady ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "36%",
            height: "2px",
            background: `linear-gradient(to right,${GOLD},transparent)`,
            transformOrigin: "left",
          }}
        />

        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "4rem 2rem 4rem clamp(2rem,8vw,8rem)",
            maxWidth: "760px",
            opacity: heroOpacity,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 24 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={logoFull}
              alt="iDESIGN Photography"
              style={{
                height: "clamp(70px,10vw,130px)",
                width: "auto",
                objectFit: "contain",
                marginBottom: "2rem",
                display: "block",
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: heroReady ? 1 : 0, x: heroReady ? 0 : -20 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1.5, background: GOLD }} />
            We Design · We Print · We Serve
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 32 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(2.8rem,7vw,5.5rem)",
              lineHeight: "1.03",
              letterSpacing: "-0.025em",
              color: WHITE,
              marginBottom: "1.5rem",
            }}
          >
            Your story,<br />
            <em style={{ color: GOLD }}>visualised</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.68)",
              marginBottom: "2.75rem",
              maxWidth: "460px",
            }}
          >
            A full-service creative studio for brands that refuse to blend in — graphic design, photography, and print
            under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.03, boxShadow: `0 8px 32px rgba(200,165,74,0.4)` }} whileTap={{ scale: 0.97 }}>
              <a
                href="#about-preview"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Work Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "1rem 2.25rem",
                  background: GOLD,
                  color: WHITE,
                  textDecoration: "none",
                  borderRadius: "3px",
                }}
              >
                Explore Studio ↓
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href={`https://wa.me/233502330663?text=${encodeURIComponent(
                  "Hello iDESIGN! I found you through your website and would like to chat."
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Work Sans',sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "1rem 2.25rem",
                  background: "#25D366",
                  color: WHITE,
                  textDecoration: "none",
                  borderRadius: "3px",
                }}
              >
                WhatsApp Chat 💬
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Scroll
          </span>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom,${GOLD},transparent)` }} />
        </motion.div>
      </section>

      {/* ── ticker ── */}
      <div style={{ background: GOLD, padding: "1.2rem 0", overflow: "hidden" }}>
        <motion.p
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: WHITE,
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          We Design &nbsp;·&nbsp; We Print &nbsp;·&nbsp; We Serve &nbsp;·&nbsp; iDESIGN Photography &nbsp;·&nbsp; We
          Design &nbsp;·&nbsp; We Print &nbsp;·&nbsp; We Serve &nbsp;·&nbsp; iDESIGN Photography &nbsp;·&nbsp;
        </motion.p>
      </div>

      {/* ── Services ── */}
      <section style={{ background: BG, borderBottom: `1px solid ${BORDER}`, padding: "1rem 2rem" }}>
        <div className="flex flex-wrap items-center justify-center gap-3" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {[
            ["About", "#about-preview"],
            ["Photography", "#photography"],
            ["Graphic Design", "#graphic-design"],
            ["Advertising", "#advertising"],
            ["Featured Work", "#featured-work"],
            ["Book", "#cta"],
          ].map(([label, href]) => {
            const sectionId = href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? GOLD : MUTED,
                  textDecoration: "none",
                  padding: "0.45rem 0.7rem",
                  borderBottom: `1px solid ${isActive ? GOLD : "transparent"}`,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = GOLD;
                  e.currentTarget.style.borderBottomColor = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive ? GOLD : MUTED;
                  e.currentTarget.style.borderBottomColor = isActive ? GOLD : "transparent";
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      </section>

      <section id="featured-work" style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              — What We Do
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-0.02em",
                color: DARK,
              }}
            >
              Our Services
            </h2>
          </div>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.title} delay={i * 0.12}>
              <motion.div
                id={
                  svc.title === "Photography"
                    ? "photography"
                    : svc.title === "Graphic Design"
                      ? "graphic-design"
                      : "advertising"
                }
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 2px 16px rgba(26,24,20,0.06)",
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.55s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "rgba(200,165,74,0.92)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "4px",
                      padding: "0.3rem 0.7rem",
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.75rem",
                      color: WHITE,
                    }}
                  >
                    {svc.icon}
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "1.35rem",
                      color: DARK,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      lineHeight: "1.7",
                      color: MUTED,
                      marginBottom: "1rem",
                    }}
                  >
                    {svc.desc}
                  </p>
                  <Link
                    to={svc.to}
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.63rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: GOLD,
                      textDecoration: "none",
                    }}
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: DARKER, padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle,rgba(200,165,74,0.08) 0%,transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: "3rem",
                textAlign: "center",
              }}
            >
              — In Numbers
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {liveStats.map(({ value, label }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  style={{
                    textAlign: "center",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "2rem 1rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "clamp(2.5rem,5vw,3.75rem)",
                      color: GOLD,
                      lineHeight: 1,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6a6460",
                    }}
                  >
                    {label}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Digital Portfolio Builder Studio Highlight ── */}
      <section style={{ background: "#0b0a08", borderTop: "1px solid #1f1d17", borderBottom: "1px solid #1f1d17", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(200, 165, 74, 0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a54a]/15 border border-[#c8a54a]/30 text-[#e4c06e] text-xs font-mono tracking-wider uppercase">
                  <span>⚡</span> Live Web Feature
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2
                  style={{
                    fontFamily: "'DM Serif Display',serif",
                    fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                    lineHeight: 1.15,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Create & Publish Your Own{" "}
                  <span style={{ color: GOLD, fontStyle: "italic" }}>Digital Portfolio</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p
                  style={{
                    fontFamily: "'Work Sans',sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: "#a0998d",
                    maxWidth: "540px",
                  }}
                >
                  Whether you are a photographer, graphic designer, or multidisciplinary artist, our built-in interactive Studio Builder lets you customize themes, showcase works, preview live across devices, and publish directly to our cloud database.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-[#26231c] bg-[#14120e]">
                    <span className="text-xl">🎨</span>
                    <h4 className="font-serif text-white text-sm font-semibold mt-2">Luxury Palettes</h4>
                    <p className="text-xs text-[#827a6e] mt-1 font-light">Obsidian, Warm Sand, Emerald Noir, Nordic Minimal.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#26231c] bg-[#14120e]">
                    <span className="text-xl">📱</span>
                    <h4 className="font-serif text-white text-sm font-semibold mt-2">Device Frames</h4>
                    <p className="text-xs text-[#827a6e] mt-1 font-light">Real-time desktop, tablet, and mobile viewport inspection.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#26231c] bg-[#14120e]">
                    <span className="text-xl">☁️</span>
                    <h4 className="font-serif text-white text-sm font-semibold mt-2">REST Backend</h4>
                    <p className="text-xs text-[#827a6e] mt-1 font-light">Instant persistence, shareable links, and JSON export.</p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <Link
                    to="/builder"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#c8a54a] hover:bg-[#e4c06e] text-black font-semibold text-sm tracking-wide transition-all shadow-xl hover:scale-105"
                  >
                    <span>Launch Portfolio Builder</span>
                    <span className="text-lg">→</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#3d372b] hover:border-[#c8a54a] text-xs font-mono text-[#c5bcad] transition-colors"
                  >
                    Request Bespoke Site Build
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right Interactive Mock Card */}
            <div className="lg:col-span-5">
              <FadeUp delay={0.2}>
                <div className="relative rounded-2xl border border-[#2e2a21] bg-[#14120e] p-5 shadow-2xl overflow-hidden group">
                  <div className="flex items-center justify-between border-b border-[#25221a] pb-3 mb-4 text-xs font-mono text-[#8a8172]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Interactive Builder Engine
                    </span>
                    <span className="text-[#c8a54a]">v2.0 Full-Stack</span>
                  </div>

                  <div className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden relative border border-[#332e24]">
                      <img
                        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=500&fit=crop&auto=format"
                        alt="Demo Showcase"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#c8a54a] text-black font-semibold uppercase">
                            Photography & Art Direction
                          </span>
                          <h4 className="text-white font-serif text-lg font-semibold mt-1">
                            Echoes of Golden Horizon
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#0d0c09] border border-[#222019] flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white font-medium">Ready to showcase your works?</p>
                        <p className="text-[11px] text-[#787165]">No code required. Export or share instantly.</p>
                      </div>
                      <Link
                        to="/builder"
                        className="px-3 py-1.5 rounded text-xs font-mono bg-[#c8a54a]/20 text-[#e4c06e] border border-[#c8a54a]/40 hover:bg-[#c8a54a] hover:text-black transition-colors"
                      >
                        Try Studio Tool ⚡
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client Testimonials Showcase ── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
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
              — Endorsements
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-0.02em",
                color: DARK,
              }}
            >
              What Our Clients Say
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.author} delay={i * 0.1}>
              <div
                style={{
                  background: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "6px",
                  padding: "2.25rem",
                  boxShadow: "0 4px 16px rgba(26,24,20,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <div style={{ color: GOLD, fontSize: "0.95rem", marginBottom: "1rem", letterSpacing: "2px" }}>
                    {"★".repeat(t.rating)}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.92rem",
                      fontWeight: 300,
                      lineHeight: "1.75",
                      color: DARK,
                      marginBottom: "1.75rem",
                      fontStyle: "italic",
                    }}
                  >
                    "{t.quote}"
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", borderTop: `1px solid ${BORDER}`, paddingTop: "1rem" }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: DARK,
                      }}
                    >
                      {t.author}
                    </h4>
                    <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", color: MUTED }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── About teaser ── */}
      <section
        id="about-preview"
        style={{
          background: SURFACE,
          padding: "6rem 2rem",
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUp>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: "1rem",
              }}
            >
              — About the Studio
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.07",
                color: DARK,
                marginBottom: "1.75rem",
              }}
            >
              Consistent brand communication, from <em style={{ color: GOLD }}>idea to print</em>
            </h2>
            <p
              style={{
                fontFamily: "'Work Sans',sans-serif",
                fontSize: "0.975rem",
                fontWeight: 300,
                lineHeight: "1.8",
                color: MUTED,
                marginBottom: "1rem",
              }}
            >
              iDESIGN Photography is a full-service creative studio offering graphic design, professional printing, and
              photography. We work with businesses of all sizes — from solo founders to established enterprises.
            </p>
            <p
              style={{
                fontFamily: "'Work Sans',sans-serif",
                fontSize: "0.975rem",
                fontWeight: 300,
                lineHeight: "1.8",
                color: MUTED,
                marginBottom: "2rem",
              }}
            >
              Every project starts with listening. We learn your story before we pick up a camera or open a design file.
            </p>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: `0 8px 28px rgba(200,165,74,0.3)` }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block" }}
            >
              <Link
                to="/contact"
                style={{
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
                  display: "inline-block",
                }}
              >
                Work With Us
              </Link>
            </motion.div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=820&fit=crop&auto=format"
                alt="Studio team"
                style={{ width: "100%", display: "block", borderRadius: "6px" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "1.5rem",
                  background: "rgba(200,165,74,0.92)",
                  backdropFilter: "blur(12px)",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "5px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: WHITE,
                    marginBottom: "0.15rem",
                  }}
                >
                  Est.
                </p>
                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.4rem", color: WHITE, lineHeight: 1 }}>
                  2012
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "-14px",
                  width: "56px",
                  height: "3px",
                  background: GOLD,
                  borderRadius: 2,
                }}
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Interactive FAQ Accordion Section ── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "860px", margin: "0 auto" }}>
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
              — Common Questions
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-0.02em",
                color: DARK,
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <FadeUp key={faq.q} delay={idx * 0.08}>
                <div
                  style={{
                    border: `1px solid ${isOpen ? GOLD : BORDER}`,
                    borderRadius: "6px",
                    background: WHITE,
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: DARK,
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "1.2rem",
                        color: GOLD,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            padding: "0 1.5rem 1.25rem",
                            fontFamily: "'Work Sans', sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 300,
                            lineHeight: "1.75",
                            color: MUTED,
                            borderTop: `1px solid ${SURFACE}`,
                            paddingTop: "0.75rem",
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        id="cta"
        style={{
          background: DARKER,
          padding: "5rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: "1rem",
            }}
          >
            — Start Your Project
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: WHITE,
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Ready to bring your vision to life?
          </h2>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.65)",
              marginBottom: "2.5rem",
            }}
          >
            Reach out through our inquiry form or message our studio directly on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1rem 2.25rem",
                background: GOLD,
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Get Started →
            </Link>
            <a
              href={`https://wa.me/233502330663?text=${encodeURIComponent(
                "Hello iDESIGN! I'm ready to discuss a new project."
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1rem 2.25rem",
                background: "#25D366",
                color: WHITE,
                textDecoration: "none",
                borderRadius: "3px",
              }}
            >
              Chat on WhatsApp 💬
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
