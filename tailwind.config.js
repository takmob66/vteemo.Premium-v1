/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Purple theme
        purple: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#9333ea',
          600: '#6A0DAD', // Main purple
          700: '#4B0082', // Dark purple
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Gold theme
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FFD700', // Main gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Light purple
        'purple-light': '#E6E6FA',
        'gold-light': '#FFECB3',
        
        // Dark theme colors
        dark: {
          primary: '#0f0f23',
          secondary: '#1a1a2e',
          tertiary: '#16213e',
        }
      },
      fontFamily: {
        'fa': ['Vazirmatn', 'sans-serif'],
        'en': ['Inter', 'sans-serif'],
        'ar': ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-custom': 'pulse 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'purple': '0 10px 25px rgba(106, 13, 173, 0.3)',
        'gold': '0 10px 25px rgba(255, 215, 0, 0.3)',
        'inner-purple': 'inset 0 2px 4px rgba(106, 13, 173, 0.1)',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #6A0DAD 0%, #4B0082 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-purple-light': 'linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
};