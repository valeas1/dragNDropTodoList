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
