export const GOLD = "#c8a54a";
export const GOLD_LIGHT = "#e4c06e";
export const GOLD_GLOW = "rgba(200, 165, 74, 0.25)";
export const DARK = "#1a1814";
export const DARKER = "#0d0c09";
export const DARK_ELEVATED = "#141310";
export const MUTED = "#7a7368";
export const MUTED_LIGHT = "#a69f92";
export const BG = "#faf8f4";
export const BG_DARK = "#0d0c09";
export const SURFACE = "#f2ede5";
export const SURFACE_DARK = "#181612";
export const BORDER = "#e0d8cc";
export const BORDER_DARK = "#28251e";
export const WHITE = "#ffffff";

export const THEME_PRESETS = {
  "obsidian-gold": {
    name: "Obsidian & Gold",
    bg: "#0d0c09",
    surface: "#171511",
    border: "#2b261c",
    text: "#f5f3ef",
    muted: "#9e978c",
    accent: "#c8a54a",
  },
  "warm-editorial": {
    name: "Warm Editorial",
    bg: "#faf8f4",
    surface: "#f2ece0",
    border: "#ded4c3",
    text: "#1a1814",
    muted: "#7d7568",
    accent: "#b08530",
  },
  "nordic-minimal": {
    name: "Nordic Minimal",
    bg: "#0a0a0c",
    surface: "#121216",
    border: "#24242a",
    text: "#ffffff",
    muted: "#8a8a98",
    accent: "#ffffff",
  },
  "emerald-noir": {
    name: "Emerald Noir",
    bg: "#07120e",
    surface: "#0e1e17",
    border: "#183327",
    text: "#f0f7f4",
    muted: "#82a192",
    accent: "#3dd68c",
  },
} as const;
