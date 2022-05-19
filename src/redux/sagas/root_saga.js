import { all } from 'redux-saga/effects';
import watchAllUsers from './user_saga';
import watchInit from './init_saga';

export default function* rootSaga() {
  yield all([
    watchAllUsers(),
    watchInit(),
  ]);
}
