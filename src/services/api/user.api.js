import config from './config'

const UserAPI = {
  getCurrentUserInfo: ()=> config.get('/users/me'),
//   login: (payload) => config.post(`/auth/local/login`, payload),
//   register: (payload) => config.post(`/auth/local/register`, payload),
//   forgotPassword: (payload) => config.post(`/auth/local/forgot-password`, payload),
}

export default UserAPI
