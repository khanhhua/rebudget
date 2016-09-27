import React from 'react';
import {default as _} from 'lodash'

export default class SpendingByCategoryComponent extends React.Component {
  constructor (props) {
    super();
    const {spendings} = props;

    this.state = Object.assign({}, {spendings});
  }

  render () {
    const {settings} = this.props;
    let {spendings} = this.state;

    const groups = spendings.reduce((acc, item) => {
      let items;
      if (item.category_id in acc) {
        items = acc[item.category_id].items;
      }
      else {
        items = [];

        acc[item.category_id] = {
          id: item.category_id,
          label: item.category_label,
          amount: 0,
          items
        };
      }
      items.push(item);
      acc[item.category_id].amount += item.amount;

      return acc;
    }, {});

    const categories = Object.keys(groups)
      .map(key => (
      {
        id: groups[key].id,
        label: groups[key].label,
        amount: groups[key].amount
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Spending by Categories
        </div>
        <ul className="list-group">
          {categories.map(item => (
            <li key={item.id} className="list-group-item">
              {item.label}
              <span className="pull-right">
                {settings.currency}&nbsp;{item.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}