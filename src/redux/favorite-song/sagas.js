/* eslint-disable no-unused-vars */
import { all, put, call, takeEvery } from 'redux-saga/effects'
import FavoriteSongAPI from 'services/api/favorite-song.api'
import actions from './actions'

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
    yield put({
      type: 'favorite-song/SET_STATE',
      payload: {
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
  ])
}
