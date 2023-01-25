import actions from './actions'

const initialState = {
  isFavoriteSong: false,
  favoriteSongs: [],
  totalFavoriteSongs: 0,
  totalPages: 0,
  loading: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
