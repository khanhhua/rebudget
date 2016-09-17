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
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">Home Budget</div>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {currentUser.fbId &&
            <li>
              <a href="#">{currentUser.fbId}</a>
            </li>
            }
          </ul>
          {!currentUser.fbId &&
          <button className="btn navbar-btn btn-primary pull-right" onClick={loginFacebook.bind(undefined)}>
            <i className="fa fa-facebook-official" /> Login
          </button>
          }
        </div>
      </nav>

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