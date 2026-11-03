import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { GOLD, WHITE } from "@/tokens";

interface ThemeToggleProps {
  variant?: "compact" | "pill" | "mobile";
  className?: string;
}

const SunIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export function ThemeToggle({ variant = "pill", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, setTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "compact") {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-center w-7 h-7 rounded border transition-all cursor-pointer ${
          isDark
            ? "border-[#383327] bg-[#1a1712] text-[#e4c06e] hover:border-[#c8a54a]"
            : "border-[#383327] bg-[#1a1712] text-[#aaa49a] hover:text-[#c8a54a] hover:border-[#c8a54a]"
        } ${className}`}
        aria-label={isDark ? "Switch to Warm Editorial theme" : "Switch to Obsidian Noir theme"}
        title={isDark ? "Switch to Warm Light Mood" : "Switch to Obsidian Noir Mood"}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
        </motion.div>
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center justify-between p-3 rounded border ${
          isDark ? "border-[#2b251a] bg-[#16130d]" : "border-[#e0d8cc] bg-[#f5efe4]"
        } ${className}`}
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: GOLD }}>{isDark ? <MoonIcon size={16} /> : <SunIcon size={16} />}</span>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--theme-text)" }}>
              {isDark ? "Obsidian Noir" : "Warm Editorial"}
            </p>
            <p className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>
              {isDark ? "Dark theme active" : "Light theme active"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-0.5 rounded-full">
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              !isDark ? "bg-[#c8a54a] text-white shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              isDark ? "bg-[#c8a54a] text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Dark
          </button>
        </div>
      </div>
    );
  }

  // Default: luxury editorial pill
  return (
    <button
      onClick={toggleTheme}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
        isDark
          ? "border-[#2e2920] bg-[#14120e] text-[#f5f3ef] hover:border-[#c8a54a]/60 hover:bg-[#1a1712]"
          : "border-[#dfd7ca] bg-[#f5f1e8] text-[#1a1814] hover:border-[#c8a54a] hover:bg-[#ece6da]"
      } ${className}`}
      aria-label={isDark ? "Switch to Warm Editorial theme" : "Switch to Obsidian Noir theme"}
      title={isDark ? "Switch to Warm Light Mood" : "Switch to Obsidian Noir Mood"}
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="flex items-center justify-center text-[#c8a54a]"
      >
        {isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
      </motion.div>
      <span className="hidden lg:inline text-[0.62rem] font-medium">
        {isDark ? "Noir" : "Light"}
      </span>
    </button>
  );
}

