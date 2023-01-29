/* eslint-disable no-unused-vars */
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SingerAPI from 'services/api/singer.api'
import SongAPI from 'services/api/song.api'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'services/ultis/constants'
import actions from './actions'

export function* GET_SINGERS({ payload }) {
  yield put({
    type: 'singer/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const success = yield call(SingerAPI.getSingers, payload)

  const { pagination } = yield select((state) => state.singer)

  if (success) {
    yield put({
      type: 'singer/SET_STATE',
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
  }
}

export function* GET_SINGER_BY_ID({ payload }) {
  yield put({
    type: 'singer/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const success = yield call(SingerAPI.getSingerById, payload.id)

  if (success) {
    yield put({
      type: 'singer/GET_SONGS_OF_SINGER',
      payload: {
        id: payload.id,
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    })
    yield put({
      type: 'singer/SET_STATE',
      payload: {
        currentSinger: success.data.data,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'singer/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_SONGS_OF_SINGER({ payload }) {
  yield put({
    type: 'singer/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const body = {
    filters: {
      singers: {
        id: {
          $eq: payload.id,
        },
      },
    },
    'pagination[page]': payload.page,
    'pagination[pageSize]': payload.pageSize,
    populate: '*',
  }
  const songs = yield call(SongAPI.getSongs, body)

  if (songs) {
    yield put({
      type: 'singer/SET_STATE',
      payload: {
        songsOfCurrentSinger: songs.data.data,
        totalSongOfCurrentSinger: songs.data.meta.pagination.total,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'singer/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SINGERS, GET_SINGERS),
    takeEvery(actions.GET_SINGER_BY_ID, GET_SINGER_BY_ID),
    takeEvery(actions.GET_SONGS_OF_SINGER, GET_SONGS_OF_SINGER),

    // GET_SINGERS({ populate: '*' }),
    // takeEvery(actions.LOGIN, LOGIN),
  ])
}
