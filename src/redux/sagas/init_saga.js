import {
  put, takeLatest, all, fork,
} from 'redux-saga/effects';

function* fetchInit() {
  try {
    yield put({ type: '@@__INIT__SUCCEED' });
  } catch (err) {
    console.log(err, 'err');
  }
}

function* watchInit() {
  yield takeLatest('@@__INIT__', fetchInit);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
