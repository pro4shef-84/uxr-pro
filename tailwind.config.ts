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
        text:     "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        accent:   "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        border:   "var(--border)",
        "border-2": "var(--border-2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
      },
      fontSize: {
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["7.5rem", { lineHeight: "1" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
