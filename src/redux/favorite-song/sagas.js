/* eslint-disable no-unused-vars */
import { notification } from 'antd'
import { all, put, call, takeEvery } from 'redux-saga/effects'
import FavoriteSongAPI from 'services/api/favorite-song.api'
import actions from './actions'

export function* ADD_FAVORITE_SONG({ payload }) {
   yield call(FavoriteSongAPI.addFavoriteSong, payload)

//   if(!success){
//     notification.error( {
//         message
//     })
//   }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.ADD_FAVORITE_SONG, ADD_FAVORITE_SONG)])
}
