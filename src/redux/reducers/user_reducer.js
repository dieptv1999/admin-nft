import {GET_PERMISSION_SUCCESS, LOGIN_SUCCESS} from "../actions/user/action_types";
import constant from "../../utils/constant";

const defaultParams = {
  user: JSON.parse(window.localStorage.getItem(constant.USER)) || {},
  permissions: [],
};

export default (state = defaultParams, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      window.localStorage.setItem(constant.TOKEN, action.params?.accessToken);
      window.localStorage.setItem(constant.USER, JSON.stringify(action.params?.user));
      state.user = action.params?.user;
      return state;
    }
    case GET_PERMISSION_SUCCESS: {
      state.permissions = action.params
      return state;
    }
    default:
      return {
        ...state,
      };
  }
};
