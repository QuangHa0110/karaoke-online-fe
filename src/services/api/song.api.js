import config from './config'

const UserAPI = {
  getSongs: (payload) => config.get(`/songs`, payload),
  getSongById: (id) => config.get(`/song/${id}`),
}

export default UserAPI
