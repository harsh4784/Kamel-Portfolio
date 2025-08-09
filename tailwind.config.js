/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.75rem, 6vw, 4.25rem)',
      }
    },
  },
  plugins: [],
}
