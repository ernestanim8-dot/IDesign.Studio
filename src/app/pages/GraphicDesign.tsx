import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { Lightbox, type LightboxItem } from "@/app/components/Lightbox";
import callCardBack from "@/imports/IDesign/call card back.jpg";
import callCardFront from "@/imports/IDesign/call card front.jpg";
import clockMockup from "@/imports/IDesign/Clock.jpg";
import mugMockup from "@/imports/IDesign/Mug.jpg";
import notebookTwo from "@/imports/IDesign/Notebook 2.jpg";
import notebook from "@/imports/IDesign/Notebook.jpg";
import penTwo from "@/imports/IDesign/Pen 2.jpg";
import pen from "@/imports/IDesign/Pen.jpg";
import shirtTwo from "@/imports/IDesign/Shirt 2.jpg";
import shirt from "@/imports/IDesign/Shirt.jpg";
import funeralTShirtFour from "@/imports/Funeral Branding/T-Shirt 4.jpg";
import funeralTShirt from "@/imports/Funeral Branding/T-Shirt.jpg";
import oneVoice from "@/imports/OneVoice27/onevoice.jpg";
import speakLordTwo from "@/imports/Speak Lord/Speak Lord 2.jpg";
import speakLord from "@/imports/Speak Lord/Speak Lord.jpg";

interface DesignProject extends LightboxItem {
  id: number;
  client: string;
  year: string;
  wide: boolean;
  discipline: string;
  gallery?: "idesign" | "funeral" | "onevoice" | "speaklord";
}

const DISCIPLINES = ["All", "Branding", "Typography", "Packaging", "Editorial"];

const BRANDING_GALLERY: LightboxItem[] = [
  {
    img: callCardFront,
    title: "iDESIGN Call Card Front",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Front-facing business card design for the iDESIGN visual identity.",
  },
  {
    img: callCardBack,
    title: "iDESIGN Call Card Back",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Back-facing business card layout with brand contact details.",
  },
  {
    img: shirt,
    title: "iDESIGN Shirt",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Branded shirt mockup showing the identity in context.",
  },
  {
    img: shirtTwo,
    title: "iDESIGN Shirt II",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Second shirt mockup variation for branded apparel.",
  },
  {
    img: mugMockup,
    title: "iDESIGN Mug",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Branded mug mockup for studio merchandise and presentation.",
  },
  {
    img: notebook,
    title: "iDESIGN Notebook",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Notebook brand application for stationery and office materials.",
  },
  {
    img: notebookTwo,
    title: "iDESIGN Notebook II",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Second notebook mockup variation for brand collateral.",
  },
  {
    img: pen,
    title: "iDESIGN Pen",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Pen mockup showing the identity on everyday brand materials.",
  },
  {
    img: penTwo,
    title: "iDESIGN Pen II",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Second pen mockup variation for brand collateral.",
  },
  {
    img: clockMockup,
    title: "iDESIGN Clock",
    category: "Branding & Identity",
    client: "iDESIGN Studio",
    year: "2026",
    description: "Clock mockup with the brand identity applied to interior decor.",
  },
];

const FUNERAL_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: funeralTShirt,
    title: "Funeral Brand T-Shirt",
    category: "Funeral Branding",
    client: "Funeral Brand",
    year: "2026",
    description: "Memorial T-shirt design created as part of the funeral branding set.",
  },
  {
    img: funeralTShirtFour,
    title: "Funeral Brand T-Shirt II",
    category: "Funeral Branding",
    client: "Funeral Brand",
    year: "2026",
    description: "Second funeral T-shirt mockup variation for the memorial brand package.",
  },
];

const ONEVOICE_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: oneVoice,
    title: "OneVoice27 Brand Identity",
    category: "Branding & Identity",
    client: "OneVoice27",
    year: "2026",
    description: "OneVoice27 brand artwork prepared for a bold, unified visual presence.",
  },
];

const SPEAK_LORD_BRANDING_GALLERY: LightboxItem[] = [
  {
    img: speakLord,
    title: "Speak Lord Brand Identity",
    category: "Branding & Identity",
    client: "Speak Lord",
    year: "2026",
    description: "Speak Lord brand artwork created for a clear faith-centered identity.",
  },
  {
    img: speakLordTwo,
    title: "Speak Lord Brand Identity II",
    category: "Branding & Identity",
    client: "Speak Lord",
    year: "2026",
    description: "Second Speak Lord brand presentation artwork for the identity set.",
  },
];

const PROJECTS: DesignProject[] = [
  {
    id: 1,
    title: "iDESIGN Brand Identity",
    client: "iDESIGN Studio",
    year: "2026",
    img: callCardFront,
    wide: true,
    discipline: "Branding",
    gallery: "idesign",
    category: "Branding & Identity",
    description:
      "A curated identity set featuring the studio's logo variations and brand artwork. Click to view the full branding gallery.",
  },
  {
    id: 2,
    title: "Oblivion Typeface",
    client: "Foundry Release",
    year: "2023",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&h=1200&fit=crop&auto=format",
    wide: false,
    discipline: "Typography",
    category: "Typography",
    description:
      "Bespoke geometric display typeface engineered with razor-sharp terminal angles and dual optical weights.",
  },
  {
    id: 3,
    title: "Prism Botanicals Packaging",
    client: "Prism Goods",
    year: "2023",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1400&h=1200&fit=crop&auto=format",
    wide: false,
    discipline: "Packaging",
    category: "Packaging",
    description:
      "Sustainable embossed carton packaging with foil accents designed for an artisanal skincare line.",
  },
  {
    id: 4,
    title: "Nova Editorial & Monograph",
    client: "Nova Magazine",
    year: "2022",
    img: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=1600&h=950&fit=crop&auto=format",
    wide: true,
    discipline: "Editorial",
    category: "Editorial Design",
    description:
      "Quarterly architecture review layout featuring 12-column Swiss grid architecture and custom editorial headers.",
  },
  {
    id: 5,
    title: "iDESIGN Brand Assets",
    client: "iDESIGN Studio",
    year: "2022",
    img: shirt,
    wide: false,
    discipline: "Branding",
    gallery: "idesign",
    category: "Brand Guidelines",
    description:
      "Logo systems, regional marks, and visual assets packaged for a consistent brand presence.",
  },
  {
    id: 6,
    title: "Lume Festival Poster Series",
    client: "Lume Festival",
    year: "2021",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=1200&fit=crop&auto=format",
    wide: false,
    discipline: "Typography",
    category: "Poster & Print",
    description:
      "Silk-screened limited edition promotional poster set for international light and contemporary art biennial.",
  },
  {
    id: 7,
    title: "Funeral Brand",
    client: "Memorial Identity",
    year: "2024",
    img: funeralTShirt,
    wide: false,
    discipline: "Branding",
    gallery: "funeral",
    category: "Funeral Branding",
    description:
      "A respectful memorial branding set featuring custom apparel designs. Click to view the funeral brand gallery.",
  },
  {
    id: 8,
    title: "OneVoice27",
    client: "OneVoice27",
    year: "2024",
    img: oneVoice,
    wide: false,
    discipline: "Branding",
    gallery: "onevoice",
    category: "Branding & Identity",
    description:
      "A focused brand identity piece for OneVoice27. Click to view the OneVoice27 branding gallery.",
  },
  {
    id: 9,
    title: "Speak Lord",
    client: "Speak Lord",
    year: "2024",
    img: speakLord,
    wide: false,
    discipline: "Branding",
    gallery: "speaklord",
    category: "Branding & Identity",
    description:
      "A faith-centered brand identity set for Speak Lord. Click to view the Speak Lord branding gallery.",
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

export function GraphicDesign() {
  useEffect(() => {
    document.title = "Graphic Design & Brand Systems — iDESIGN Studio";
  }, []);

  const [hovered, setHovered] = useState<number | null>(null);
  const [activeDiscipline, setActiveDiscipline] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>(PROJECTS);

  const filteredProjects = useMemo(() => {
    if (activeDiscipline === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.discipline === activeDiscipline);
  }, [activeDiscipline]);

  return (
    <>
      {/* Page hero */}
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
              "url('https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=1800&h=700&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.18,
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
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
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
            — Selected Projects
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
            Graphic Design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "520px",
              margin: "0 auto 2rem",
            }}
          >
            Logos, packaging, editorial layouts, and brand systems that communicate your values with confidence and
            lasting style. Click any project to open detailed view.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
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
              Start a Project →
            </Link>
            <a
              href={`https://wa.me/233502330663?text=${encodeURIComponent(
                "Hello iDESIGN! I would like to discuss a graphic design project."
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

      {/* Discipline filter */}
      <section style={{ padding: "3rem 2rem 1rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="flex flex-wrap justify-center gap-2">
          {DISCIPLINES.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDiscipline(d)}
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.45rem 1.2rem",
                border: `1px solid ${activeDiscipline === d ? GOLD : BORDER}`,
                background: activeDiscipline === d ? GOLD : "transparent",
                color: activeDiscipline === d ? WHITE : MUTED,
                cursor: "pointer",
                borderRadius: "3px",
                transition: "all 0.2s",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio grid */}
      <section style={{ padding: "3rem 2rem 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}>
          {filteredProjects.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <motion.div
                className={p.wide ? "md:col-span-2" : ""}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: SURFACE,
                  borderRadius: "6px",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(26,24,20,0.08)",
                  border: `1px solid ${BORDER}`,
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  if (p.gallery === "speaklord") {
                    setLightboxItems(SPEAK_LORD_BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "onevoice") {
                    setLightboxItems(ONEVOICE_BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "funeral") {
                    setLightboxItems(FUNERAL_BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  if (p.gallery === "idesign") {
                    setLightboxItems(BRANDING_GALLERY);
                    setLightboxIndex(0);
                    return;
                  }

                  setLightboxItems(filteredProjects);
                  setLightboxIndex(i);
                }}
              >
                <div style={{ paddingBottom: p.wide ? "46%" : "68%", position: "relative" }}>
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    animate={{
                      scale: hovered === p.id ? 1.06 : 1,
                      filter: hovered === p.id ? "brightness(0.38)" : "brightness(0.92)",
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Corner indicator badge */}
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 2 }}>
                    <motion.span
                      animate={{ opacity: hovered === p.id ? 1 : 0.8 }}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        background: "rgba(13, 12, 9, 0.75)",
                        color: GOLD,
                        border: "1px solid rgba(200, 165, 74, 0.4)",
                        backdropFilter: "blur(6px)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "3px",
                      }}
                    >
                      {p.discipline}
                    </motion.span>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.75rem",
                    }}
                  >
                    <motion.p
                      animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 8 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: GOLD,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {p.client} — {p.year}
                    </motion.p>
                    <motion.h3
                      animate={{ opacity: hovered === p.id ? 1 : 0, y: hovered === p.id ? 0 : 10 }}
                      transition={{ duration: 0.28, delay: 0.04 }}
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: "1.45rem",
                        color: WHITE,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.title}
                    </motion.h3>
                    <motion.p
                      animate={{ opacity: hovered === p.id ? 0.9 : 0, y: hovered === p.id ? 0 : 6 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: "#d8d3cb",
                        lineHeight: "1.5",
                        maxWidth: "600px",
                      }}
                    >
                      {p.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ background: SURFACE, padding: "5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
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
                — How We Work
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem,4vw,2.75rem)", color: DARK }}>
                Our Design Process
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Discover", desc: "We learn your brand, goals, and audience before opening any tools." },
              { n: "02", title: "Concept", desc: "We explore multiple directions and refine into the strongest solution." },
              { n: "03", title: "Craft", desc: "Every detail is considered — typography, colour, spacing, and feel." },
              { n: "04", title: "Deliver", desc: "Final files packaged for print, digital, and future use." },
            ].map(({ n, title, desc }, i) => (
              <FadeUp key={n} delay={i * 0.1}>
                <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: "1.25rem" }}>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "2rem",
                      color: GOLD,
                      opacity: 0.35,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {n}
                  </p>
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
      <section style={{ background: GOLD, padding: "4rem 2rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(1.8rem,4vw,2.75rem)",
            color: WHITE,
            marginBottom: "1rem",
          }}
        >
          Ready to build your visual identity?
        </h2>
        <p
          style={{
            fontFamily: "'Work Sans',sans-serif",
            fontWeight: 300,
            fontSize: "1rem",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "2rem",
          }}
        >
          Let's create something that lasts.
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
              background: WHITE,
              color: GOLD,
              textDecoration: "none",
              borderRadius: "3px",
            }}
          >
            Get In Touch →
          </Link>
          <a
            href={`https://wa.me/233502330663?text=${encodeURIComponent(
              "Hello iDESIGN! I'm interested in building a new visual identity."
            )}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Work Sans',sans-serif",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.9rem 2rem",
              background: DARKER,
              color: WHITE,
              textDecoration: "none",
              borderRadius: "3px",
            }}
          >
            Chat on WhatsApp 💬
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
