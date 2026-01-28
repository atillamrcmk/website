/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#070A10',
          bgAlt: '#0B0F17',
          surface: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(255, 255, 255, 0.10)',
        },
        light: {
          text: '#E6EAF2',
          muted: 'rgba(230, 234, 242, 0.7)',
        },
        accent: {
          from: '#7C3AED',
          to: '#22D3EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

