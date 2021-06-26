/**
 * Vue Axios
 * @library
 */
// Lib imports
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  install(Vue) {
    const baseConfig = {
      baseURL: process.env.baseURL || process.env.apiUrl || 'http://localhost:3001',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
    const securedConfig = {
      ...baseConfig,
      withCredentials: true,
      headers: {
        ...baseConfig.headers,
        Authorization: 'JWT eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJtZSIsInVzZXJfZW1haWwiOiJtZUBtZS5jb20iLCJ1c2VyX2FkbWluIjp0cnVlLCJleHAiOjE2MjM4NTU0NTZ9.mzfQJCy-XV6nNUNCrznEtAeknNq604E7bk-ekNf3CCg'
      }
    }
    const securedAxiosInstance = axios.create(securedConfig)
    const plainAxiosInstance = axios.create(baseConfig)

    plainAxiosInstance.interceptors.response.use(plainResp => {
      if (plainResp.config.url === '/login' && plainResp.config.method === 'post' && plainResp.data.token && plainResp.status === 200) {
        const { token } = plainResp.data
        securedAxiosInstance.interceptors.request.use(config => {
          config.headers = {
            ...config.headers,
            Authorization: `JWT ${token}`
          }
          return config
        })
      }
      return plainResp
    })

    Vue.use(VueAxios, {
      secured: securedAxiosInstance,
      plain: plainAxiosInstance
    })
  }
}
