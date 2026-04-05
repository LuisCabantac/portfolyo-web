import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
} satisfies Config
