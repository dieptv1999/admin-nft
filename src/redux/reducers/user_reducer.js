const defaultParams = {
  userBalances: {},
};

export default (state = defaultParams, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
