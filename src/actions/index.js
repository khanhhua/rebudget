/**
 * Note: There is no reference to store or dispatcher here
 */

import request from 'superagent';
import {INIT_DATA, LOGIN_FACEBOOK, LINK, UPDATE_SETTINGS, ADD_CATEGORY, ADD_SPENDING, ADD_INCOME, SELECT_CATEGORY} from './types';

const API_PREFIX = process.env.API_PREFIX || '';
/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
export const initData = () => (dispatch, getState) => {
  const state = getState();
  const {auth} = state.networkActivity;
  if (!auth) {
    return Promise.reject();
  }
  const {jwt} = auth;

  dispatch({ type: INIT_DATA, status: 'pending' });

  return Promise.all([
    new Promise((resolve, reject) =>
      request.get(`${API_PREFIX}/api/settings`)
        .set('Authorization', `jwt ${jwt}`)
        .send()
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          let data = response.body;

          resolve(data.settings);
        })),
    new Promise((resolve, reject) =>
      request.get(`${API_PREFIX}/api/categories`)
        .set('Authorization', `jwt ${jwt}`)
        .send()
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          let data = response.body;

          resolve(data.categories);
        })),
    new Promise((resolve, reject) =>
      request.get(`${API_PREFIX}/api/entries`)
        .set('Authorization', `jwt ${jwt}`)
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
      dispatch({ type: LOGIN_FACEBOOK, status: 'pending' });

      FB.login(response => {
        if (response.authResponse) {
          login(false);
        }
        else {
          dispatch({ type: LOGIN_FACEBOOK, status: 'error', params: {error: 'Could not connect user to Facebook'}});
        }
      });
    }
  );

  function login (probe=true) {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          const {accessToken} = response.authResponse;
          FB.api('/me', {fields: 'name'}, function(response) {
            if (response && response.error) {
              dispatch({ type: LOGIN_FACEBOOK, status: 'error', params: {error: 'Could not connect user to Facebook'}});
              return;
            }

            const {id: fbId, name} = response;

            dispatch({ type: LOGIN_FACEBOOK, status: 'success', params: {fbId, name}});

            // Load initial data only when logged in
            dispatch(link(accessToken));
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

export const link = (accessToken) => (dispatch, getState) => {
  dispatch({type: LINK, status: 'pending'});

  return new Promise(resolve =>
    request.post(`${API_PREFIX}/api/link`)
      .send({access_token: accessToken})
      .end((error, response) => {
        if (error) {
          return dispatch({type: LINK, status: 'error', params: {error}});
        }
        let data = response.body;

        dispatch({type: LINK, status: 'success', params: {jwt: data.jwt}});
        dispatch(initData());
        resolve();
      })
  );
};

export const updateSettings = (settings) => (dispatch, getState) => {
  const state = getState();
  const {auth} = state.networkActivity;
  if (!auth) {
    return Promise.reject();
  }

  const {jwt} = auth;

  dispatch({ type: UPDATE_SETTINGS, status: 'pending' });

  return new Promise(resolve =>
    request.post(`${API_PREFIX}/api/settings`)
      .set('Authorization', `jwt ${jwt}`)
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
  const state = getState();
  const {auth} = state.networkActivity;
  if (!auth) {
    return Promise.reject();
  }

  const {jwt} = auth;
  dispatch({ type: ADD_CATEGORY, status: 'pending' });

  let category = {label};

  return new Promise (resolve => {
    request.post(`${API_PREFIX}/api/categories`)
      .set('Authorization', `jwt ${jwt}`)
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
  const state = getState();
  const {auth} = state.networkActivity;
  if (!auth) {
    return Promise.reject();
  }

  const {jwt} = auth;

  dispatch({ type: ADD_SPENDING, status: 'pending' });

  let entry = Object.assign({type: 'expense'}, spending);

  return new Promise(resolve =>
    request.post(`${API_PREFIX}/api/entries`)
      .set('Authorization', `jwt ${jwt}`)
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
  const state = getState();
  const {auth} = state.networkActivity;
  if (!auth) {
    return Promise.reject();
  }

  const {jwt} = auth;

  dispatch({ type: ADD_INCOME, status: 'pending' });

  let entry = Object.assign({type: 'income'}, income);

  return new Promise(resolve =>
    request.post(`${API_PREFIX}/api/entries`)
      .set('Authorization', `jwt ${jwt}`)
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
