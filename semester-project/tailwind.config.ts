import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '25p': '25%',
        '50p': '50%',
        '75p': '75%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-main-color': 'rgb(var(--main-color-rgb))',
        font: '#4C4E52',
      },
      fontFamily: {
        'arial-rounded': ['"Arial Rounded MT Bold"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
