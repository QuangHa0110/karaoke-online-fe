import actions from './actions'

const initialState = {
  singers: [],
  totalSingers: 0,
  songs: [],
  totalSongs: 0,
  loading: false,
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
