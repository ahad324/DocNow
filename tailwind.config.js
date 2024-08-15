/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 10px 15px -3px rgba(0,0,0,0.1)',
      },
    },
    screens: {
      'xs': '425px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}