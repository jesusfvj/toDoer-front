/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"DynaPuff"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

