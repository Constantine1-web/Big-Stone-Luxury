/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        bone: '#F3F0EA',
        gold: '#C8A86B',
        golddeep: '#A98A52',
        paper: '#F7F5F0',
      },
      fontFamily: {
        display: ['Kanit', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
