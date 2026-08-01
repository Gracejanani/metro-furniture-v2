module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flameFlicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1) rotate(0deg)", opacity: "1" },
          "25%": { transform: "scaleY(1.08) scaleX(0.95) rotate(-2deg)", opacity: "0.92" },
          "50%": { transform: "scaleY(0.94) scaleX(1.05) rotate(3deg)", opacity: "1" },
          "75%": { transform: "scaleY(1.05) scaleX(0.97) rotate(-1deg)", opacity: "0.96" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35", transform: "translateX(-50%) scale(1)" },
          "50%": { opacity: "0.6", transform: "translateX(-50%) scale(1.2)" },
        },
        fillBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        flameFlicker: "flameFlicker 1.6s ease-in-out infinite",
        glowPulse: "glowPulse 2s ease-in-out infinite",
        fillBar: "fillBar 3s ease-out forwards",
        fadeInUp: "fadeInUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
