import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers,
 applyMiddleware, bindActionCreators } from 'redux';

/*---------------------------------------------------------
/ REDUCERS and STORE
/--------------------------------------------------------*/
const categoriesReducer = (state=[], {type, params}) => {
  let newState;
  if (type === 'ADD_CATEGORY') {
    let {category} = params;

    newState = state.concat(category);
  }

  return newState || state;
};

const spendingsReducer = (state=[], {type, params}) => {
  return state;
};

const reducers = combineReducers({
  categories: categoriesReducer,
  spendings: spendingsReducer
});

const store = createStore(reducers, { categories: ['Default'] });

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
const addCategory = (category) => ({ type: 'ADD_CATEGORY', params: {category} });
const addSpending = (spending) => ({ type: 'ADD_SPENDING', params: {spending} });

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/

const AppComponent = (props) => {
  const {addCategory, addSpending} = props;
  const {categories, spendings} = props;

  return (
    <div className="component">
      <h1>The React Fucking Redux works!</h1>
      <div>
        <button onClick={()=>addCategory('Housing')}>Add category</button>
        <button onClick={()=>addCategory({ category:'Housing', amount:1200 })}>Add spending</button>
      </div>

      <h2>Categories</h2>
      <ol>
      {categories.map((item, i) => (<li key={i}>{item}</li>))}
      </ol>
    </div>
  );
};

const render = (store) => () => {
  const {categories, spendings} = store.getState();

  ReactDOM.render(
    <AppComponent 
        {...{categories, spendings}}
        {...bindActionCreators({addCategory, addSpending}, store.dispatch)}>
    </AppComponent>, 
    document.getElementById('root')
  );
}

const update = render(store);
store.subscribe(update);
update();