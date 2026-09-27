/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Palette indigo (primaire) — alignée sur les variables CSS de globals.css
      colors: {
        premium: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Surfaces du thème sombre premium
        surface: {
          DEFAULT: '#0b0a1f',
          raised: '#141233',
          overlay: '#1c1a3d',
        },
      },
      // Inter en police système, avec repli sur la pile native
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      // Ombres cohérentes avec globals.css
      boxShadow: {
        'glow-indigo': '0 0 40px -12px rgba(99, 102, 241, 0.55)',
        'glow-purple': '0 0 40px -12px rgba(168, 85, 247, 0.5)',
        card: '0 18px 40px -24px rgba(2, 6, 23, 0.9)',
      },
      borderRadius: {
        card: '1rem',
      },
      maxWidth: {
        content: '80rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out both',
      },
    },
  },
  plugins: [],
};
