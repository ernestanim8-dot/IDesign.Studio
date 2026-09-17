import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import logoMark from "@/imports/i design logo gh.png";
import { GOLD, DARK, DARKER, MUTED, BG, BORDER } from "@/tokens";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";
import { InquiriesDrawer } from "./components/InquiriesDrawer";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";

// ── Social icon SVGs ────────────────────────────────────────────────────────
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const YouTubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { key: "instagram", icon: InstagramIcon, href: "https://www.instagram.com/i_design_8", label: "Instagram" },
  { key: "facebook",  icon: FacebookIcon,  href: "#", label: "Facebook" },
  { key: "tiktok",    icon: TikTokIcon,    href: "https://www.tiktok.com/@idesign678", label: "TikTok" },
  { key: "youtube",   icon: YouTubeIcon,   href: "https://youtube.com/@idesign-c6s", label: "YouTube" },
];

function SocialIconLink({ icon: Icon, href, label, color = "#aaa49a", hoverColor = GOLD, size = 16 }: {
  icon: ({ size }: { size?: number }) => JSX.Element;
  href: string; label: string; color?: string; hoverColor?: string; size?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      style={{ color, transition: "color 0.2s, transform 0.2s", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.transform = "scale(1.15)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = color; e.currentTarget.style.transform = "scale(1)"; }}
    >
      <Icon size={size} />
    </a>
  );
}

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
          {SOCIAL_LINKS.map(({ key, icon, href, label }) => (
            <SocialIconLink key={key} icon={icon} href={href} label={label} color="#aaa49a" hoverColor={GOLD} size={15} />
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
              {SOCIAL_LINKS.map(({ key, icon, href, label }) => (
                <SocialIconLink key={key} icon={icon} href={href} label={label} color="#3a3830" hoverColor={GOLD} size={17} />
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
