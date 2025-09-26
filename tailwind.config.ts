import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'notebook-cream': '#faf8f3',
        'ink-blue': '#1a1a2e',
        'highlight-yellow': '#ffeb3b',
        'correction-red': '#e53e3e',
        'success-green': '#38a169',
        'postit-yellow': '#fff59d',
        'paper-edge': '#e8e5e0',
      },
      fontFamily: {
        'handwritten': ['Kalam', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        'coffee-stain': 'radial-gradient(ellipse 80px 60px at 50% 50%, rgba(139, 69, 19, 0.1), transparent)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      animation: {
        'gentle-float': 'gentleFloat 3s ease-in-out infinite',
        'subtle-rotate': 'subtleRotate 4s ease-in-out infinite',
      },
      keyframes: {
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        subtleRotate: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config