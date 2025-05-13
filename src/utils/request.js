import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8888/api',
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('iot_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
      console.log('当前请求头:', config.headers)
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage({
        message: res.message || '错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || '错误'))
    }
    return res
  },
  error => {
    console.error('错误：', error)
    ElMessage({
      message: error.message || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service 