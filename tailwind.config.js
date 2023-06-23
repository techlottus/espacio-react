/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require( "@lottuseducation/tailwind-base").default],
  theme: {
    extend: {
      colors:{
        primary: {
          500: "#e04504",
          600: "#f55d2a",
        }
      }
    },
  },
  plugins: [],
}

