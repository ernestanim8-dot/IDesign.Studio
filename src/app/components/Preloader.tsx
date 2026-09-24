import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import preloaderLogo from "@/imports/i desigcmx.png";
import heroImage from "@/imports/Advertising/Fashion/Fashion copy.jpg";

const easing = [0.16, 1, 0.3, 1] as const;

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let finished = false;
    let timer = 0;
    const image = new Image();
    const complete = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(timer);
      setProgress(100);
      window.setTimeout(() => setVisible(false), reduceMotion ? 80 : 360);
    };

    timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + (current < 72 ? 7 : 2), 94));
    }, 85);
    image.onload = complete;
    image.onerror = complete;
    image.src = heroImage;
    const fallback = window.setTimeout(complete, 1800);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.72, ease: easing }}
          aria-label="Loading iDESIGN Studio"
          aria-live="polite"
          role="status"
          style={{ position: "fixed", inset: 0, zIndex: 10000, overflow: "hidden", background: "#0d0c09", color: "#ffffff", display: "grid", placeItems: "center" }}
        >
          <motion.img
            src={heroImage}
            alt=""
            initial={{ scale: reduceMotion ? 1 : 1.06, filter: "brightness(0.42) blur(5px)" }}
            animate={{ scale: 1, filter: "brightness(0.64) blur(0px)" }}
            transition={{ duration: reduceMotion ? 0.1 : 1.7, ease: easing }}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(8, 7, 5, 0.36)" }} />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0.1 : 0.8, ease: easing }}
            style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5rem", textAlign: "center" }}
          >
            <img src={preloaderLogo} alt="iDESIGN" style={{ width: "clamp(155px, 26vw, 310px)", height: "auto", objectFit: "contain", filter: "drop-shadow(0 8px 22px rgba(0,0,0,.34))" }} />
            <span style={{ marginTop: "1rem", fontFamily: "'DM Mono', monospace", fontSize: "clamp(.58rem, 1.5vw, .72rem)", letterSpacing: ".32em", paddingLeft: ".32em" }}>CREATIVE STUDIO</span>
          </motion.div>
          <div style={{ position: "absolute", left: "clamp(1.25rem, 8vw, 8rem)", right: "clamp(1.25rem, 8vw, 8rem)", bottom: "clamp(2rem, 8vh, 5rem)" }}>
            <div style={{ height: "1px", background: "rgba(255,255,255,.36)" }}><motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.24, ease: easing }} style={{ height: "100%", background: "#e4c06e" }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".65rem", fontFamily: "'DM Mono', monospace", fontSize: ".62rem", letterSpacing: ".14em", color: "rgba(255,255,255,.78)" }}><span>LOADING</span><span>{progress}%</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
