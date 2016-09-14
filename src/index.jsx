import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { createStore, combineReducers,
 applyMiddleware, bindActionCreators } from 'redux';

import FakeXMLHttpRequest from 'fake-xml-http-request';
import RouteRecognizer from 'route-recognizer';
window.FakeXMLHttpRequest = FakeXMLHttpRequest;
window.RouteRecognizer = RouteRecognizer;

import {addCategory, addSpending, selectCategory} from './actions';
import {ADD_CATEGORY, ADD_SPENDING, SELECT_CATEGORY} from './actions/types';

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

  if (type === ADD_CATEGORY && status === 'success') {
    let {category} = params;

    newState = state.concat(category);
  }

  return newState || state;
};

const spendingsReducer = (state=[], {type, status, params}) => {
  let newState;

  if (type === ADD_SPENDING && status === 'success') {
    let {spending} = params;

    newState = state.concat(spending);
  }

  return newState || state;
};

const networkActivityReducer = (state=[], {type, status, params}) => {
  let newState;
  if (status === 'error') {
    newState = Object.assign({}, state, {type, params});

    return newState;
  }
  else {
    return null;
  }
}

const reducers = combineReducers({
  categories: categoriesReducer,
  spendings: spendingsReducer,
  networkActivity: networkActivityReducer,
  ui: (state = {}, {type, params}) => {
    let newState;
    if (type === SELECT_CATEGORY) {
      let {categoryId} = params;
      newState = Object.assign({}, state, {selectedCategoryId: categoryId});
    }

    return newState || state;
  }
});

const store = createStore(reducers, { categories:[{ id:'cat00', label: 'Default' }] }, applyMiddleware(actionLogger, thunk));

const filterSpendingByCategory = (spendings, categoryId) => {
  if (!categoryId) {
    return spendings;
  }

  return spendings.filter(item => item.category === categoryId);
};

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/

const AppComponent = (props) => {
  const {addCategory, addSpending, selectCategory} = props;
  const {categories, spendings, selectedCategoryId, networkActivity} = props;

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
            
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-5">
          <CategoryListComponent {...{categories, addCategory}} onCategoryClick={selectCategory}></CategoryListComponent>          
        </div>
        <div className="col-xs-12 col-sm-7">
          <SpendingListComponent {...{spendings: filterSpendingByCategory(spendings, selectedCategoryId), addSpending}}></SpendingListComponent>
        </div>
      </div>
    </div>
  );
};

const CategoryListComponent = (props) => {
  // I am no fan of component life cycle hooks
  const { categories, addCategory } = props;
  const { onCategoryClick } = props;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button className="pull-right" onClick={()=>addCategory('Housing')}>Add category</button>
        Categories
      </div>
      <div className="panel-body">
        <ol>
        {categories.map((item) => (
          <li key={item.id} onClick={onCategoryClick.bind(undefined, item.id)}>{item.label}</li>
        ))}
        </ol>
      </div>
    </div>
  );
};

const SpendingListComponent = (props) => {

  const { spendings, addSpending } = props;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button className="pull-right" onClick={()=>addSpending({ category: 'cat00', amount: 300 })}>Add spending</button>
        Spendings
      </div>
      <div className="panel-body">
        <ol>
        {spendings.map((item) => (<li key={item.id}>{item.amount}</li>))}
        </ol>
      </div>
    </div>
  );
};

const render = (store) => () => {
  const {categories, spendings, networkActivity, ui} = store.getState();
  const {selectedCategoryId} = ui;

  ReactDOM.render(
    <AppComponent 
        {...{categories, spendings, networkActivity, selectedCategoryId}}
        {...bindActionCreators({addCategory, addSpending, selectCategory}, store.dispatch)}>
    </AppComponent>, 
    document.getElementById('root')
  );
}

const update = render(store);
store.subscribe(update);
update();