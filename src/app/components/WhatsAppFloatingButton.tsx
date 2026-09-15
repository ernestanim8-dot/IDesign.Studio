import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHITE } from "@/tokens";

export function WhatsAppFloatingButton() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "233502330663";
  const defaultText = encodeURIComponent("Hello iDESIGN! I'm viewing your portfolio website and would like to make an inquiry.");
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultText}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 990,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              background: "#12110e",
              color: WHITE,
              padding: "0.55rem 1rem",
              borderRadius: "20px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Chat with us on <span style={{ color: "#25d366", fontWeight: 600 }}>WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: WHITE,
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)",
          textDecoration: "none",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* Soft pulse animation */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#25D366",
            zIndex: -1,
          }}
        />

        {/* SVG WhatsApp icon */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2C6.51 2 2.016 6.494 2.016 12.016c0 1.947.56 3.766 1.533 5.309L2 22l4.814-1.508c1.479.887 3.207 1.393 5.217 1.393 5.521 0 10.016-4.494 10.016-10.016C22.047 6.494 17.552 2 12.031 2zm0 18.234c-1.782 0-3.447-.53-4.846-1.442l-.348-.227-2.859.896.908-2.793-.243-.377a8.21 8.21 0 0 1-1.282-4.275c0-4.549 3.7-8.249 8.249-8.249 4.549 0 8.249 3.7 8.249 8.249 0 4.549-3.7 8.249-8.249 8.249zm4.526-6.177c-.248-.124-1.467-.723-1.694-.806-.227-.083-.393-.124-.559.124-.165.248-.641.806-.786.972-.145.165-.289.186-.537.062-.248-.124-1.047-.386-1.995-1.231-.737-.657-1.235-1.47-1.38-1.718-.145-.248-.016-.382.108-.506.111-.111.248-.289.372-.434.124-.145.165-.248.248-.413.083-.165.041-.31-.021-.434-.062-.124-.559-1.348-.766-1.846-.201-.485-.406-.419-.559-.427l-.476-.008c-.165 0-.434.062-.661.31-.227.248-.868.848-.868 2.068 0 1.22 0.889 2.4 1.013 2.565.124.165 1.75 2.672 4.24 3.747.592.256 1.054.409 1.414.523.595.189 1.136.162 1.564.098.477-.071 1.467-.6 1.674-1.179.207-.579.207-1.075.145-1.179-.062-.103-.227-.165-.475-.289z" />
        </svg>
      </motion.a>
    </div>
  );
}
