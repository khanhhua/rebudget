import request from 'superagent';
import {ADD_CATEGORY, ADD_SPENDING, SELECT_CATEGORY, SHOW_MODAL} from './types';

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
export const showCategoryModal = () => {
  return {
    type: SHOW_MODAL, params: { modalModule: './components/category-edit-modal' }
  };
};

export const addCategory = (label) => (dispatch, getState) => {
  // dispatch({ type: ADD_CATEGORY, params: {category} });
  dispatch({ type: ADD_CATEGORY, status: 'pending' });

  let category = {label};

  request.post('/api/categories').send({category}).end((error, response) => {
    if (error) {
      return dispatch({ type: ADD_CATEGORY, status: 'error', params: {error} });
    }
    let data = response.body;

    dispatch({ type: ADD_CATEGORY, status: 'success', params: {category: data.category} });
  })
};
export const addSpending = (spending) => (dispatch, getState) => {
  dispatch({ type: ADD_SPENDING, status: 'pending' });

  let entry = Object.assign({type: 'expense'}, spending);

  request.post('/api/entries').send({entry}).end((error, response) => {
    if (error) {
      return dispatch({ type: ADD_SPENDING, status: 'error', params: {error} });
    }
    let data = response.body;

    dispatch({ type: ADD_SPENDING, status: 'success', params: {spending: data.entry} });
  })
};

export const selectCategory = (categoryId) => {
  return {
    type: SELECT_CATEGORY,
    params: {
      categoryId
    }
  };
};
