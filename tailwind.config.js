/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tsx}"
  ],
  daisyui: {
    themes: [ 
      'luxury',
     ],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

}