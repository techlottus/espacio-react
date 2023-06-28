/** @type {import('tailwindcss').Config} */
import * as tailwindBase from "@lottuseducation/tailwind-base";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,*.js}",
    "./node_modules/@lottuseducation/design_system/**/*.js"
  ],
  presets: [tailwindBase.default],
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

