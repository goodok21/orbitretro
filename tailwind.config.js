/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')
const { colors } = require('tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        ...colors,
        brand: '#52ab9a',
        brandLight: '#e9f1f0',
        brandLighter: '#f7faf9',
        background: '#fefefe',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      boxShadow: {
        card: '0 0 20px rgb(0 0 0 / 6%)',
      },
      borderRadius: {
        DEFAULT: '.25rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
