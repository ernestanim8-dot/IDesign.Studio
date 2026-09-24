import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import preloaderLogo from "@/imports/i desigcmx-preloader.png";
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
      setProgress((current) => Math.min(current + (current < 72 ? 8 : 3), 94));
    }, 70);
    image.onload = complete;
    image.onerror = complete;
    image.src = heroImage;
    const fallback = window.setTimeout(complete, 1300);

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
          transition={{ duration: reduceMotion ? 0.12 : 0.58, ease: easing }}
          aria-label="Loading iDESIGN Studio"
          aria-live="polite"
          role="status"
          style={{ position: "fixed", inset: 0, zIndex: 10000, overflow: "hidden", background: "#0d0c09", color: "#ffffff", display: "grid", placeItems: "center" }}
        >
          <motion.img
            src={heroImage}
            alt=""
            initial={{ scale: reduceMotion ? 1 : 1.035, filter: "brightness(0.38) saturate(0.72) blur(2px)" }}
            animate={{ scale: 1, filter: "brightness(0.56) saturate(0.88) blur(0px)" }}
            transition={{ duration: reduceMotion ? 0.1 : 1.2, ease: easing }}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,7,5,.7), rgba(8,7,5,.22) 58%, rgba(8,7,5,.5)), linear-gradient(0deg, rgba(8,7,5,.72), transparent 42%)" }} />
          <div style={{ position: "absolute", inset: "1rem", border: "1px solid rgba(228,192,110,.34)", pointerEvents: "none" }} />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0.1 : 0.68, ease: easing }}
            style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5rem", textAlign: "center", width: "min(78vw, 380px)" }}
          >
            <div style={{ width: "100%", height: "1px", background: "#dfb23b", marginBottom: "1.1rem", transformOrigin: "center" }} />
            <img src={preloaderLogo} alt="iDESIGN" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
            <span style={{ marginTop: ".9rem", color: "#f4ead2", fontFamily: "'DM Mono', monospace", fontSize: "clamp(.56rem, 1.4vw, .66rem)", letterSpacing: ".28em", paddingLeft: ".28em" }}>CREATIVE STUDIO</span>
          </motion.div>
          <div style={{ position: "absolute", width: "min(48vw, 250px)", bottom: "clamp(2rem, 7vh, 4.5rem)", left: "50%", transform: "translateX(-50%)" }}>
            <div style={{ height: "1px", background: "rgba(255,255,255,.32)" }}><motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.18, ease: easing }} style={{ height: "100%", background: "#dfb23b" }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".55rem", fontFamily: "'DM Mono', monospace", fontSize: ".58rem", letterSpacing: ".12em", color: "rgba(255,255,255,.7)" }}><span>ENTERING THE STUDIO</span><span>{String(progress).padStart(3, "0")}</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
