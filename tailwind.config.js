/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* MTN brand tokens */
        'mtn-yellow': '#FFCB00',
        'mtn-black':  '#000000',
        'mtn-white':  '#FFFFFF',
        'mtn-bg':     '#F5F5F5',
        'mtn-border': '#E5E5E5',
        'mtn-panel':  '#1A1A1A',
        'mtn-grey':   '#888888',
        /* Legacy aliases */
        'fp-yellow':  '#FFCB00',
        'fp-black':   '#000000',
        'fp-white':   '#FFFFFF',
        'fp-bg':      '#F5F5F5',
        'fp-border':  '#E5E5E5',
        'fp-dark':    '#1A1A1A',
        'fp-grey':    '#555555',
        'fp-muted':   '#888888',
      },
      fontFamily: {
        mtn: ['"MTN Brighter Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(40px,6vw,64px)',  { lineHeight: '1.06', fontWeight: '700', letterSpacing: '-0.02em' }],
        'page':    ['clamp(28px,4vw,40px)',  { lineHeight: '1.12', fontWeight: '700', letterSpacing: '-0.015em' }],
        'section': ['clamp(22px,3vw,32px)',  { lineHeight: '1.20', fontWeight: '700' }],
        'body':    ['16px',  { lineHeight: '1.60', fontWeight: '400' }],
        'small':   ['14px',  { lineHeight: '1.50', fontWeight: '400' }],
        'label':   ['12px',  { lineHeight: '1.40', fontWeight: '700', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        'card':  '12px',
        'card-lg': '16px',
        'card-xl': '20px',
        'btn':   '10px',
      },
      boxShadow: {
        'card':     '0 2px 12px rgba(0,0,0,0.06)',
        'card-md':  '0 8px 24px rgba(0,0,0,0.10)',
        'card-lg':  '0 16px 48px rgba(0,0,0,0.15)',
        'yellow':   '0 0 32px rgba(255,203,0,0.45)',
        'yellow-sm':'0 0 16px rgba(255,203,0,0.30)',
        'panel':    '-8px 0 48px rgba(0,0,0,0.18)',
        'nav':      '0 4px 24px rgba(0,0,0,0.40)',
      },
      maxWidth: {
        'fp': '1400px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '220ms',
        'slow': '380ms',
      },
      animation: {
        'hotspot-pulse':    'hotspot-pulse 3s ease-in-out infinite',
        'vacuum-move':      'vacuum-move 4.5s linear infinite',
        'float':            'float 5s ease-in-out infinite',
        'glow-pulse':       'glow-pulse 2.5s ease-in-out infinite',
        'skeleton-shimmer': 'skeleton-shimmer 1.5s infinite',
      },
      spacing: {
        'nav': 'var(--nav-height)',
        'panel': 'var(--panel-width)',
      },
    },
  },
  plugins: [],
};
