const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    opacity: {
      0: '0',
      20: '0.2',
      40: '0.4',
      60: '0.6',
      80: '0.8',
      100: '1',
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      // 't1-xl': '2rem', // 32
      // 't1-lg': '1.375rem', // 22
      // 't1-md': '0.9375rem', // 15
      // 't1-sm': '0.8125rem', // 13
      // 't1-xs': '0.75rem',
      't1-xl': '32px',
      't1-lg': '22px',
      't1-md': '15px',
      't1-sm': '13px',
      't1-xs': '11px',
      't2-2xl': '40px',
      't2-xl': '20px',
      't2-lg': '16px',
      't2-md': '12px',
      't2-sm': '10px',
      't2-xs': '9px',
    },
    colors: {
      ...colors,
      't1-gray': '#73808D',
      default: '#808080',
      't1-black': '#101214',
      primary: '#1abc9c',
      't2-primary': '#5B6784',
      't2-secondary': '#F3F7F8',
      't2-paragraph': '#7F7F7F',
      't2-sub-heading': '#3E4349',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
