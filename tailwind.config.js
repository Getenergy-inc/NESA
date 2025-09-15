/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deepGold: '#FFB92E',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        // Add base styles for better cross-browser compatibility
        'html': { 
          '-webkit-text-size-adjust': '100%',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeLegibility',
        },
        // Ensure consistent box-sizing
        '*, *::before, *::after': {
          'box-sizing': 'border-box',
        },
        // Improve Edge compatibility
        '@supports (-ms-ime-align:auto)': {
          'html': {
            'text-rendering': 'optimizeLegibility !important',
          },
          'body': {
            '-webkit-font-smoothing': 'antialiased !important',
          }
        }
      });
    }
  ],
  // Enable JIT mode for better performance
  mode: 'jit',
  // Ensure purging doesn't remove needed styles
  safelist: [
    'text-deepGold',
    'hover:text-deepGold',
    'bg-deepGold',
    'border-deepGold',
    'translate-x-0',
    'translate-x-full',
    'translate-y-0',
    'scale-0.95',
    'scale-1',
  ]
};