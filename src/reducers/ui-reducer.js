import { SELECT_CATEGORY } from '../actions/types';

const uiReducer = (state = {}, {type, params}) => {
  let newState;
  if (type === SELECT_CATEGORY) {
    let {categoryId} = params;
    newState = Object.assign({}, state, {selectedCategoryId: categoryId});
  }

  return newState || state;
};

export default uiReducer;