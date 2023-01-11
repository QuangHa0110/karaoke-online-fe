/* eslint-disable no-unused-vars */
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'services/ultis/constants'
import actions from './actions'

const initialState = {
  singerList: [],
  currentSinger: null, 
  songsOfCurrentSinger: [],
  pagination: {
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
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
