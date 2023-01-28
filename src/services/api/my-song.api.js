import config from './config'

const MySongAPI = {
  createMySong: (payload) => config.post(`/my-songs`, payload),
  getMySongs: (payload) =>
    config.get('/my-songs', {
      params: {
        ...payload,
      },
    }),
  deleteMySongById: (id) => config.delete(`/my-songs/${id}`),
}

export default MySongAPI
