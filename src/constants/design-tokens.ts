/** Mirrors the CSS tokens in globals.css for use in JS (SVG, motion). */
export const colors = {
  ivory: "#F8F6F1",
  cream: "#F2EEE7",
  champagne: "#D9C5A3",
  gold: "#B99A68",
  charcoal: "#24211E",
  stone: "#625C55",
  espresso: "#332820",
} as const;

export const easeLux = [0.22, 1, 0.36, 1] as const;

export const durations = {
  micro: 0.2,
  component: 0.35,
  panel: 0.45,
} as const;
