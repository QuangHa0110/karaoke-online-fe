import config from './config'

const FavoriteSongAPI = {
  getFavoriteSongs: (payload) =>
    config.get('/favourite-songs', {
      params: {
        ...payload,
      },
    }),
  addFavoriteSong: (payload) => config.post('/favourite-songs', payload),

  removeFavoriteSong: (id) => config.delete(`/favourite-songs/${id}`),
}

export default FavoriteSongAPI
