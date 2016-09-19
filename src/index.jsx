import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, bindActionCreators } from 'redux';

import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

/*---------------------------------------------------------
 / ACTIONS
 /--------------------------------------------------------*/
import {loginFacebook} from './actions';

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/ 
import {AppComponent, CategoriesComponent, SettingsComponent, DashboardComponent} from './containers';
import {AppHeaderComponent} from './components';

/*---------------------------------------------------------
/ MIDDLEWARES
/--------------------------------------------------------*/ 
import {actionLogger} from './middlewares';
import {default as promiseResolver} from 'redux-promise';

/*---------------------------------------------------------
/ REDUCERS and STORE
/--------------------------------------------------------*/
import {default as rootReducer} from './reducers';

/*---------------------------------------------------------
/ STORE
/--------------------------------------------------------*/ 
const store = createStore(rootReducer, { categories:[{ id:'cat00', label: 'Default' }] }, applyMiddleware(actionLogger, promiseResolver, thunk));

const Layout = (store) => (props) => {
  const {currentUser} = store.getState();
  const actions = bindActionCreators({loginFacebook}, store.dispatch);

  return (
    <div className="app">
      <AppHeaderComponent {...{currentUser}} {...actions} />
      <div className="container">
      {props.children}
      </div>
    </div>
  );
};

const Routable = (store) => {
  const authencatedOnly = (nextState, replace, cb) => {
    const currentUser =  store.getState().currentUser;
    if (currentUser.fbId) {
      return cb();
    }

    replace('/');
    cb();
  };

  return (
    <Router history={hashHistory}>
      <Route path='/' component={Layout(store)}>
        <IndexRoute component={AppComponent} />
        <Route path='categories' component={CategoriesComponent} onEnter={authencatedOnly} />
        <Route path='settings' component={SettingsComponent} onEnter={authencatedOnly} />
        <Route path='dashboard' component={DashboardComponent} onEnter={authencatedOnly} />
      </Route>
    </Router>
  );
};

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
