import {
  FETCH_USER_BALANCES,
  FETCH_USER_BALANCES_FAILED,
  FETCH_USER_BALANCES_SUCCEED, GET_PERMISSION, GET_PERMISSION_SUCCESS, LOGIN, LOGIN_SUCCESS, REGISTER, REGISTER_SUCCESS,
} from './action_types';

export default {
  fetchUserBalancesAction: (data) => ({
    type: FETCH_USER_BALANCES,
    params: {
      data,
    },
  }),
  fetchUserBalancesSucceedAction: (data) => ({
    type: FETCH_USER_BALANCES_SUCCEED,
    params: {
      data,
    },
  }),
  fetchUserBalancesFailedAction: (data) => ({
    type: FETCH_USER_BALANCES_FAILED,
    params: {
      data,
    },
  }),

  login: (params, callback) => ({
    type: LOGIN,
    params,
    callback,
  }),

  loginSuccess: (params) => ({
    type: LOGIN_SUCCESS,
    params,
  }),

  register: (params, callback) => ({
    type: REGISTER,
    params,
    callback,
  }),

  registerSuccess: (params) => ({
    type: REGISTER_SUCCESS,
    params,
  }),

  getPermission: (params, callback) => ({
    type: GET_PERMISSION,
    params,
    callback,
  }),

  getPermissionSuccess: (params) => ({
    type: GET_PERMISSION_SUCCESS,
    params,
  }),
};
