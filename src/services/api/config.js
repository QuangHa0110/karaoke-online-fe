import apiClient from 'services/axios'
import axios from 'axios'
import qs from 'qs'

const source = axios.CancelToken.source()
const conf = {
  cancelToken: source.token,
  paramsSerializer: params => {
    return qs.stringify(params, { skipNulls: true, arrayFormat: 'repeat' })
  },
}

const config = {
  get: (url, params) => {
    if(params){
        return apiClient.get(url, { ...params, ...conf })
    }
    return apiClient.get(url)
    
  },
  post: (url, payload) => {
    return apiClient.post(url, payload)
  },
  put: (url, payload) => {
    return apiClient.put(url, payload)
  },
  patch: (url, payload) => {
    return apiClient.patch(url, payload)
  },
  delete: url => {
    return apiClient.delete(url)
  },
}

export default config
