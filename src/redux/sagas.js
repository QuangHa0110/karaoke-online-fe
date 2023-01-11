import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import singer from './singer/sagas'
import song from './song/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), singer(), song()])
}
