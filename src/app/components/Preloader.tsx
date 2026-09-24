import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import preloaderLogo from "@/imports/i desigcmx.png";

const easing = [0.16, 1, 0.3, 1] as const;

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let finished = false;
    let timer = 0;

    const complete = () => {
      if (finished) return;
      finished = true;
      if (timer) window.clearInterval(timer);
      setProgress(100);
      window.setTimeout(() => setVisible(false), reduceMotion ? 50 : 260);
    };

    // Responsive, silky smooth entrance progress: reaches 100 in ~400ms
    timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 92) {
          complete();
          return 100;
        }
        return current + 12;
      });
    }, 40);

    const fallback = window.setTimeout(complete, 450);

    return () => {
      if (timer) window.clearInterval(timer);
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.1 : 0.42, ease: easing }}
          aria-label="Loading iDESIGN Studio"
          aria-live="polite"
          role="status"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            overflow: "hidden",
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(28, 24, 18, 0.98) 0%, #0d0c09 70%, #070604 100%)",
            color: "#ffffff",
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* Subtle gold perimeter border */}
          <div
            style={{
              position: "absolute",
              inset: "1rem",
              border: "1px solid rgba(228,192,110,.25)",
              pointerEvents: "none",
            }}
          />

          {/* Center Brand: User's Official Logo with subtle luxury treatment */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.04, duration: reduceMotion ? 0.1 : 0.42, ease: easing }}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1.5rem",
              textAlign: "center",
              width: "min(84vw, 360px)",
            }}
          >
            <div style={{ width: "36px", height: "1px", background: "#dfb23b", marginBottom: "1.25rem" }} />
            <img
              src={preloaderLogo}
              alt="iDESIGN"
              style={{
                width: "clamp(160px, 28vw, 240px)",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 4px 24px rgba(223, 178, 59, 0.22))",
              }}
            />
            <span
              style={{
                marginTop: "1.1rem",
                color: "#f4ead2",
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(0.56rem, 1.4vw, 0.68rem)",
                letterSpacing: "0.32em",
                paddingLeft: "0.32em",
                textTransform: "uppercase",
              }}
            >
              CREATIVE STUDIO
            </span>
            <div
              style={{
                width: "36px",
                height: "1px",
                background: "rgba(223, 178, 59, 0.4)",
                marginTop: "1.25rem",
              }}
            />
          </motion.div>

          {/* Bottom Progress Bar & Label */}
          <div
            style={{
              position: "absolute",
              width: "min(52vw, 260px)",
              bottom: "clamp(2rem, 7vh, 4.5rem)",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div style={{ height: "1px", background: "rgba(255,255,255,.2)" }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.12, ease: easing }}
                style={{ height: "100%", background: "#dfb23b" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: ".55rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: ".58rem",
                letterSpacing: ".14em",
                color: "rgba(255,255,255,.7)",
              }}
            >
              <span>ENTERING THE STUDIO</span>
              <span>{String(progress).padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
