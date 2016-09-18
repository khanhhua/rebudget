import React from 'react';

const SpendingListComponent = (props) => {

  const { title, spendings } = props;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {title || 'Spendings'}
      </div>
      <ul className="list-group">
      {spendings.map((item) =>
        <li key={item.id} className="list-group-item">
          {item.category_label}
          <span className="pull-right">{item.amount}</span>
        </li>
      )}
      </ul>
    </div>
  );
};

export default SpendingListComponent;