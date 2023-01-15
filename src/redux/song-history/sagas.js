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
    ...payload,
    sort: ['createdAt:desc'],
  }
  const success = yield call(SongHistoryAPI.getSongHistories, body)
  const { songHistories } = yield select((state) => state.songHistory)
  if (success) {
    yield put({
      type: 'song-history/SET_STATE',
      payload: {
        songHistories: [...songHistories, ...success.data.data],
        totalSongHistories: success.data.meta.pagination.total,
        totalPages: success.data.meta.pagination.pageCount,
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
export function* DELETE_SONG_HISTORY({ payload }) {
  yield call(SongHistoryAPI.deleteSongHistory, payload.id)
  const { songHistories } = yield select((state) => state.songHistory)
  yield put({
    type: 'song-history/SET_STATE',
    payload: {
      songHistories: songHistories.filter((songHistory) => songHistory.id !== payload.id),
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SONG_HISTORIES, GET_SONG_HISTORIES),
    takeEvery(actions.CREATE_SONG_HISTORY, CREATE_SONG_HISTORY),
    takeEvery(actions.DELETE_SONG_HISTORY, DELETE_SONG_HISTORY),
  ])
}
