export default (
  state = {
    inited: false,
  }, action,
) => {
  switch (action.type) {
    case '@@__INIT__SUCCEED': {
      return {
        ...state,
        inited: true,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
