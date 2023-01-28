import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import singer from './singer/sagas'
import song from './song/sagas'
import search from './search-result/sagas'
import slide from './slide/sagas'
import songHistory from './song-history/sagas'
import favoriteSong from './favorite-song/sagas'
import mySong from './my-song/sagas'

export default function* rootSaga() {
  yield all([
    user(),
    menu(),
    settings(),
    singer(),
    song(),
    search(),
    slide(),
    songHistory(),
    favoriteSong(),
    mySong(),
  ])
}
