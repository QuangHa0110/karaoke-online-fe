/* eslint-disable no-unused-vars */
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'services/ultis/constants'
import actions from './actions'

const initialState = {
  slides: [],
}

export default function slideReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
