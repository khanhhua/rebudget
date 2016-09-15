import FakeXMLHttpRequest from 'fake-xml-http-request';
import RouteRecognizer from 'route-recognizer';
window.FakeXMLHttpRequest = FakeXMLHttpRequest;
window.RouteRecognizer = RouteRecognizer;

import {combineReducers} from 'redux';

import {default as currentUserReducer} from './current-user-reducer';
import {default as categoriesReducer} from './categories-reducer';
import {default as spendingsReducer} from './spendings-reducer';
import {default as networkActivityReducer} from './network-activity-reducer';
import {default as uiReducer} from './ui-reducer';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  categories: categoriesReducer,
  spendings: spendingsReducer,
  networkActivity: networkActivityReducer,
  ui: uiReducer
});

export default rootReducer;