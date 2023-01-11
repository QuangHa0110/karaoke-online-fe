import config from './config'

const SongAPI = {
  getSongs: (payload) =>
    config.get(`/songs`, {
      params: {
        ...payload,
      },
    }),
  getSongById: (id) => config.get(`/songs/${id}`),
}

export default SongAPI
