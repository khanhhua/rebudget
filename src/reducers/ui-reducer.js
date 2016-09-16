import { SELECT_CATEGORY, SHOW_MODAL, CLOSE_MODAL } from '../actions/types';

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
  else if (type === CLOSE_MODAL) {
    newState = Object.assign({}, state, {modal: null});
  }

  return newState || state;
};

export default uiReducer;
