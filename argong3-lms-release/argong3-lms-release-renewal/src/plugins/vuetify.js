// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          // Main Colors
          primary: '#3D90EF',      // 메인 컬러
          secondary: '#258AFF',    // 버튼 컬러

          // Status Colors (신호등)
          success: '#0FD197',      // 정상
          warning: '#F78D0F',      // 주의
          error: '#F23A3A',        // 위험

          // Text Colors
          'text-primary': '#292929',
          'text-secondary': '#525252',
          'text-hint': '#9A9A9A',

          // Background
          background: '#F5F5F5',
          surface: '#FFFFFF',

          // Additional
          'light-blue': '#F1F8FF',
          'chart-blue': '#CAE3FF',
          'chart-gray': '#E5E5E5',
        }
      }
    }
  }
})
