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
        /* Deep forest — brand primary */
        primary: {
          DEFAULT: '#1A332A',
          50: '#F3F6F4',
          100: '#E2EBE6',
          200: '#C5D6CC',
          300: '#8FB09F',
          400: '#5A8A72',
          500: '#2F5C48',
          600: '#1A332A',
          700: '#152920',
          800: '#102018',
          900: '#0C1812',
        },
        /* Fresh leaf green — breaks harvest orange, not dusty sage */
        farm: {
          DEFAULT: '#2BB673',
          leaf: '#4AE08A',
          panel: '#C8F5D8',
          muted: '#6BC99A',
          mint: '#2BB673',
          soft: '#E3FBEB',
          mist: '#EAFBF1',
        },
        /* Mustard / harvest — hero stage accent */
        secondary: {
          DEFAULT: '#E5B84A',
          50: '#FBF7EB',
          100: '#F5EBCB',
          200: '#EBD896',
          300: '#E5B84A',
          400: '#D4A83A',
          500: '#C49A32',
          600: '#A67E28',
        },
        /* Juicy orange pulp — harvest planes (pillars, closer, footer) */
        harvest: {
          DEFAULT: '#EE7F2D',
          soft: '#F4A056',
          deep: '#D4681C',
        },
        /* Deep forest ink */
        dark: {
          DEFAULT: '#1A332A',
          50: '#F3F6F4',
          100: '#E2EBE6',
          200: '#C5D6CC',
          500: '#3D5C50',
          800: '#152920',
          900: '#1A332A',
        },
        /* Warm cream canvas */
        canvas: {
          DEFAULT: '#F7F4EC',
          soft: '#FBFAF6',
          mist: '#F0EBE0',
        },
        cream: {
          DEFAULT: '#F7F4EC',
          soft: '#FBFAF6',
          deep: '#EFE9DC',
        },
        silver: {
          50: '#FBFAF6',
          100: '#F7F4EC',
          200: '#E8E4D8',
          300: '#D4CFC0',
          400: '#B8B2A0',
          500: '#8A8578',
        },
        gray: {
          50: '#FBFAF6',
          100: '#F3F0E8',
          200: '#E5E0D4',
          300: '#D0C9B8',
          400: '#A8A090',
          500: '#7A7468',
          600: '#5A554C',
          700: '#43403A',
          800: '#2E2C28',
          900: '#1A1916',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        'arabic-display': ['var(--font-arabic-display)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-display)', 'Georgia', 'serif'],
        'ibm-arabic': ['var(--font-arabic-display)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '650' }],
        'heading-md': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '650' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'body-md': ['1rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
        micro: ['0.6875rem', { lineHeight: '1.35', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      letterSpacing: {
        luxury: '-0.02em',
        widest: '0.14em',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 12px 40px -12px rgba(20, 40, 32, 0.08)',
        luxury: '0 24px 64px -20px rgba(20, 40, 32, 0.12), 0 0 0 1px rgba(224, 229, 224, 0.9)',
        'luxury-hover': '0 28px 72px -18px rgba(42, 107, 92, 0.22), 0 0 0 1px rgba(42, 107, 92, 0.12)',
        glass: '0 8px 32px 0 rgba(20, 40, 32, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        innerGlow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        header: '0 1px 0 0 rgba(20, 40, 32, 0.06)',
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
        'luxury-gradient': 'linear-gradient(160deg, #FFFFFF 0%, #F7F8F6 45%, #E6EEEA 100%)',
        'brand-wash': 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(42, 107, 92, 0.08), transparent 55%)',
        shimmer: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
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
