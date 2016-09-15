import { ADD_SPENDING } from '../actions/types';

const spendingsReducer = (state=[], {type, status, params}) => {
  let newState;

  if (type === ADD_SPENDING && status === 'success') {
    let {spending} = params;

    newState = state.concat(spending);
  }

  return newState || state;
};

export default spendingsReducer;