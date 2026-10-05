import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import logoFull from "@/imports/i design logo.png";
import homeBackground from "@/imports/Background H.jpg";
import blueForMenImg from "@/imports/Photography/Commercial/Blue for men/blue-for-men-splash-light.jpg";
import rightGuardImg from "@/imports/Photography/Commercial/Right Guard/IMG_0083.jpg";
import studioLifestyleImg from "@/imports/Photography/Portrait/Studio Lifestyle/lifestyle-1-baby-blue-dress.jpg";
import aboutStudioImg from "@/imports/Branding/IDesign/Notebook 2.jpg";
import elizabethSimpsonImg from "@/imports/What Our Clients Say/IMG_6437.jpg";
import deborahSimpsonImg from "@/imports/What Our Clients Say/IMG_0906.jpg";
import ashamiImg from "@/imports/What Our Clients Say/IMG_6838.jpg";
import lawrenciaTakyiImg from "@/imports/What Our Clients Say/IMG_6777.jpg";
import { GOLD, GOLD_LIGHT, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { getStats } from "../api";
import { ServicesSlider } from "../components/ServicesSlider";
import { TestimonialsSlider } from "../components/TestimonialsSlider";

const LATEST_WORK = [
  {
    title: "Radiant Studio Lifestyle",
    subtitle: "Elegance & Expression",
    category: "Portrait Photography",
    img: studioLifestyleImg,
  },
  {
    title: "Blue for Men",
    subtitle: "Fragrance Campaign",
    category: "Commercial Photography",
    img: blueForMenImg,
  },
  {
    title: "Right Guard",
    subtitle: "High-Performance Commercial",
    category: "Commercial Photography",
    img: rightGuardImg,
  },
];


const STATS = [
  { value: "4+", label: "Years in Business" },
  { value: "340+", label: "Projects Completed" },
  { value: "80+", label: "Happy Clients" },
  { value: "3", label: "Services Under One Roof" },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
  initials: string;
  image?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I loved how creative they were with the concepts, props, poses, and different backgrounds. Every setup had its own personality, and the final images looked professional, vibrant, and full of life. I’m genuinely impressed with the results!",
    author: "Elizabeth Simpson",
    role: "Student",
    rating: 5,
    initials: "ES",
    image: elizabethSimpsonImg,
  },
  {
    quote:
      "I absolutely loved my experience with IDesign! The photos came out even better than I imagined. I’m really happy with the final results and would definitely recommend their photography services.",
    author: "Deborah Simpson",
    role: "Fashion Designer",
    rating: 4.5,
    initials: "DS",
    image: deborahSimpsonImg,
  },
  {
    quote:
      "This photoshoot was such a wonderful experience! I felt confident and comfortable throughout the session, and the final images exceeded my expectations. Every detail was beautifully captured, from the lighting to the vibrant colors. I’m truly grateful for these stunning portraits and would definitely recommend iDesign Photography!",
    author: "Ashami",
    role: "Student",
    rating: 4,
    initials: "AS",
    image: ashamiImg,
  },
  {
    quote:
      "I really love my shoot with iDesign. It was an amazing moment with him. The pictures came out standing. The images looked real and nice also the posses were on point and the colors made it beautiful. He made me enjoy my shoot and also made me know that taking shoot involve nature and involvement. I will also love to take my next shot with him.",
    author: "Lawrencia Takyi",
    role: "Sales Personnel",
    rating: 5,
    initials: "LT",
    image: lawrenciaTakyiImg,
  },
  {
    quote:
      "Thank you so much! You really helped me a lot with my presentation today. I honestly don’t think I would’ve felt this confident without your help. I really appreciate you taking the time to help me put everything together. It means a lot to me!",
    author: "Nicole",
    role: "Trader",
    rating: 5,
    initials: "N",
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
    a: "Yes! We maintain an active WhatsApp studio line (+233 50 231 0663) for instant responses, consultation calls, and progress updates throughout your project.",
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
  useEffect(() => {
    document.title = "iDESIGN Studio — Accra, Ghana | Photography & Creative Direction";
  }, []);

  const [heroReady, setHeroReady] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("about-preview");
  const [liveStats, setLiveStats] = useState(STATS);
  const heroRef = useRef(null);
  // Disable scroll-driven parallax on mobile — saves scroll-tick reflows
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], isMobile ? [0, 0] : [0, 110]);
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
          { value: `${data.happyClients}+`, label: "Happy Clients" },
          { value: `${data.servicesOffered}`, label: "Services Under One Roof" },
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
              backgroundImage: `url(${homeBackground})`,
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
                href={`https://wa.me/233502310663?text=${encodeURIComponent(
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

      <section
        id="services"
        style={{
          padding: "4.25rem 0",
          background: BG,
          borderBottom: `1px solid ${BORDER}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "0.6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ display: "inline-block", width: 22, height: 1.5, background: GOLD }} />
                What We Do
                <span style={{ display: "inline-block", width: 22, height: 1.5, background: GOLD }} />
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                  letterSpacing: "-0.025em",
                  color: DARK,
                  marginBottom: "0.65rem",
                }}
              >
                Our Services
              </h2>
              <p
                style={{
                  fontFamily: "'Work Sans',sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  lineHeight: "1.7",
                  color: MUTED,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                An integrated creative studio delivering photography, brand identity, advertising campaigns, and print craftsmanship with uncompromising excellence.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* ── Services Horizontal Slider Component ── */}
        <ServicesSlider />
      </section>

      {/* ── Stats ── */}
      <section id="featured-work" style={{ background: DARKER, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <FadeUp>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" style={{ marginBottom: "2.5rem" }}>
              <div>
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
                  Latest 2026 Work
                </p>
                <h2
                  style={{
                    fontFamily: "'DM Serif Display',serif",
                    fontSize: "clamp(2rem,4vw,3rem)",
                    color: WHITE,
                  }}
                >
                  New stories, fully framed.
                </h2>
              </div>
              <Link
                to="/photography"
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: GOLD,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                View all photography {"->"}
              </Link>
            </div>
          </FadeUp>

          <div className="grid gap-5 md:grid-cols-3">
            {LATEST_WORK.map((work, index) => (
              <FadeUp key={work.title} delay={index * 0.1}>
                <Link
                  to="/photography"
                  className="group block"
                  style={{ color: WHITE, textDecoration: "none" }}
                  aria-label={`View ${work.title} in the photography portfolio`}
                >
                  <article style={{ position: "relative", minHeight: "clamp(300px, 34vw, 440px)", overflow: "hidden" }}>
                    <img
                      src={work.img}
                      alt={`${work.title} - ${work.subtitle}`}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, objectFit: "cover", transition: "transform 0.6s ease" }}
                      className="group-hover:scale-105"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,12,9,0.03) 30%, rgba(13,12,9,0.9) 100%)" }} />
                    <div style={{ position: "absolute", left: "1.5rem", right: "1.5rem", bottom: "1.4rem" }}>
                      <p
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.61rem",
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          color: GOLD_LIGHT,
                          marginBottom: "0.45rem",
                        }}
                      >
                        {work.category}
                      </p>
                      <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.65rem", lineHeight: 1.1, marginBottom: "0.3rem" }}>{work.title}</h3>
                      <p style={{ fontFamily: "'Work Sans',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>{work.subtitle}</p>
                    </div>
                  </article>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

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

        <FadeUp delay={0.1}>
          <TestimonialsSlider testimonials={TESTIMONIALS} />
        </FadeUp>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href={`https://wa.me/233502310663?text=${encodeURIComponent("Hello iDESIGN! I would like to share a short testimonial about my experience working with you.")}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85rem 1.4rem",
              border: `1px solid ${GOLD}`,
              borderRadius: "3px",
              color: DARK,
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Worked with us? Share your testimonial 💬
          </a>
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
                src={aboutStudioImg}
                alt="iDESIGN Studio Craftsmanship"
                loading="lazy"
                decoding="async"
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
              href={`https://wa.me/233502310663?text=${encodeURIComponent(
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
