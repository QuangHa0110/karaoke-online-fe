import config from './config'

const SingerAPI = {
  getSingers: (payload) => {
    return config.get(`/singers`, {
      params: {
        ...payload,
      },
    })
  },
  getSingerById: (id) => config.get(`/singers/${id}`),
}

export default SingerAPI
