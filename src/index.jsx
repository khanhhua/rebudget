import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import { createStore, applyMiddleware, bindActionCreators } from 'redux';

import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/ 
import { addCategory, addSpending, selectCategory, loginFacebook} from './actions';

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/ 
import {AppComponent, SettingsComponent} from './containers';
import {AppHeaderComponent} from './components';

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
const store = createStore(rootReducer, { categories:[{ id:'cat00', label: 'Default' }] }, applyMiddleware(thunk));

const mapStateToProps = (state, ownProps) => {
  const {currentUser, categories, spendings, networkActivity, ui} = state;

  return {currentUser, categories, spendings, networkActivity, selectedCategoryId: ui.selectedCategoryId};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addCategory, addSpending, selectCategory, loginFacebook}, dispatch);
};

const Layout = (props) => {
  const {currentUser} = store.getState();
  const actions = bindActionCreators({loginFacebook}, store.dispatch);

  return (
    <div className="app">
      <AppHeaderComponent {...{currentUser}} {...actions} />
      {props.children}
    </div>
  );
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
const Routable = (store) => (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={ConnectedApp} />
      <Route path='settings' component={SettingsComponent} onEnter={(nextState, replace, cb) => {
        const currentUser =  store.getState().currentUser;
        if (currentUser.fbId) {
          return cb();
        }

        replace('/');
        cb();
      }} />
    </Route>
  </Router>
);

const render = (store, routes) => () => {
  ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('root')
  );
};

const update = render(store, Routable(store));
store.subscribe(update);
update();
