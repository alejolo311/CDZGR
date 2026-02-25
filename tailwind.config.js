/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        /* amber/ochre — the color of dirt roads and dried grass */
        orange: { DEFAULT: '#c47818', dark: '#8f5510' },
        /* slate blue — used for Paseo/secondary route */
        emerald: { race: '#4a7aaa', 'race-dark': '#2e5a88' },
        /* warm darks for hero/footer sections */
        earth: { dark: '#1a1208', mid: '#221609', panel: '#2c1f0e' },
      },
      fontFamily: {
        title: ['"Bebas Neue"', 'sans-serif'],
        body:  ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        gridMove: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '1',  transform: 'scaleY(1)' },
          '50%':      { opacity: '0.4', transform: 'scaleY(0.6)' },
        },
        blink: { '50%': { opacity: '0' } },
        bounceUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-up':        'fadeUp 0.8s ease both',
        'grid-move':      'gridMove 20s linear infinite',
        'scroll-pulse':   'scrollPulse 2s infinite',
        blink:            'blink 1s step-end infinite',
        'bounce-up':      'bounceUp 1s ease',
        shimmer:          'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
