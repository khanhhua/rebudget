import React from 'react';

const SpendingListComponent = (props) => {

  const { spendings, addSpending } = props;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button className="pull-right" onClick={()=>addSpending({ category: 'cat00', amount: 300 })}>Add spending</button>
        Spendings
      </div>
      <div className="panel-body">
        <ol>
        {spendings.map((item) => (<li key={item.id}>{item.amount}</li>))}
        </ol>
      </div>
    </div>
  );
};

export default SpendingListComponent;