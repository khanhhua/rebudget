import { ADD_CATEGORY } from '../actions/types';

const categoriesReducer = (state=[], {type, status, params}) => {
  let newState;

  if (type === ADD_CATEGORY && status === 'success') {
    let {category} = params;

    newState = state.concat(category);
  }

  return newState || state;
};

export default categoriesReducer;