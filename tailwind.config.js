/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,njk,md}"],
  theme: {
    extend: {
      colors: {
        // ... your colors are correct
        'primary': {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bbdaff',
          300: '#90c6ff',
          400: '#60a9ff',
          500: '#3d8bfd',
          600: '#2570eb',
          700: '#1d58d8',
          800: '#1e49af',
          900: '#1e3a8a',
          950: '#172554',
        },
        'neutral': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      // THIS IS THE NEW ADDITION
      dropShadow: {
        'glow': '0 0 6px rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [],
}

