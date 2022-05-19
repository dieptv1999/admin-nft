import {SET_ACTIVATING_CONNECTOR} from "../actions/wallet/action_types";
import constant from "../../utils/constant";

export default (state = {
  activatingConnector: {}
}, action) => {
  switch (action.type) {
  case SET_ACTIVATING_CONNECTOR:
    if (action?.connector)
      localStorage.setItem(constant.CONNECTOR, action?.connector)
    return {
      ...state,
      activatingConnector: action.activatingConnector
    }
  default:
    return {
      ...state,
    };
  }
};
