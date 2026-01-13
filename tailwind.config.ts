import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: "#00ffff",
          pink: "#ff00ff",
          dark: "#0a0a0a",
          darker: "#050505",
        },
      },
      fontFamily: {
        mono: ["Orbitron", "monospace"],
        display: ["Orbitron", "sans-serif"],
      },
      animation: {
        "glitch": "glitch 1s linear infinite",
        "scan": "scan 8s linear infinite",
        "flicker": "flicker 0.15s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "pulse-glow": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 5px #00ffff)",
            opacity: "1"
          },
          "50%": {
            filter: "drop-shadow(0 0 20px #00ffff)",
            opacity: "0.9"
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
