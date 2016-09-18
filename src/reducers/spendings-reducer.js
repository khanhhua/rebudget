import { INIT_DATA, ADD_SPENDING } from '../actions/types';

const spendingsReducer = (state=[], {type, status, params}) => {
  let newState;

  if (status !== 'success') {
    return state;
  }

  if (type === ADD_SPENDING) {
    let {spending} = params;

    newState = state.concat(spending);
  }
  else if (type === INIT_DATA) {
    newState = params.spendings;
  }

  return newState || state;
};

export default spendingsReducer;