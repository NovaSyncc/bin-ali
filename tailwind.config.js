/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Luxury Theme from UPGRADEfile.md
        'navy-deepest': '#0f172a',
        'midnight-blue': '#1e3a8a',
        'slate-black': '#0a1628',
        'royal-blue': '#2563eb',
        'sky-blue': '#3b82f6',
        'azure-glow': '#60a5fa',
        'gold-premium': '#d4af37',
        'gold-warm': '#f4d03f',
        'soft-white': 'rgba(255, 255, 255, 0.9)',

        // Retaining old theme for compatibility during transition
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          blue: '#3b82f6',
          'dark-blue': '#1e40af',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
        cream: {
          50: '#fefefe',
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        xl: '20px', // From Glass Morphism System
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ theme, addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-sm': {
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
        },
      }
      addUtilities(newUtilities)
    })
  ],
}
