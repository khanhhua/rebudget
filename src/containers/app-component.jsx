import React from 'react';

import { CategoryListComponent, SpendingListComponent } from '../components';

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
    <div className="container">
      <div className="page-header">
        <h1>The React Fucking Redux works!</h1>

        {!currentUser.fbId &&
        <button className="btn btn-primary" onClick={loginFacebook.bind(undefined)}>
          <i className="fa fa-facebook-official" /> Login
        </button>}
      </div>

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
          <div>

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-5">
          <CategoryListComponent {...{categories, addCategory}} onCategoryClick={selectCategory} />
        </div>
        <div className="col-xs-12 col-sm-7">
          <SpendingListComponent {...{spendings: filterSpendingByCategory(spendings, selectedCategoryId), addSpending}} />
        </div>
      </div>
    </div>
  );
};

export default AppComponent;