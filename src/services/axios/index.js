import { notification } from 'antd'
import axios from 'axios'
import store from 'store'
import { logout } from '../jwt'

const BASE_URL = '/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

apiClient.interceptors.request.use((request) => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    let messageError
    if (data.fieldErrors !== undefined) {
      messageError = data.fieldErrors[0].message
    } else {
      messageError = data.title
    }
    if (data.status === 403) {
      notification.error({
        message: 'Lỗi',
        description: 'Bạn không đủ quyền thực hiện',
      })

      // window.location.href = '/auth/403'
      logout()
    } else if (data.detail === '404 NOT_FOUND' && data.status === 400) {
      notification.error({
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, hãy đăng nhập lại',
      })
      logout()
    } else if (data.detail === '404 NOT_FOUND' && data.status === 404) {
      notification.error({
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, hãy đăng nhập lại',
      })
      logout()
    } else if (data.status === 401 && data.title === 'Unauthorized') {
      notification.error({
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, hãy đăng nhập lại',
      })
      logout()
    } else if (data.status >= 400 && data.status <= 405) {
      notification.error({
        message: 'Lỗi',
        description: messageError,
      })
    } else if (data.status !== 200 && data.status !== 201 && data.status !== 204) {
      notification.error({
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra',
      })
    }
  }
})

export default apiClient
