/* eslint-disable no-unused-vars */
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SingerAPI from 'services/api/singer.api'
import SongAPI from 'services/api/song.api'
import { MUSIC_GENRE } from 'services/ultis/constants'
import actions from './actions'

export function* SEARCH_SINGER({ payload }) {
  yield put({
    type: 'search/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const success = yield call(SingerAPI.getSingers, payload)

  if (success) {
    yield put({
      type: 'search/SET_STATE',
      payload: {
        singers: success.data.data,
        totalSingers: success.data.meta.pagination.total,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'search/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}
export function* SEARCH_SONG({ payload }) {
  yield put({
    type: 'search/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const success = yield call(SongAPI.getSongs, payload)

  if (success) {
    yield put({
      type: 'search/SET_STATE',
      payload: {
        songs: success.data.data,
        totalSongs: success.data.meta.pagination.total,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'search/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SEARCH_SINGER, SEARCH_SINGER),
    takeEvery(actions.SEARCH_SONG, SEARCH_SONG),
  ])
}
