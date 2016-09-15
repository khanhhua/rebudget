import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';


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

const mapStateToProps = (state, ownProps) => {
  const {categories, spendings, networkActivity, ui} = state;

  return {categories, spendings, networkActivity, selectedCategoryId: ui.selectedCategoryId};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addCategory, addSpending, selectCategory}, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

const render = (store) => () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

const update = render(store);
store.subscribe(update);
update();