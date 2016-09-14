import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { createStore, combineReducers,
 applyMiddleware, bindActionCreators } from 'redux';

import request from 'superagent';

import FakeXMLHttpRequest from 'fake-xml-http-request';
import RouteRecognizer from 'route-recognizer';
window.FakeXMLHttpRequest = FakeXMLHttpRequest;
window.RouteRecognizer = RouteRecognizer;


/*---------------------------------------------------------
/ MIDDLEWARES
/--------------------------------------------------------*/ 
const actionLogger = ({ dispatch, getState }) => (next) => (action) => {
  console.group(`action: `, typeof action === 'function'?'Thunk':action);
  console.log(`state:`, getState());
  console.groupEnd();

  return next(action);
};



/*---------------------------------------------------------
/ REDUCERS and STORE
/--------------------------------------------------------*/
const categoriesReducer = (state=[], {type, status, params}) => {
  let newState;

  if (type === 'ADD_CATEGORY' && status === 'success') {
    let {category} = params;

    newState = state.concat(category);
  }

  return newState || state;
};

const spendingsReducer = (state=[], {type, status, params}) => {
  let newState;

  if (type === 'ADD_SPENDING' && status === 'success') {
    let {spending} = params;

    newState = state.concat(spending);
  }

  return newState || state;
};

const networkActivityReducer = (state=[], {type, status, params}) => {
  let newState;
  if (status === 'error') {
    newState = Object.assign({type, params}, state);

    return newState;
  }
  else {
    return null;
  }
}

const reducers = combineReducers({
  categories: categoriesReducer,
  spendings: spendingsReducer,
  networkActivity: networkActivityReducer
});

const store = createStore(reducers, { categories: ['Default'] }, applyMiddleware(actionLogger, thunk));

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
const addCategory = (category) => (dispatch, getState) => {
  // dispatch({ type: 'ADD_CATEGORY', params: {category} });
  dispatch({ type: 'ADD_CATEGORY', status: 'pending' });

  request.post('/api/categories').send({category}).end((error, response) => {
    if (error) {
      return dispatch({ type: 'ADD_CATEGORY', status: 'error', params: {error} });
    }
    
    dispatch({ type: 'ADD_CATEGORY', status: 'success', params: {category} });
  })
};
const addSpending = (spending) => (dispatch, getState) => {
  dispatch({ type: 'ADD_SPENDING', status: 'pending' });

  let entry = Object.assign({type: 'expense'}, spending);

  request.post('/api/entries').send({entry}).end((error, response) => {
    if (error) {
      return dispatch({ type: 'ADD_SPENDING', status: 'error', params: {error} });
    }
    let data = response.body;
    
    dispatch({ type: 'ADD_SPENDING', status: 'success', params: {spending: data.entry} });
  })
};

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/

const AppComponent = (props) => {
  const {addCategory, addSpending, networkActivity} = props;
  const {categories, spendings} = props;

  return (
    <div className="container">
      <h1>The React Fucking Redux works!</h1>
      <div className="row">
        <div className="col-xs-12">
          {networkActivity && (
          <div className="alert warn">
            <pre>
              <ul>
                <li>type: {networkActivity.type}</li>
                <li>params: {JSON.stringify(networkActivity.params)}</li>
              </ul>
            </pre>
          </div>
          )}
          <div>
            <button onClick={()=>addCategory('Housing')}>Add category</button>
            <button onClick={()=>addSpending({ category:'Housing', amount:1200 })}>Add spending</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <h2>Categories</h2>
          <ol>
          {categories.map((item, i) => (<li key={i}>{item}</li>))}
          </ol>
        </div>
        <div className="col-xs-12 col-sm-9">
          <h2>Spendings</h2>
          <ol>
          {spendings.map((item) => (<li key={item.id}>{item.amount}</li>))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const render = (store) => () => {
  const {categories, spendings, networkActivity} = store.getState();

  ReactDOM.render(
    <AppComponent 
        {...{categories, spendings, networkActivity}}
        {...bindActionCreators({addCategory, addSpending}, store.dispatch)}>
    </AppComponent>, 
    document.getElementById('root')
  );
}

const update = render(store);
store.subscribe(update);
update();