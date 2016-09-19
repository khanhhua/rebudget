import React from 'react';

import {connect} from 'react-redux';

import {ActivitySummaryComponent} from '../components';
import {SpendingByCategoryComponent} from '../components';

const DashboardComponent = (props) => {
  const {entries: {spendings, incomes}} = props;

  const summary = {
    incomes: incomes.reduce((acc, item) => acc + item.amount, 0),
    spendings: spendings.reduce((acc, item) => acc + item.amount, 0)
  };

  summary.saving = summary.incomes - summary.spendings;

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="block-grid block-grid-upto-3 text-center-sm">
          <div className="block-grid-item">
            <h4>Income</h4>
            <span className="text-lg">{summary.incomes}</span>
          </div>

          <div className="block-grid-item">
            <h4>Spending</h4>
            <span className="text-lg">{summary.spendings}</span>
          </div>

          <div className="block-grid-item">
            <h4>Saving</h4>
            <span className="text-lg">{summary.saving}</span>
          </div>
        </div>
      </div>

      <div className="col-xs-12 col-sm-4">
        <ActivitySummaryComponent {...{entries: incomes.concat(spendings)}} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <SpendingByCategoryComponent {...{spendings}} />
      </div>
    </div>
  );
};

DashboardComponent.componentWillReceiveProps = (nextProps) => {
  debugger;
}

const mapStateToProps = (state) => {
  const {entries} = state;

  return {entries};
};

export default connect(mapStateToProps)(DashboardComponent);