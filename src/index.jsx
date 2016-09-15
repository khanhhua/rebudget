import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { createStore, combineReducers,
 applyMiddleware, bindActionCreators } from 'redux';

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/ 
import {addCategory, addSpending, selectCategory} from './actions';

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/ 
import {AppComponent} from './containers';

/*---------------------------------------------------------
/ MIDDLEWARES
/--------------------------------------------------------*/ 
import {actionLogger} from './middlewares';

/*---------------------------------------------------------
/ REDUCERS and STORE
/--------------------------------------------------------*/
import {default as rootReducer} from './reducers';

/*---------------------------------------------------------
/ STORE
/--------------------------------------------------------*/ 
const store = createStore(rootReducer, { categories:[{ id:'cat00', label: 'Default' }] }, applyMiddleware(actionLogger, thunk));

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