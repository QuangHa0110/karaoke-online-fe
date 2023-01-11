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
  console.log("🚀 ~ file: sagas.js:15 ~ function*GET_SINGERS ~ payload", payload)

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

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SINGERS, GET_SINGERS),

    // GET_SINGERS({ populate: '*' }),
    // takeEvery(actions.LOGIN, LOGIN),
  ])
}
