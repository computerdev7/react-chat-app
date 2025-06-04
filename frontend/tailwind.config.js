/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
        'box-inner-shadow' : 'inset 0 2px 16px 0 rgb(239, 68 ,68)',
      }
    },
  },
  plugins: [],
}

