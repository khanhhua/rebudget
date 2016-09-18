import React from 'react';

const EntryListComponent = (props) => {

  const { title, entries } = props;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {title || 'Entries'}
      </div>
      <ul className="list-group">
      {entries.map((item) =>
        <li key={item.id} className="list-group-item">
          {item.category_label}
          <span className="pull-right">{item.amount}</span>
        </li>
      )}
      </ul>
    </div>
  );
};

export default EntryListComponent;