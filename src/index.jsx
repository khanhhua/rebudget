import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';


/*---------------------------------------------------------
/ ACTIONS
/--------------------------------------------------------*/
import {showCategoryModal, closeModal, addCategory, addSpending, selectCategory} from './actions';

/*---------------------------------------------------------
/ UI
/--------------------------------------------------------*/
import {AppComponent} from './containers';
import {CategoryEditModal} from './components';

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
  return bindActionCreators({showCategoryModal, addCategory, addSpending, selectCategory}, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
const ConnectedModal = connect((state) => {
  const modalModule = (state.ui && state.ui.modal && state.ui.modal.modalModule)?state.ui.modal.modalModule:null;

  if (!modalModule) {
    return {isOpen: false};
  }

  // TODO modalModule should be current working dir agnostic.
  const modelType = require(modalModule).default;
  const connectedModalType = connect((state) => ({}), mapDispatchToProps)(modelType);
  const children = React.createElement(connectedModalType);
  const isOpen = state.ui && !!state.ui.modal;

  return {
    isOpen,
    children
  };
}, (dispatch) => {
  return bindActionCreators({onRequestClose: () => ({ type: 'core/CLOSE_MODAL' })}, dispatch);
})(Modal);

const render = (store) => () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <App />
        <ConnectedModal />
      </div>
    </Provider>,
    document.getElementById('root')
  );
}

const update = render(store);
store.subscribe(update);
update();
