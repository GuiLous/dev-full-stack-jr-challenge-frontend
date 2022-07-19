/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        green: {
          300: '#00B37E',
          500: '#00875F',
        },
        red: {
          500: '#F75A68',
        },
        gray: {
          100: '#E1E1E6',
          300: '#C4C4CC',
          400: '#8D8D99',
          600: '#323238',
          700: '#29292E',
          800: '#202024',
          900: '#121214',
        },
        white: '#fff',
      },
    },
  },
  plugins: [],
}
