/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tsx}"
  ],
  daisyui: {
    themes: [ "coffee" ],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

}