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
        primary: {
          DEFAULT: '#00C9D7',
          50: '#E6FAFB',
          100: '#B3F0F4',
          200: '#80E6ED',
          300: '#4DDCE6',
          400: '#1AD2DF',
          500: '#00C9D7',
          600: '#00A1AC',
          700: '#007981',
          800: '#005156',
          900: '#00292B',
        },
        secondary: {
          DEFAULT: '#FF8A00',
          50: '#FFF4E6',
          100: '#FFE0B3',
          500: '#FF8A00',
          600: '#CC6E00',
        },
        dark: {
          DEFAULT: '#0D1B2A',
          50: '#E8EBEE',
          100: '#C5CDD5',
          200: '#9EACBA',
          500: '#3D5166',
          800: '#152535',
          900: '#0D1B2A',
        },
        silver: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
        },
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        'ibm-arabic': ['IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-md': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'body-md': ['1rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        'caption': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '700' }],
        'micro': ['0.625rem', { lineHeight: '1.3', letterSpacing: '0.14em', fontWeight: '700' }],
      },
      letterSpacing: {
        luxury: '-0.02em',
        widest: '0.2em',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(13, 27, 42, 0.06)',
        luxury: '0 24px 64px -16px rgba(13, 27, 42, 0.1), 0 0 0 1px rgba(233, 236, 239, 0.8)',
        'luxury-hover': '0 32px 80px -20px rgba(0, 201, 215, 0.18), 0 0 0 1px rgba(0, 201, 215, 0.15)',
        glass: '0 8px 32px 0 rgba(13, 27, 42, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        innerGlow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #F1F3F5 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
