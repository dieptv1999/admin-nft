import {
  FETCH_USER_BALANCES,
  FETCH_USER_BALANCES_FAILED,
  FETCH_USER_BALANCES_SUCCEED,
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
};
