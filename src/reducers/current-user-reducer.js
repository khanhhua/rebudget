import { LOGIN_FACEBOOK } from '../actions/types';

const currentUserReducer = (state = {}, {type, status, params}) => {
  let newState;

  if (type === LOGIN_FACEBOOK && status === 'success') {
    let {fbId} = params;
    newState = Object.assign({}, state, {fbId});
  }

  return newState || state;
};

export default currentUserReducer;