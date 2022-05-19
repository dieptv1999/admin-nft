import {SET_ACTIVATING_CONNECTOR} from "./action_types";


export default {
  setActivatingConnector: (activatingConnector, connector) => ({
    type: SET_ACTIVATING_CONNECTOR,
    activatingConnector,
    connector,
  }),
}
