import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: 'Josefin Sans'
      },
      colors: {
        'text-blue': '#494C6B',
        'text-disable': '#9495A5',
        'dark-text-disable': '#5B5E7E',
        'text-grey': '#D1D2DA',
        'text-cross': '#4D5067',
        'text-active': '#3A7CFD',
        'main-white': '#FAFAFA',
        'main-dark': '#171823',
        'dark-blue': '#25273D',
        'grey-text': '#C8CBE7',
        'border-grey': '#E3E4F1',
        'border-blue': '#393A4B'
      }
    }
  },
  plugins: []
} satisfies Config
