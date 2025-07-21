/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#dce2f0',
          200: '#c1cce4',
          300: '#9baed2',
          400: '#748ebb',
          500: '#5874a7',
          600: '#455c89',
          700: '#38496e',
          800: '#2f3d5a',
          900: '#0F172A',
        },
      },
    },
  },
  plugins: [],
};