import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Figma design tokens (Nuton Redesign)
        strong: "#171717", // Text/Bg Strong-950
        sub: "#5c5c5c", // Text/Sub-600
        faded: "#7b7b7b", // State/Faded
        soft: "#f5f5f5", // Bg/Soft-100
        weak: "#f7f7f7", // Bg/Weak-50
        "stroke-soft": "#ebebeb", // Stroke/Soft-200
        "stroke-sub": "#d1d1d1", // Stroke/Sub-300
        primary: "#3559e9", // State/Primary/Base
        "primary-dark": "#182f8b",
        "primary-light": "#c0d5ff",
        "primary-lighter": "#ebf1ff",
      },
      fontFamily: {
        header: ["var(--font-fraunces)", "serif"], // Fraunces
        body: ["var(--font-inter)", "sans-serif"], // Inter
        wordmark: ["var(--font-wordmark)", "sans-serif"], // Baloo 2 (footer Nuton)
      },
      boxShadow: {
        // components/regular-shadow/medium
        card: "0 16px 32px -12px rgba(14,18,27,0.10)",
        "card-xs": "0 1px 2px 0 rgba(10,13,20,0.03)",
      },
      borderRadius: {
        "10": "10px",
      },
    },
  },
  plugins: [],
};

export default config;
