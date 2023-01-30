/* eslint-disable no-unused-vars */
import { notification } from 'antd'
import { all, put, call, takeEvery, select } from 'redux-saga/effects'
import MySongAPI from 'services/api/my-song.api'
import actions from './actions'

export function* CREATE_MY_SONG({ payload }) {
  const success = yield call(MySongAPI.createMySong, payload)
  if (success) {
    notification.success({
      message: 'Lưu ghi âm thành công. Đã copy đường dẫn chia sẻ vào bộ nhớ tạm',
    })
  } else {
    notification.error({
      message: 'Lưu ghi âm không thành công, vui lòng thử lại',
    })
  }
}

export function* GET_MY_SONGS({ payload }) {
  const body = {
    ...payload,
  }
  const success = yield call(MySongAPI.getMySongs, body)
  const { mySongs } = yield select((state) => state.mySong)
  if (success) {
    yield put({
      type: 'my-song/SET_STATE',
      payload: {
        mySongs: [...mySongs, ...success.data.data],
        totalMySongs: success.data.meta.pagination.total,
        totalPages: success.data.meta.pagination.pageCount,
        loading: false,
      },
    })
  } else {
    yield put({
      type: 'my-song/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* DELETE_MY_SONG_BY_ID({ payload }) {
  const success = yield call(MySongAPI.deleteMySongById, payload.id)
  if (success) {
    const { mySongs } = yield select((state) => state.mySong)
    yield put({
      type: 'my-song/SET_STATE',
      payload: {
        mySongs: mySongs.filter((element) => element.id !== payload.id),
      },
    })

    notification.info({
      message: `Đã xóa bài hát karaoke ${payload.name} của bạn`,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CREATE_MY_SONG, CREATE_MY_SONG),
    takeEvery(actions.GET_MY_SONGS, GET_MY_SONGS),
    takeEvery(actions.DELETE_MY_SONG_BY_ID, DELETE_MY_SONG_BY_ID),
  ])
}
