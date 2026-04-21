/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1565C0',
        navy: {
          deep: '#0a1a3a',
          mid: '#0d2251'
        },
        text: {
          dark: '#1a2035',
          muted: '#6b7280'
        },
        bgLight: '#f8f9fb',
        accent: '#22c55e',
        borderC: '#e5e7eb'  
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
