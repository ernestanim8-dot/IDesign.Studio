import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { GOLD, DARK, DARKER, BG, BORDER } from "@/tokens";

export function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | iDESIGN Studio";
  }, []);

  return (
    <div style={{ minHeight: "70vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", maxWidth: "480px" }}
      >
        {/* Large 404 */}
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(5rem, 20vw, 9rem)",
          fontWeight: 700,
          color: GOLD,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          margin: 0,
          opacity: 0.18,
          userSelect: "none",
        }}>
          404
        </p>

        <div style={{ marginTop: "-1.5rem" }}>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: "1rem",
          }}>
            Page Not Found
          </p>
          <h1 style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 600,
            color: DARK,
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}>
            This page doesn't exist
          </h1>
          <p style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "#6a6460",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}>
            The page you're looking for may have been moved, deleted, or never existed.
            Let's get you back to something real.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: DARKER,
                background: GOLD,
                border: "none",
                padding: "0.75rem 2rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Back to Home
            </Link>
            <Link to="/contact"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: GOLD,
                background: "transparent",
                border: `1px solid ${BORDER}`,
                padding: "0.75rem 2rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
