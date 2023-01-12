/* eslint-disable no-unused-vars */
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SingerAPI from 'services/api/singer.api'
import SongAPI from 'services/api/song.api'
import { MUSIC_GENRE } from 'services/ultis/constants'
import actions from './actions'

export function* GET_SONGS({ payload }) {
  yield put({
    type: 'song/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const success = yield call(SingerAPI.getSingers, payload)

  const { pagination } = yield select((state) => state.singer)

  if (success) {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        singerList: success.data.data,
        loading: false,
        pagination: {
          ...pagination,
          current: success.data.meta.pagination.page,
          total: success.data.meta.pagination.total,
        },
      },
    })
  } else {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_LATEST_SONGS() {
  yield put({
    type: 'song/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const payload = {
    sort: ['updatedAt:desc'],
    'pagination[page]': 1,
    'pagination[pageSize]': 8,
    populate: '*',
  }
  const success = yield call(SongAPI.getSongs, payload)
  if (success) {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        latestSongs: success.data.data,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_SONGS_BY_GENRE({ payload }) {
  yield put({
    type: 'song/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const body = {
    populate: '*',
    'pagination[page]': payload.current,
    'pagination[pageSize]': payload.pageSize,
    sort: ['name:asc'],
    filters: {
      genre: {
        $eq: payload.genre,
      },
    },
  }
  const success = yield call(SongAPI.getSongs, body)

  if (success) {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        songsByGenre: success.data.data,
        totalSongsByGenre: success.data.meta.pagination.total,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}
export function* GET_SONG_BY_ID({ payload }) {
  yield put({
    type: 'song/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(SongAPI.getSongById, payload.id)

  if (success) {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        currentSong: success.data.data,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_SAME_GENRE_SONGS({ payload }) {
  yield put({
    type: 'song/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const body = {
    populate: '*',
    'pagination[page]': 1,
    'pagination[pageSize]': 8,
    sort: ['updatedAt:desc'],
    filters: {
      id: {
        $ne: payload.id,
      },
      genre: {
        $eq: payload.genre,
      },
    },
  }
  const success = yield call(SongAPI.getSongs, body)
  if (success) {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        sameGenreSongs: success.data.data,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_SAME_SINGER_SONGS({ payload }) {
  yield put({
    type: 'song/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const body = {
    populate: '*',
    'pagination[page]': 1,
    'pagination[pageSize]': 8,
    sort: ['updatedAt:desc'],
    filters: {
      id: {
        $ne: payload.id,
      },
      singer: {
        id: {
          $eq: payload.singerId,
        },
      },
    },
  }
  const success = yield call(SongAPI.getSongs, body)
  if (success) {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        sameSingerSongs: success.data.data,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SONGS, GET_SONGS),
    takeEvery(actions.GET_LATEST_SONGS, GET_LATEST_SONGS),
    takeEvery(actions.GET_SONGS_BY_GENRE, GET_SONGS_BY_GENRE),
    takeEvery(actions.GET_SONG_BY_ID, GET_SONG_BY_ID),
    takeEvery(actions.GET_SAME_GENRE_SONGS, GET_SAME_GENRE_SONGS),
    takeEvery(actions.GET_SAME_SINGER_SONGS, GET_SAME_SINGER_SONGS),
  ])
}
