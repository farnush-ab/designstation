import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050e1a",
          900: "#0b1e30",
          800: "#102b42",
          700: "#17476b",
          500: "#3a6a8a",
          300: "#6f8fa3",
          200: "#aebcc5",
          100: "#ebebee",
        },
        paper: {
          50:  "#f6f2e8",
          100: "#efe8d6",
          200: "#e5dcc2",
          300: "#d5c9a8",
        },
        brass: {
          400: "#c69a5c",
          500: "#b8874a",
          600: "#9a6d35",
          700: "#7a5326",
        },
        line: "rgba(11,30,48,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-fa)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-serif)", "var(--font-fa)", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        marqueeSlow: "marquee 90s linear infinite",
        spinSlow: "spin 22s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.6s ease-in-out infinite",
        wobble: "wobble 3.4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-16px,0)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        wobble: {
          "0%,100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
