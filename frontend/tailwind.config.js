/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
