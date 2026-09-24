import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router";
import heroImage from "@/imports/Advertising/Fashion/Fashion copy.jpg";

const easing = [0.16, 1, 0.3, 1] as const;

const PAGE_LABELS: Record<string, string> = {
  "/": "ENTERING THE STUDIO",
  "/photography": "PHOTOGRAPHY",
  "/graphic-design": "GRAPHIC DESIGN",
  "/creative-concepts": "CREATIVE CONCEPTS",
  "/contact": "GET IN TOUCH",
  "/admin": "STUDIO PORTAL",
};

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const isInitialMount = useRef(true);
  const lastPathname = useRef(location.pathname);

  const currentLabel = PAGE_LABELS[location.pathname] || "CREATIVE STUDIO";

  useEffect(() => {
    // If not initial mount and pathname did not change (e.g. hash click), skip
    if (!isInitialMount.current && lastPathname.current === location.pathname) {
      return;
    }

    const isInitial = isInitialMount.current;
    isInitialMount.current = false;
    lastPathname.current = location.pathname;

    setVisible(true);
    setProgress(0);

    let finished = false;
    let timer = 0;

    const complete = () => {
      if (finished) return;
      finished = true;
      if (timer) window.clearInterval(timer);
      setProgress(100);
      window.setTimeout(() => setVisible(false), reduceMotion ? 60 : 340);
    };

    if (isInitial) {
      // First site load
      const image = new Image();
      image.onload = complete;
      image.onerror = complete;
      image.src = heroImage;

      timer = window.setInterval(() => {
        setProgress((current) => Math.min(current + (current < 72 ? 8 : 4), 95));
      }, 55);

      const fallback = window.setTimeout(complete, 1000);

      return () => {
        if (timer) window.clearInterval(timer);
        window.clearTimeout(fallback);
      };
    } else {
      // Route change transition across all pages
      timer = window.setInterval(() => {
        setProgress((current) => {
          if (current >= 85) {
            complete();
            return 100;
          }
          return current + 25;
        });
      }, 45);

      const fallback = window.setTimeout(complete, 420);

      return () => {
        if (timer) window.clearInterval(timer);
        window.clearTimeout(fallback);
      };
    }
  }, [location.pathname, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.58, ease: easing }}
          aria-label="Loading iDESIGN Studio"
          aria-live="polite"
          role="status"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            overflow: "hidden",
            background: "#0d0c09",
            color: "#ffffff",
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* Background mood image with gentle blur and cinematic treatment */}
          <motion.img
            src={heroImage}
            alt=""
            initial={{ scale: reduceMotion ? 1 : 1.035, filter: "brightness(0.38) saturate(0.72) blur(2px)" }}
            animate={{ scale: 1, filter: "brightness(0.56) saturate(0.88) blur(0px)" }}
            transition={{ duration: reduceMotion ? 0.1 : 1.1, ease: easing }}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          />

          {/* Gradients & border frame */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(8,7,5,.75), rgba(8,7,5,.28) 58%, rgba(8,7,5,.65)), linear-gradient(0deg, rgba(8,7,5,.75), transparent 45%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "1rem",
              border: "1px solid rgba(228,192,110,.3)",
              pointerEvents: "none",
            }}
          />

          {/* Center Brand Typography (No PNG logo) */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.06, duration: reduceMotion ? 0.1 : 0.55, ease: easing }}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1.5rem",
              textAlign: "center",
              width: "min(88vw, 420px)",
            }}
          >
            <div style={{ width: "36px", height: "1px", background: "#dfb23b", marginBottom: "1.1rem" }} />
            <h1
              style={{
                margin: 0,
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 6.5vw, 4rem)",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "#ffffff",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              iDESIGN<span style={{ color: "#dfb23b" }}>.</span>
            </h1>
            <span
              style={{
                marginTop: "0.85rem",
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
            <div style={{ width: "36px", height: "1px", background: "rgba(223, 178, 59, 0.4)", marginTop: "1.1rem" }} />
          </motion.div>

          {/* Bottom Progress Bar & Page Label */}
          <div
            style={{
              position: "absolute",
              width: "min(52vw, 260px)",
              bottom: "clamp(2rem, 7vh, 4.5rem)",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div style={{ height: "1px", background: "rgba(255,255,255,.24)" }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.14, ease: easing }}
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
              <span>{currentLabel}</span>
              <span>{String(progress).padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
