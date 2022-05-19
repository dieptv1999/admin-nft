import { combineReducers } from 'redux';
import user from './user_reducer';
import wallet from "./wallet_reducer";

const allReducers = combineReducers({
  user,
  wallet,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state.user = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
