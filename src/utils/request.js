import axios from 'axios'
import { ElMessage } from 'element-plus'

// 創建 axios 實例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '/api',
  timeout: 15000
})

// 請求攔截器
service.interceptors.request.use(
  config => {
    // 從 localStorage 獲取 token
    const token = localStorage.getItem('iot_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 響應攔截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 這裡可以根據後端返回的狀態碼進行處理
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