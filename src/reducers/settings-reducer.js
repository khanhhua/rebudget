import { INIT_DATA, UPDATE_SETTINGS } from '../actions/types';

const settingsReducer = (state = {}, {type, status, params}) => {
  let newState;

  if (status !== 'success') {
    return state;
  }

  if (type === INIT_DATA) {
    let {settings} = params;
    newState = Object.assign({}, state, settings);
  }
  else if (type === UPDATE_SETTINGS) {
    let {currency} = params;
    newState = Object.assign({}, state, {currency});
  }

  return newState || state;
};

export default settingsReducer;