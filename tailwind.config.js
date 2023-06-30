/** @type {import('tailwindcss').Config} */
import * as tailwindBase from "@lottuseducation/tailwind-base";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@lottuseducation/design_system/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [tailwindBase.default],
  theme: {
    extend: {
      fontFamily: {
        principal: ["Nunito Sans"],
        secondary: ["Poppins"],
        icons: ["Material Icons"],
        "icons-outlined": ["Material Icons Outlined"],
        "icons-solid": ["Material Icons"],
      },
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

