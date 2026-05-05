import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "var(--bg)",
        surface:  "var(--surface)",
        "surface-2": "var(--surface-2)",
        accent:   "var(--accent)",
        brand:    "var(--brand)",
        border:   "var(--border)",
        // keep legacy brand shades for any remaining usage
        "brand-50":  "#eef2ff",
        "brand-100": "#e0e7ff",
        "brand-500": "#6366f1",
        "brand-600": "#4f46e5",
        "brand-700": "#4338ca",
        "brand-900": "#1e1b4b",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "8xl": ["6rem",   { lineHeight: "1" }],
        "9xl": ["7.5rem", { lineHeight: "1" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee:  "marquee 28s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        float:    "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
