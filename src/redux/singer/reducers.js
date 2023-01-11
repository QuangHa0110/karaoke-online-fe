import actions from './actions'

const initialState = {
  singerList: [],
  pagination: {
    current: 1,
    pageSize: 20,
  },
}

export default function singerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
