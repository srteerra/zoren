/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#535F8B",
        secondary: "#8EA7E9",
        terce: "#C7D3F4",
        light: "#FFF2F2",
        alt: "#E5E0FF",
        dark: "#2C3333",
        success: "#96BB99",
        danger: "#C77676",
        alert: "#E5D283",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-45deg)" },
          "50%": { transform: "rotate(45deg)" },
        },
        wiggle_rev: {
          "0%, 100%": { transform: "rotate(45deg)" },
          "50%": { transform: "rotate(-45deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
        wiggleRev: "wiggle_rev 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h2: {
          fontSize: theme("fontSize.2xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.bold"),
        },
      });
    }),
  ],
};
