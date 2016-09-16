import FakeXMLHttpRequest from 'fake-xml-http-request';
import RouteRecognizer from 'route-recognizer';
window.FakeXMLHttpRequest = FakeXMLHttpRequest;
window.RouteRecognizer = RouteRecognizer;

import {combineReducers} from 'redux';

import categoriesReducer from './categories-reducer';
import spendingsReducer from './spendings-reducer';
import networkActivityReducer from './network-activity-reducer';
import uiReducer from './ui-reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  spendings: spendingsReducer,
  networkActivity: networkActivityReducer,
  ui: uiReducer
});

export default rootReducer;
