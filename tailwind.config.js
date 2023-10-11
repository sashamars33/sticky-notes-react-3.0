/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tsx}"
  ],
  daisyui: {
    themes: [ 
      'pastel',
     ],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

}