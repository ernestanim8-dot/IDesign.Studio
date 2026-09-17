import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import logoMark from "@/imports/i design logo.png";
import { GOLD, DARK, DARKER, MUTED, BG, BORDER, WHITE } from "@/tokens";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";
import { InquiriesDrawer } from "./components/InquiriesDrawer";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Graphic Design", to: "/graphic-design" },
  { label: "Photography", to: "/photography" },
  { label: "Creative Concepts", to: "/creative-concepts" },
  { label: "Contact", to: "/contact" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const headerOffset = 86;

    const scrollToTarget = (target: HTMLElement) => {
      const start = window.scrollY;
      const end = Math.max(target.getBoundingClientRect().top + window.scrollY - headerOffset, 0);
      const distance = end - start;
      const duration = 760;
      const startedAt = performance.now();

      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!link || link.hash.length <= 1) return;

      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", `${location.pathname}${link.hash}`);
      scrollToTarget(target);
      setMenuOpen(false);
    };

    document.addEventListener("click", handleAnchorClick);

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const scrollToAnchor = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);

      if (!target) return;
      scrollToTarget(target);
    };

    const timeoutId = window.setTimeout(scrollToAnchor, 80);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [location.pathname, location.hash]);

  return (
    <div style={{ background: BG, color: DARK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* top contact bar */}
      <div style={{ background: DARKER, padding: "0.5rem 2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
        <div className="flex items-center gap-6">
          <a href="mailto:idesign6048@gmail.com" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.05em", color: "#aaa49a", textDecoration: "none" }}>
            idesign6048@gmail.com
          </a>
          <a href="https://wa.me/233502330663" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.05em", color: "#aaa49a", textDecoration: "none" }}>
            +233 50 233 0663 (WhatsApp)
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsInquiriesOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#201d17] hover:bg-[#c8a54a]/20 border border-[#383327] hover:border-[#c8a54a] transition-all"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: GOLD, cursor: "pointer" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a54a] animate-pulse" />
            <span>Studio Inquiries</span>
          </button>
          {["Facebook", "Instagram"].map((s) => (
            <a key={s} href="#"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa49a", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa49a")}
            >{s}</a>
          ))}
        </div>
      </div>

      {/* main nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,248,244,0.95)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${BORDER}`, padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        <NavLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src={logoMark} alt="iDESIGN" style={{ height: "44px", width: "auto", objectFit: "contain" }} />
        </NavLink>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === "/"}
              style={({ isActive }) => ({
                fontFamily: "'Work Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? GOLD : MUTED,
                textDecoration: "none",
                letterSpacing: "0.01em",
                borderBottom: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                paddingBottom: "2px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s, border-color 0.2s",
              })}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
          {[0, 1, 2].map((i) => (
            <motion.span key={i}
              animate={menuOpen ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 7 : i === 2 ? -7 : 0, opacity: i === 1 ? 0 : 1 } : { rotate: 0, y: 0, opacity: 1 }}
              style={{ display: "block", width: 24, height: 2, background: DARK, borderRadius: 1, originX: "center" }} />
          ))}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
              style={{ position: "absolute", top: "100%", left: 0, right: 0, background: BG, borderBottom: `1px solid ${BORDER}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem", zIndex: 100 }}>
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? GOLD : DARK,
                    textDecoration: "none",
                  })}
                >{label}</NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* page content */}
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* footer */}
      <footer style={{ background: DARKER, padding: "3rem 2rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid md:grid-cols-3 gap-10 mb-8">
            <div>
              <img src={logoMark} alt="iDESIGN" style={{ height: "44px", width: "auto", objectFit: "contain", marginBottom: "1rem", display: "block" }} />
              <p style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 300, fontSize: "0.875rem", lineHeight: "1.7", color: "#6a6460", maxWidth: "260px" }}>
                Full-service creative studio — design, print, photography.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>Navigation</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink key={to} to={to} end={to === "/"}
                    style={({ isActive }) => ({ fontFamily: "'Work Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: isActive ? GOLD : "#6a6460", textDecoration: "none", transition: "color 0.2s" })}
                  >{label}</NavLink>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="mailto:idesign6048@gmail.com" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#6a6460", textDecoration: "none" }}>idesign6048@gmail.com</a>
                <a href="https://wa.me/233502330663" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#6a6460", textDecoration: "none" }}>+233 50 233 0663 (WhatsApp)</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1e1c18", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#3a3830" }}>© 2026 iDESIGN Photography — All rights reserved</p>
            <div className="flex gap-4">
              {["Instagram", "Facebook"].map((s) => (
                <a key={s} href="#"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3a3830", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3830")}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppFloatingButton />

      {/* Real-Time Inquiries Manager Drawer */}
      <InquiriesDrawer isOpen={isInquiriesOpen} onClose={() => setIsInquiriesOpen(false)} />

      {/* PWA Install & Offline Banner */}
      <PWAInstallPrompt />
    </div>
  );
}
