import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import io from 'socket.io-client'

loadFonts()

const socket = io.connect(process.env.VUE_APP_SOCKET_CONNECT, {
  autoConnect: true,
  transports: ['websocket']
})

const app = createApp(App)

app.use(router).use(store).use(vuetify).mount('#app')
app.config.globalProperties.$socket = socket
