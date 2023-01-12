import actions from './actions'

const initialState = {
  latestSongs: [],
  totalSongsByGenre: 0,
  songsByGenre: [],
  currentSong: null,
  sameGenreSongs: [],
  sameSingerSongs: [],
  loading: false,
}

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
