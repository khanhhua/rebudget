import { INIT_DATA, ADD_CATEGORY } from '../actions/types';

const categoriesReducer = (state=[], {type, status, params}) => {
  let newState;

  if (status !== 'success') {
    return state;
  }

  if (type === ADD_CATEGORY) {
    let {category} = params;

    newState = state.concat(category);
  }
  else if (type === INIT_DATA) {
    let {categories} = params;
    newState = categories;
  }

  return newState || state;
};

export default categoriesReducer;