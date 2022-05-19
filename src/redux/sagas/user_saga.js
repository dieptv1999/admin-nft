import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import {
  FETCH_USER_BALANCES,
} from '../actions/user/action_types';
import actions from '../actions/user';
import rf from '../../requests/RequestFactory';
import constant from "../../utils/constant";

// saga effect

function* fetchUserBalances() {
  try {
    const resp = yield call(() => rf.getRequest('UserRequest').fetchUserBalances());
    if (resp.error.code === 400) {
      window.localStorage.setItem(constant.SESSION, '');
      return;
    }
    yield put(actions.fetchUserBalancesSucceedAction(resp.data));
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
    yield put(actions.fetchUserBalancesFailedAction(err));
  }
}

function* watchAllUsers() {
  yield takeLatest(FETCH_USER_BALANCES, fetchUserBalances);
}

export default function* rootSaga() {
  yield all([fork(watchAllUsers)]);
}
