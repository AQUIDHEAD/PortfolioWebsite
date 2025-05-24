// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cursed-black': '#0A0A0A', // Example: A very dark gray. Adjust to your preference.
        'mint-green': '#98FF98',   // Example: A light, vibrant mint. Adjust as needed.
        // You might want a white or off-white for some text elements later
        'portfolio-white': '#E0E0E0',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'], // Added Fira Code as a suggestion for a nice terminal feel
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards', // For the terminal
        typing: 'typing 2s steps(30, end), blink-caret .75s step-end infinite', // Example typing animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
        typing: { // Example, we'll do a JS version for more control
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'mint-green' }, // Use your mint-green color
        }
      },
    },
  },
  plugins: [],
}