import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, DARK, DARKER, MUTED, BG, SURFACE, BORDER, WHITE } from "@/tokens";
import { submitInquiry } from "../api";

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

export function Contact() {
  useEffect(() => {
    document.title = "Contact & Bookings — iDESIGN Studio";
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [lastAction, setLastAction] = useState<"whatsapp" | "email" | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Graphic Design");
  const [timeline, setTimeline] = useState("Within 2 weeks");
  const [message, setMessage] = useState("");

  const phoneNumber = "233502330663";

  const constructWhatsAppMessage = () => {
    return [
      "👋 Hello iDESIGN Studio!",
      "",
      "I would like to make an inquiry:",
      `• Name: ${fullName.trim() || "Client"}`,
      `• Email: ${email.trim() || "Not provided"}`,
      `• Phone/WhatsApp: ${phone.trim() || "Not provided"}`,
      `• Service of Interest: ${interest}`,
      `• Target Timeline: ${timeline}`,
      "",
      "📝 Project Details:",
      message.trim() || "Looking forward to hearing about your availability and rates.",
    ].join("\n");
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const text = encodeURIComponent(constructWhatsAppMessage());
    const waUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setLastAction("whatsapp");
    setSubmitted(true);
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setSubmitError("Please fill in your name and a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitInquiry({
        fullName,
        email,
        phone,
        interest,
        timeline,
        message,
      });

      if (!result.ok) {
        throw new Error(result.errors?.[0] || "Unable to submit your inquiry right now.");
      }

      setLastAction("email");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your inquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", padding: "7rem 2rem 5rem", background: DARKER, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&h=700&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.14,
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
        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
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
            — Let's Talk
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
            Let's make something<br />
            <em style={{ color: GOLD }}>worth keeping</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontFamily: "'Work Sans',sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Open to commissions, editorial projects, print runs, and collaborations. Reach out by form or instant
            WhatsApp chat.
          </motion.p>
        </div>
      </section>

      {/* Quick Direct Actions Strip */}
      <section style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: "1.75rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Instant WhatsApp Chat",
                desc: "Talk with our lead designer right now",
                action: "Chat Now →",
                href: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  "Hello iDESIGN! I'd like a quick consultation about a project."
                )}`,
                icon: "💬",
                bg: "#25D366",
              },
              {
                title: "Book Photography",
                desc: "Check studio dates and rates",
                action: "Inquire Session →",
                href: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  "Hello iDESIGN! I would like to book a photography session."
                )}`,
                icon: "📷",
                bg: GOLD,
              },
              {
                title: "Custom Print Run",
                desc: "Stationery, packaging, & posters",
                action: "Request Print Quote →",
                href: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  "Hello iDESIGN! I need a quote for a custom print run."
                )}`,
                icon: "🖨️",
                bg: DARK,
              },
            ].map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: WHITE,
                  padding: "1rem 1.25rem",
                  borderRadius: "6px",
                  border: `1px solid ${BORDER}`,
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,24,20,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: card.bg,
                    color: WHITE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: DARK }}>
                    {card.title}
                  </h4>
                  <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", color: MUTED }}>
                    {card.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info Column */}
          <FadeUp>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: "1.25rem",
              }}
            >
              — Reach Us
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "3rem" }}>
              {[
                {
                  key: "email",
                  label: "Email",
                  value: "idesign6048@gmail.com",
                  href: "mailto:idesign6048@gmail.com",
                  copyable: true,
                },
                {
                  key: "wa",
                  label: "WhatsApp / Direct Phone",
                  value: "+233 50 233 0663",
                  href: `https://wa.me/${phoneNumber}`,
                  copyable: true,
                },
                {
                  key: "addr",
                  label: "Studio Location",
                  value: "Accra, Ghana (By Appointment & Worldwide Commissions)",
                  href: "https://maps.google.com/?q=Accra,+Ghana",
                  copyable: false,
                },
              ].map(({ key, label, value, href, copyable }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: GOLD,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {label}
                    </p>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      style={{
                        fontFamily: "'Work Sans',sans-serif",
                        fontSize: "1rem",
                        fontWeight: 400,
                        color: DARK,
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = DARK)}
                    >
                      {value}
                    </a>
                  </div>

                  {copyable && (
                    <button
                      onClick={() => copyToClipboard(value, key)}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        padding: "0.25rem 0.6rem",
                        background: "none",
                        border: `1px solid ${BORDER}`,
                        borderRadius: "3px",
                        color: copiedKey === key ? GOLD : MUTED,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {copiedKey === key ? "Copied! ✓" : "Copy"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Studio Hours */}
            <div
              style={{
                background: SURFACE,
                padding: "1.5rem",
                borderRadius: "6px",
                border: `1px solid ${BORDER}`,
                marginBottom: "2.5rem",
              }}
            >
              <h4
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: DARK,
                  marginBottom: "0.75rem",
                }}
              >
                Studio Hours (GMT)
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: MUTED,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Monday – Friday</span>
                  <strong style={{ color: DARK }}>9:00 AM – 6:00 PM</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Saturday</span>
                  <strong style={{ color: DARK }}>10:00 AM – 4:00 PM</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sunday</span>
                  <span style={{ color: "#a89f91" }}>Closed / Field Shoots Only</span>
                </div>
              </div>
            </div>

            {/* Service quick links */}
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: MUTED,
                marginBottom: "1rem",
              }}
            >
              — Explore Portfolio
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Graphic Design Portfolio", to: "/graphic-design" },
                { label: "Photography Gallery", to: "/photography" },
                { label: "Creative Concepts & Packages", to: "/creative-concepts" },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontFamily: "'Work Sans',sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    color: MUTED,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                >
                  <span style={{ width: 16, height: 1, background: "currentColor", display: "inline-block" }} />
                  {label}
                </Link>
              ))}
            </div>

            {/* Social Channels */}
            <div style={{ marginTop: "2rem" }}>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: MUTED,
                  marginBottom: "0.8rem",
                }}
              >
                — Connect With Us
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/i_design_8?stkn=bWZjNDhoeGVpM2hr&utm_source=qr",
                    icon: "📸",
                  },
                  {
                    name: "TikTok",
                    href: "https://www.tiktok.com/@idesign678?_r=1&_t=ZS-99nvS5Nbaki",
                    icon: "🎵",
                  },
                  {
                    name: "YouTube",
                    href: "https://youtube.com/@idesign-c6s?si=GutDYPw_HxdjF0kN",
                    icon: "▶️",
                  },
                  {
                    name: "Facebook",
                    href: "https://www.facebook.com/share/19ba8Zujqc/?mibextid=wwXIfr",
                    icon: "📘",
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "'Work Sans',sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      padding: "0.4rem 0.85rem",
                      background: SURFACE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: "3px",
                      color: DARK,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = GOLD;
                      e.currentTarget.style.color = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.color = DARK;
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Form Column */}
          <FadeUp delay={0.12}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    padding: "2.5rem",
                    background: WHITE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "6px",
                    boxShadow: "0 8px 32px rgba(26,24,20,0.06)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: lastAction === "whatsapp" ? "#25D366" : GOLD,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      color: WHITE,
                    }}
                  >
                    ✓
                  </motion.div>
                  <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "2rem", color: DARK }}>
                    {lastAction === "whatsapp" ? "WhatsApp opened!" : "Inquiry submitted!"}
                  </h3>
                  <p style={{ fontFamily: "'Work Sans',sans-serif", fontWeight: 300, color: MUTED, lineHeight: "1.7" }}>
                    {lastAction === "whatsapp"
                      ? "Your formatted inquiry was prepared and WhatsApp chat was launched. If it did not open automatically, you can tap the button below."
                      : "Thank you for reaching out, " +
                      (fullName || "friend") +
                      ". We have received your inquiry and will review your specifications within 24 to 48 hours."}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(constructWhatsAppMessage())}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        padding: "0.75rem 1.5rem",
                        background: "#25D366",
                        color: WHITE,
                        textDecoration: "none",
                        borderRadius: "3px",
                      }}
                    >
                      Open WhatsApp Again 💬
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.68rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.75rem 1.25rem",
                        border: `1px solid ${BORDER}`,
                        background: "transparent",
                        color: MUTED,
                        cursor: "pointer",
                        borderRadius: "3px",
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: WHITE,
                    padding: "2.5rem",
                    borderRadius: "6px",
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 6px 24px rgba(26,24,20,0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: "1.6rem",
                      color: DARK,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Start a Conversation
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: MUTED,
                      marginBottom: "1.75rem",
                    }}
                  >
                    Fill in your project specifications. You can submit normally or dispatch straight to our WhatsApp.
                  </p>

                  <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Name */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: MUTED,
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ama Mensah"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{
                          background: SURFACE,
                          border: `1px solid ${BORDER}`,
                          color: DARK,
                          fontFamily: "'Work Sans',sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 300,
                          padding: "0.75rem 1rem",
                          outline: "none",
                          borderRadius: "3px",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
                      />
                    </div>

                    {/* Email & Phone side-by-side */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: "0.62rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: MUTED,
                          }}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="you@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            background: SURFACE,
                            border: `1px solid ${BORDER}`,
                            color: DARK,
                            fontFamily: "'Work Sans',sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 300,
                            padding: "0.75rem 1rem",
                            outline: "none",
                            borderRadius: "3px",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: "0.62rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: MUTED,
                          }}
                        >
                          Phone / WhatsApp (optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="+233 ..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            background: SURFACE,
                            border: `1px solid ${BORDER}`,
                            color: DARK,
                            fontFamily: "'Work Sans',sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 300,
                            padding: "0.75rem 1rem",
                            outline: "none",
                            borderRadius: "3px",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
                        />
                      </div>
                    </div>

                    {/* Interest selector */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: MUTED,
                        }}
                      >
                        Service Required
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Graphic Design", "Photography", "Creative Concepts", "Print Only", "Complete Brand"].map(
                          (opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setInterest(opt)}
                              style={{
                                fontFamily: "'DM Mono',monospace",
                                fontSize: "0.62rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                padding: "0.45rem 0.9rem",
                                border: `1px solid ${interest === opt ? GOLD : BORDER}`,
                                background: interest === opt ? GOLD : "transparent",
                                color: interest === opt ? WHITE : MUTED,
                                cursor: "pointer",
                                borderRadius: "3px",
                                transition: "all 0.18s",
                              }}
                            >
                              {opt}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: MUTED,
                        }}
                      >
                        Estimated Timeline
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Immediate / Urgent", "Within 2 weeks", "Within a month", "Flexible / Future"].map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTimeline(t)}
                            style={{
                              fontFamily: "'Work Sans',sans-serif",
                              fontSize: "0.78rem",
                              padding: "0.4rem 0.8rem",
                              border: `1px solid ${timeline === t ? DARK : BORDER}`,
                              background: timeline === t ? DARK : SURFACE,
                              color: timeline === t ? WHITE : MUTED,
                              cursor: "pointer",
                              borderRadius: "3px",
                              transition: "all 0.18s",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: MUTED,
                        }}
                      >
                        Project Details (Optional)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your brand, what deliverables you require, or any specific ideas (optional)…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{
                          background: SURFACE,
                          border: `1px solid ${BORDER}`,
                          color: DARK,
                          fontFamily: "'Work Sans',sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 300,
                          padding: "0.75rem 1rem",
                          outline: "none",
                          resize: "vertical",
                          borderRadius: "3px",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
                      />
                    </div>

                    {submitError && (
                      <p
                        style={{
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "0.85rem",
                          color: "#b42318",
                          background: "#fff1f0",
                          border: "1px solid #ffd2cf",
                          borderRadius: "3px",
                          padding: "0.75rem 1rem",
                        }}
                      >
                        {submitError}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <motion.button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)" }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontFamily: "'Work Sans',sans-serif",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          padding: "0.95rem 1.6rem",
                          background: "#25D366",
                          color: WHITE,
                          border: "none",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          borderRadius: "3px",
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                      >
                        <span>Send via WhatsApp 💬</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={handleStandardSubmit}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          fontFamily: "'Work Sans',sans-serif",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          padding: "0.95rem 1.6rem",
                          background: GOLD,
                          color: WHITE,
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "3px",
                        }}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Inquiry →"}
                      </motion.button>
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        color: MUTED,
                      }}
                    >
                      🔒 We respect your privacy. No spam. Fast reply guaranteed.
                    </span>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeUp>
        </div>
      </section>

      {/* WhatsApp Banner Strip */}
      <section style={{ background: "#25D366", padding: "2.5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              "Hello iDESIGN! I'm reaching out directly from your contact page."
            )}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "'Work Sans',sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              color: WHITE,
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: "1.6rem" }}>💬</span>
            Fastest response? Message us directly on WhatsApp — +233 50 233 0663
          </a>
        </div>
      </section>
    </>
  );
}
