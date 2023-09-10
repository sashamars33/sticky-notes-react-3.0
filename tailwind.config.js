/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tsx}"
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#fbbf24",
                   
          "secondary": "#fb923c",
                   
          "accent": "#a3e635",
                   
          "neutral": "#060508",
                   
          "base-100": "#ffedd5",
                   
          "info": "#67e8f9",
                   
          "success": "#16a34a",
                   
          "warning": "#fcd34d",
                   
          "error": "#ef4444",
                   },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

}