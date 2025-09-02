/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,njk,md}"],
  theme: {
    extend: {
      // References the color variables from input.css
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        'foreground-muted': 'rgb(var(--color-foreground-muted) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
      },
      // References the border-radius variables from input.css
      borderRadius: {
        DEFAULT: 'var(--radius-default)',
        lg: 'var(--radius-lg)',
      },
      // References the font variables from input.css
      fontFamily: {
        heading: 'var(--font-heading)',
        sans: 'var(--font-body)',
      },
      // References the animation variables from input.css
      transitionDuration: {
        'theme': 'var(--transition-speed)',
      },
      // Kept your custom drop shadow
      dropShadow: {
        'glow': '0 0 6px rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'), // <-- This is the new line
  ],
}