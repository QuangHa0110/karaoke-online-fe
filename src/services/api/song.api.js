import config from './config'

const SongAPI = {
  getSongs: (payload) =>
    config.get(`/songs`, {
      params: {
        ...payload,
      },
    }),
  getSongById: (id) => config.get(`/song/${id}`),
}

export default SongAPI
