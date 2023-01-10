/* eslint-disable no-unused-vars */
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import SingerAPI from 'services/api/singer.api'
import actions from './actions'

export function* GET_SINGERS({ payload }) {
  yield put({
    type: 'singer/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const success = yield call(SingerAPI.getSingers, payload)

  if (success) {
    console.log("🚀 ~ file: sagas.js:17 ~ function*GET_SINGERS ~ success", success.data.data)
    yield put({
      type: 'singer/SET_STATE',
      payload: {
        singerList: success.data.data,
        loading: false,
      },
    })
  }
  const { singerList } = yield select((state) => state.singer)
  console.log("🚀 ~ file: sagas.js:26 ~ function*GET_SINGERS ~ singerList", singerList)
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SINGERS, GET_SINGERS),
    // GET_SINGERS({ populate: '*' }),
    // takeEvery(actions.LOGIN, LOGIN),
  ])
}
