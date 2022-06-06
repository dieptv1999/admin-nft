import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import {
  GET_PERMISSION,
  LOGIN, REGISTER,
} from '../actions/user/action_types';
import rf from '../../requests/RequestFactory';
import constant from "../../utils/constant";
import {isEmpty, isFunction} from "lodash";
import actions from "../actions/user";

function* login(action) {
  try {
    const resp = yield call((params) => rf.getRequest('UserRequest').login(params), action.params);
    if (resp?.user?.roles && !isEmpty(resp?.user?.roles)) {
      yield put(actions.getPermission({ids: resp?.user?.roles?.map(r => r?.id)}))
    }
    yield put(actions.loginSuccess(resp));
    if (isFunction(action.callback)) action.callback();
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
  }
}

function* register(action) {
  try {
    const resp = yield call((params) => rf.getRequest('UserRequest').register(params), action.params);
    yield put(actions.registerSuccess(resp));
    if (isFunction(action.callback)) action.callback(true);
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message3');
    if (isFunction(action.callback)) action.callback(false);
  }
}

function* getPermission(action) {
  try {
    const [permission, total] = yield call((params) => rf.getRequest('UserRequest').getPermission(params), action.params);
    yield put(actions.getPermissionSuccess(permission));
    if (isFunction(action.callback)) action.callback(true);
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
    if (isFunction(action.callback)) action.callback(false);
  }
}

function* watchAllUsers() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
  yield takeLatest(GET_PERMISSION, getPermission);
}

export default function* rootSaga() {
  yield all([fork(watchAllUsers)]);
}
