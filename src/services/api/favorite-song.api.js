import config from './config'

const FavoriteSongAPI = {
  addFavoriteSong: (payload) => config.post('/favourite-songs', payload),
}

export default FavoriteSongAPI
