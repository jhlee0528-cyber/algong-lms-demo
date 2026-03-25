/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'algong-blue': '#3D90EF',
        'algong-button': '#258AFF',
        'algong-green': '#0FD197',
        'algong-orange': '#F78D0F',
        'algong-red': '#F23A3A',
        'algong-text': '#292929',
        'algong-subtext': '#525252',
        'algong-bg': '#F5F5F5',
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans CJK KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

