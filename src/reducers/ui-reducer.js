import { SELECT_CATEGORY, SHOW_MODAL } from '../actions/types';

const uiReducer = (state = {}, {type, params}) => {
  let newState;

  if (type === SELECT_CATEGORY) {
    let {categoryId} = params;
    newState = Object.assign({}, state, {selectedCategoryId: categoryId});
  }
  else if (type === SHOW_MODAL) {
    let {modalModule} = params;
    newState = Object.assign({}, state, {modal: {modalModule}});
  }

  return newState || state;
};

export default uiReducer;
