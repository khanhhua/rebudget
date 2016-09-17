import React from 'react';

import { CategoryListComponent, SpendingListComponent, SpendingAddComponent } from '../components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const filterSpendingByCategory = (spendings, categoryId) => {
  if (!categoryId) {
    return spendings;
  }

  return spendings.filter(item => item.category === categoryId);
};

const AppComponent = (props) => {
  const {addCategory, addSpending, selectCategory, loginFacebook} = props;
  const {currentUser, categories, spendings, selectedCategoryId, networkActivity} = props;

  return (
    <div className="row">
      <div className="col-xs-12">
        {networkActivity && (
        <div className="alert warning">
          <pre>
            <ul>
              <li>type: {networkActivity.type}</li>
              <li>params: {JSON.stringify(networkActivity.params)}</li>
            </ul>
          </pre>
        </div>
        )}
      </div>

      <div className="col-xs-12 col-sm-8 col-sm-push-2">
        <h2>Record your spending</h2>
        <SpendingAddComponent {...{categories, onSave: addSpending, loggedIn: !!currentUser.fbId}} />
      </div>
    </div>
  );
};

/*---------------------------------------------------------
 / ACTIONS
 /--------------------------------------------------------*/
import { addCategory, addSpending, selectCategory, loginFacebook} from '../actions';

const mapStateToProps = (state, ownProps) => {
  const {currentUser, categories, spendings, networkActivity, ui} = state;

  return {currentUser, categories, spendings, networkActivity, selectedCategoryId: ui.selectedCategoryId};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addCategory, addSpending, selectCategory, loginFacebook}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);