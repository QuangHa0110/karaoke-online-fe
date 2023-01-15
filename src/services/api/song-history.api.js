import config from './config'

const SongHistoryAPI = {
  getSongHistories: (payload) => {
    return config.get(`/song-histories`, {
      params: {
        ...payload,
      },
    })
  },
  createSongHistory: (payload) => config.post(`/song-histories`, payload),
  deleteSongHistory: (id) => config.delete(`/song-histories/${id}`),
}

export default SongHistoryAPI
