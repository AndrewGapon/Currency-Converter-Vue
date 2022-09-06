/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '0.75rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
