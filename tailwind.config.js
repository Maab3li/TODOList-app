/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'classs',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  daisyui : {
    themes :[],
  },
  theme: {
    extend: {
      colors: {}
    },
  },
  plugins: [require('daisyui')],
}

