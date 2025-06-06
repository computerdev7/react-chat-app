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
        'alert-inner-shadow' : 'inset 0 1px 4px 0 rgb(0,0,0)',
        'user-inner-shadow' : 'inset 0 0.1px 2px 0px rgb(0,0,0)',
      }
    },
  },
  plugins: [],
}

