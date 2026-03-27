import axios from 'axios'
import { setInterceptors } from './interceptor'

const createInstance = () => {
  return axios.create({
    baseURL: process.env.VUE_APP_CONNECT
  })
}

const createInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_CONNECT
  })
  return setInterceptors(instance)
}

const createsocketInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_SOCKET_CONNECT
  })
  return setInterceptors(instance)
}

const instance = createInstance()
const instanceAuth = createInstanceWithAuth()
const socketinstance = createsocketInstanceWithAuth()

export { instance, instanceAuth, socketinstance }
