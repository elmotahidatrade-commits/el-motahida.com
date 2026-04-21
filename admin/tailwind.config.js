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
          dark: '#050f1e',
          DEFAULT: '#0d2251'
        },
        accent: '#00c853',
        background: '#f0f4f8',
        textMain: '#1a2035',
        textMuted: '#64748b',
        borderC: '#e2e8f0',
        danger: '#e53935'
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif']
      }
    },
  },
  plugins: [],
}
