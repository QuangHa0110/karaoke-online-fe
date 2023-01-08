import config from './config'

const AuthAPI = {
  login: (payload) => config.post(`/auth/local`, payload),
  register: (payload) => config.post(`/auth/local/register`, payload),
  forgotPassword: (payload) => config.post(`/auth/local/forgot-password`, payload),
}

export default AuthAPI
