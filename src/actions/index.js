/**
 * Note: There is no reference to store or dispatcher here
 */

import request from 'superagent';
import {INIT_DATA, LOGIN_FACEBOOK, UPDATE_SETTINGS, ADD_CATEGORY, ADD_SPENDING, ADD_INCOME, SELECT_CATEGORY} from './types';

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
export const initData = () => (dispatch, getState) => {
  dispatch({ type: INIT_DATA, status: 'pending' });

  return Promise.all([
    new Promise((resolve, reject) =>
      request.get('/api/settings')
        .set('x-access-key', '0')
        .send()
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          let data = response.body;

          resolve(data.settings);
        })),
    new Promise((resolve, reject) =>
      request.get('/api/categories')
        .set('x-access-key', '0')
        .send()
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          let data = response.body;

          resolve(data.categories);
        })),
    new Promise((resolve, reject) =>
      request.get('/api/entries')
        .set('x-access-key', '0')
        .send()
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          let data = response.body;

          resolve(data.entries);
        }))
  ]).then(
    results => {
      const [settings, categories, entries] = results;
      const spendings = entries.filter(item => item.type === 'expense');
      const incomes = entries.filter(item => item.type === 'income');

      dispatch({ type: INIT_DATA, status: 'success', params: {settings, categories, spendings, incomes} });
    },
    error => {
      dispatch({ type: INIT_DATA, status: 'error', params: {error} });
    }
  );
};

export const loginFacebook = () => (dispatch, getState) => {
  login().then(
    () => {
      console.info(`[action:loginFacebook] User is already signed in.`);
    },
    () => {
    var url = ['https://www.facebook.com/dialog/oauth?',
      'client_id=1771952326416166',
      process.env.NODE_ENV==='production'?
        '&redirect_uri=https://rebudget-api.herokuapp.com/auth/facebook'
        :
        '&redirect_uri=http://localhost:8080/auth/facebook',
      '&scope=email'].join('');

    dispatch({ type: LOGIN_FACEBOOK, status: 'pending' });
    const childWindow = window.open(url, '_blank');

    const interval = setInterval(() => {
      if (!childWindow.closed) return;
      clearInterval(interval);

      login(false);
    }, 500);
  });

  function login (probe=true) {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          FB.api('/me', {fields: 'name'}, function(response) {
            if (response && response.error) {
              dispatch({ type: LOGIN_FACEBOOK, status: 'error', params: {error: 'Could not connect user to Facebook'}});
              return;
            }

            const {id: fbId, name} = response;

            dispatch({ type: LOGIN_FACEBOOK, status: 'success', params: {fbId, name}});
            // Load initial data only when logged in
            dispatch(initData());
            resolve();
          });
        }
        else {
          if (probe) {
            reject();
          }
          else {
            reject();
            dispatch({ type: LOGIN_FACEBOOK, status: 'error', params: {error: 'Could not connect user to Facebook'}});
          }
        }
      });
    });
  }
};

export const updateSettings = (settings) => (dispatch, getState) => {
  dispatch({ type: UPDATE_SETTINGS, status: 'pending' });

  return new Promise(resolve =>
    request.post('/api/settings')
      .set('x-access-key', '0')
      .send({settings})
      .end((error, response) => {
      if (error) {
        return dispatch({ type: UPDATE_SETTINGS, status: 'error', params: {error} });
      }
      let data = response.body;

      dispatch({ type: UPDATE_SETTINGS, status: 'success', params: data.settings });
      resolve();
    })
  );
};

export const addCategory = (label) => (dispatch, getState) => {
  dispatch({ type: ADD_CATEGORY, status: 'pending' });

  let category = {label};

  return new Promise (resolve => {
    request.post('/api/categories')
      .set('x-access-key', '0')
      .send(category).end((error, response) => {
      if (error) {
        return dispatch({ type: ADD_CATEGORY, status: 'error', params: {error} });
      }
      let data = response.body;

      dispatch({ type: ADD_CATEGORY, status: 'success', params: {category: data.category} });
      resolve();
    });
  });
};

export const addSpending = (spending) => (dispatch, getState) => {
  dispatch({ type: ADD_SPENDING, status: 'pending' });

  let entry = Object.assign({type: 'expense'}, spending);

  return new Promise(resolve =>
    request.post('/api/entries')
      .set('x-access-key', '0')
      .send(entry).end((error, response) => {
      if (error) {
        return dispatch({ type: ADD_SPENDING, status: 'error', params: {error} });
      }
      let data = response.body;

      dispatch({ type: ADD_SPENDING, status: 'success', params: {spending: data.entry} });
      resolve()
    })
  );
};

export const addIncome = (income) => (dispatch, getState) => {
  dispatch({ type: ADD_INCOME, status: 'pending' });

  let entry = Object.assign({type: 'income'}, income);

  return new Promise(resolve =>
    request.post('/api/entries')
      .set('x-access-key', '0')
      .send(entry).end((error, response) => {
      if (error) {
        return dispatch({ type: ADD_INCOME, status: 'error', params: {error} });
      }
      let data = response.body;

      dispatch({ type: ADD_INCOME, status: 'success', params: {income: data.entry} });
      resolve()
    })
  );
};

export const selectCategory = (categoryId) => {
  return {
    type: SELECT_CATEGORY,
    params: {
      categoryId
    }
  };
};
