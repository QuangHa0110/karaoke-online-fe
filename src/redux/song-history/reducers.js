import actions from './actions'

const initialState = {
  songHistories: [],
  totalSongHistories: 0,
  totalPages: 0,
  loading: false,
}

export default function songHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
