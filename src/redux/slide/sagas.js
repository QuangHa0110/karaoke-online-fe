/* eslint-disable no-unused-vars */
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SlideAPI from 'services/api/slide.api'
import actions from './actions'

export function* GET_SLIDES({ payload }) {
  const success = yield call(SlideAPI.getSlides, payload)

  if (success) {
    yield put({
      type: 'slide/SET_STATE',
      payload: {
        slides: success.data.data,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SLIDES, GET_SLIDES),
  ])
}
