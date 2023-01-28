import config from './config'

const UploadFileAPI = {
  uploadFile: (payload) => config.post(`/upload`, payload),
}

export default UploadFileAPI
