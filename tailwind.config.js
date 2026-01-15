/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        // 과제 유형별 색상
        lecture: {
          DEFAULT: '#4A90D9',
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#4A90D9',
          600: '#3B7BC7',
          700: '#2E5FA3',
        },
        activity: {
          DEFAULT: '#7CB342',
          50: '#F1F8E9',
          100: '#DCEDC8',
          500: '#7CB342',
          600: '#689F38',
          700: '#558B2F',
        },
        'ai-chat': {
          DEFAULT: '#9C27B0',
          50: '#F3E5F5',
          100: '#E1BEE7',
          500: '#9C27B0',
          600: '#8E24AA',
          700: '#7B1FA2',
        },
        library: {
          DEFAULT: '#FF9800',
          50: '#FFF3E0',
          100: '#FFE0B2',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
        },
        // 상태 색상
        completed: '#4CAF50',
        incomplete: '#F48FB1',
        'in-progress': '#2196F3',
        overdue: '#F44336',
        pending: '#9E9E9E',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
