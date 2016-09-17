import React from 'react';

import { CategoryListComponent, SpendingListComponent } from '../components';
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
        <div className="alert warn">
          <pre>
            <ul>
              <li>type: {networkActivity.type}</li>
              <li>params: {JSON.stringify(networkActivity.params)}</li>
            </ul>
          </pre>
        </div>
        )}
      </div>

      <div className="col-xs-12 col-sm-5">
        <CategoryListComponent {...{categories, addCategory}} onCategoryClick={selectCategory} />
      </div>
      <div className="col-xs-12 col-sm-7">
        <SpendingListComponent {...{spendings: filterSpendingByCategory(spendings, selectedCategoryId), addSpending}} />
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