import React from 'react';

import { PageviewComponent, EntryListComponent, EntryAddComponent } from '../components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const filterSpendingByCategory = (spendings, categoryId) => {
  if (!categoryId) {
    return spendings;
  }

  return spendings.filter(item => item.category === categoryId);
};

const AppComponent = (props) => {
  const {addSpending, addIncome} = props;
  const {currentUser, categories, entries:{spendings, incomes}, networkActivity} = props;

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

      <div className="col-xs-12 col-sm-7">
        <PageviewComponent>
          <EntryAddComponent type="expense"
                             title="Add Expense"
                             {...{categories, onSave: addSpending, loggedIn: !!currentUser.fbId}} />
          <EntryAddComponent type="income"
                             title="Add Income"
                             {...{categories, onSave: addIncome, loggedIn: !!currentUser.fbId}} />
        </PageviewComponent>
      </div>
      <div className="col-xs-12 col-sm-5">
        <EntryListComponent title="Recent activities" {...{entries: spendings.concat(incomes)}}/>
      </div>
    </div>
  );
};

/*---------------------------------------------------------
 / ACTIONS
 /--------------------------------------------------------*/
import { addCategory, addSpending, addIncome, selectCategory, loginFacebook} from '../actions';

const mapStateToProps = (state, ownProps) => {
  const {currentUser, categories, entries, networkActivity, ui} = state;

  return {currentUser, categories, entries, networkActivity, selectedCategoryId: ui.selectedCategoryId};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addCategory, addSpending, addIncome, selectCategory, loginFacebook}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);