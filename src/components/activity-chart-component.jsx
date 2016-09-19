import React from 'react';

export default class ActivityChartComponent extends React.Component {
  render () {
    const {entries} = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Activity Summary
        </div>
        <ul className="list-group">
        {entries.map(item => (
          <li key={item.id} className="list-group-item">
            {item.category_label}
            <span className="pull-right">
              {item.amount}
              &nbsp;
              {item.type==='expense'?
                <i className="fa fa-arrow-down text-danger"></i>
                :
                <i className="fa fa-arrow-up text-success"></i>
              }
            </span>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}