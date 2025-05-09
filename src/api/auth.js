import request from '@/utils/request'

export async function login(data) {
  try {
    const res = await request.post('/api/login', data)
    return res
  } catch (e) {
    // 本地測試賬號
    if (data.username === 'admin' && data.password === '123456') {
      return { token: 'test-token' }
    } else {
      return { token: null }
    }
  }
}
export async function register(data) {
  try {
    const res = await request.post('/api/register', data)
    return res
  } catch (e) {
    // 本地測試註冊，僅允許 admin/123456
    if (data.username === 'admin' && data.password === '123456') {
      return { success: true }
    } else {
      return { success: false, message: '僅允許 admin/123456 測試註冊' }
    }
  }
} 