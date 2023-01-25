/* eslint-disable no-unused-vars */
import { all, put, call, takeEvery, select } from 'redux-saga/effects'
import FavoriteSongAPI from 'services/api/favorite-song.api'
import actions from './actions'

export function* GET_FAVORITE_SONGS({ payload }) {
  const body = {
    ...payload,
  }
  const success = yield call(FavoriteSongAPI.getFavoriteSongs, body)
  const { favoriteSongs } = yield select((state) => state.favoriteSong)
  if (success) {
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        favoriteSongs: [...favoriteSongs, ...success.data.data],
        totalFavoriteSongs: success.data.meta.pagination.total,
        totalPages: success.data.meta.pagination.pageCount,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CHECK_FAVORITE_SONG({ payload }) {
  const body = {
    filters: {
      song: {
        id: {
          $eq: payload.song,
        },
      },
      user: {
        id: {
          $eq: payload.user,
        },
      },
    },
  }
  const favoriteSong = yield call(FavoriteSongAPI.getFavoriteSongs, body)
  if (favoriteSong && favoriteSong.data.data.length > 0) {
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        isFavoriteSong: true,
      },
    })
  } else {
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        isFavoriteSong: false,
      },
    })
  }
}

export function* ADD_FAVORITE_SONG({ payload }) {
  const success = yield call(FavoriteSongAPI.addFavoriteSong, payload)
  if (success) {
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        isFavoriteSong: true,
      },
    })
  } else {
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        isFavoriteSong: false,
      },
    })
  }
}

export function* REMOVE_FAVORITE_SONG({ payload }) {
  const body = {
    filters: {
      song: {
        id: {
          $eq: payload.song,
        },
      },
      user: {
        id: {
          $eq: payload.user,
        },
      },
    },
  }
  const favoriteSong = yield call(FavoriteSongAPI.getFavoriteSongs, body)
  if (favoriteSong) {
    yield call(FavoriteSongAPI.removeFavoriteSong, favoriteSong.data.data[0].id)
    const { favoriteSongs } = yield select((state) => state.favoriteSong)
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
        favoriteSongs: favoriteSongs.filter((element) => element.id !== payload.id),
        isFavoriteSong: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ADD_FAVORITE_SONG, ADD_FAVORITE_SONG),
    takeEvery(actions.REMOVE_FAVORITE_SONG, REMOVE_FAVORITE_SONG),
    takeEvery(actions.CHECK_FAVORITE_SONG, CHECK_FAVORITE_SONG),
    takeEvery(actions.GET_FAVORITE_SONGS, GET_FAVORITE_SONGS),
  ])
}
