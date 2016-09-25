import {LINK} from "../actions/types";

const networkActivityReducer = (state={}, {type, status, params}) => {
  let newState;
  if (type === LINK && status === 'success') {
    const {jwt} = params;
    newState = Object.assign({}, state, {auth: {jwt}});

    return newState;
  }
  if (status === 'error') {
    newState = Object.assign({}, state, {error: {type, params}});

    return newState;
  }
  else {
    return newState || state;
  }
};

export default networkActivityReducer;