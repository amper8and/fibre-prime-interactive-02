/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
        mtn: ['MTN Brighter Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(40px,6vw,64px)', { lineHeight: '1.1', fontWeight: '700' }],
        'page':    ['clamp(28px,3vw,36px)', { lineHeight: '1.2', fontWeight: '700' }],
        'section': ['clamp(20px,2vw,24px)', { lineHeight: '1.3', fontWeight: '700' }],
        'body':    ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label':   ['13px', { lineHeight: '1.4', fontWeight: '300' }],
      },
      borderRadius: {
        'card': '12px',
        'btn':  '10px',
      },
      boxShadow: {
        'card':   '0 8px 24px rgba(0,0,0,0.08)',
        'card-lg':'0 16px 48px rgba(0,0,0,0.12)',
        'yellow': '0 0 32px rgba(255,203,0,0.45)',
        'yellow-sm':'0 0 12px rgba(255,203,0,0.35)',
      },
      maxWidth: {
        'fp': '1400px',
      },
      transitionDuration: {
        'ui': '200ms',
        'ui-slow': '300ms',
      },
    },
  },
  plugins: [],
};
