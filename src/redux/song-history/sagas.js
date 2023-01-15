/* eslint-disable no-unused-vars */
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SingerAPI from 'services/api/singer.api'
import SongHistoryAPI from 'services/api/song-history.api'
import SongAPI from 'services/api/song.api'
import { MUSIC_GENRE } from 'services/ultis/constants'
import actions from './actions'

export function* GET_SONG_HISTORIES({ payload }) {
  yield put({
    type: 'song-history/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const body = {
    sort: ['createdAt: desc'],
  }
  //   const payload = {
  //     sort: ['updatedAt:desc'],
  //     'pagination[page]': 1,
  //     'pagination[pageSize]': 8,
  //     populate: '*',
  //   }
  const success = yield call(SongHistoryAPI.getSongHistories, body)
  if (success) {
    yield put({
      type: 'song-history/SET_STATE',
      payload: {
        latestSongs: success.data.data,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'song-history/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_SONG_HISTORY({ payload }) {
  yield call(SongHistoryAPI.createSongHistory, payload)
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SONG_HISTORIES, GET_SONG_HISTORIES),
    takeEvery(actions.CREATE_SONG_HISTORY, CREATE_SONG_HISTORY),
])
}
