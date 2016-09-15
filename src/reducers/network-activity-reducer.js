const networkActivityReducer = (state=[], {type, status, params}) => {
  let newState;
  if (status === 'error') {
    newState = Object.assign({}, state, {type, params});

    return newState;
  }
  else {
    return null;
  }
};

export default networkActivityReducer;