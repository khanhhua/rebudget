/**
 * Note: There is no reference to store or dispatcher here
 */

import request from 'superagent';
import {LOGIN_FACEBOOK, ADD_CATEGORY, ADD_SPENDING, SELECT_CATEGORY} from './types';

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
export const loginFacebook = () => (dispatch, getState) => {
  var url = ['https://www.facebook.com/dialog/oauth?',
              'client_id=1771952326416166&redirect_uri=http://localhost:8080/auth/facebook',
              '&scope=email'].join('');

  dispatch({ type: LOGIN_FACEBOOK, status: 'pending' });
  const childWindow = window.open(url, '_blank');

  const interval = setInterval(() => {
    if (!childWindow.closed) return;
    clearInterval(interval);

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        // request.get('/api/me').send().end((response) => {});
        var fbId = response.authResponse.userID;
        dispatch({ type: LOGIN_FACEBOOK, status: 'success', params: {fbId}});
      }
      else {
        dispatch({ type: LOGIN_FACEBOOK, status: 'error', params: {error: 'Could not connect user to Facebook'}});
      }
    })
  }, 500);
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
