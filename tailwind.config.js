/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
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
        light: "#FFF2F2",
        alt: "#E5E0FF",
        dark: "#2C3333",
        success: "#96BB99",
        danger: "#C77676",
        alert: "#E5D283",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.3xl") },
        h2: { fontSize: theme("fontSize.2xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
