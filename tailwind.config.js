/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dart: {
          red: '#E21C1C',
          green: '#008000',
          black: '#1A1A1A',
          white: '#F8F8F8',
          cream: '#F5F5DC',
          dark: {
            cream: '#1C1C1C',
            white: '#2A2A2A',
            green: '#00FF00',
          },
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
