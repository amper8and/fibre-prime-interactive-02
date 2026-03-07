/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mtn-yellow': '#FFCB00',
        'mtn-black': '#000000',
        'mtn-bg': '#F8F8F8',
        'mtn-grey': '#E5E5E5',
        'mtn-dark-grey': '#666666',
      },
      fontFamily: {
        'mtn': ['MTN Brighter Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
        'slide-in-up': 'slideInUp 0.35s ease-out',
        'pulse-yellow': 'pulseYellow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'vacuum': 'vacuum 4s linear infinite',
        'curtain-close': 'curtainClose 1.5s ease-in-out forwards',
        'lights-dim': 'lightsDim 1s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseYellow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,203,0,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255,203,0,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        vacuum: {
          '0%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(60px) translateY(0px)' },
          '50%': { transform: 'translateX(60px) translateY(30px)' },
          '75%': { transform: 'translateX(0px) translateY(30px)' },
          '100%': { transform: 'translateX(0px) translateY(0px)' },
        },
        curtainClose: {
          '0%': { width: '10%' },
          '100%': { width: '50%' },
        },
        lightsDim: {
          '0%': { opacity: '1', filter: 'brightness(1)' },
          '100%': { opacity: '0.3', filter: 'brightness(0.3)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
