/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'wds-',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue'
  ],
  theme: {
    // extend: {}
  },
  plugins: []
}
