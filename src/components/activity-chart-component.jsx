import React from 'react';
import {Chart} from 'react-google-charts'

import {default as _} from 'lodash';
import moment from 'moment';

export default class ActivityChartComponent extends React.Component {
  render () {
    const {settings, entries} = this.props;
    const {currency} = settings;

    entries.sort((a, b) => a.accounted_on.localeCompare(b.accounted_on));

    const categories = entries.reduce((acc, item) => {
      if (item.category_id in acc) {
        return acc;
      }
      else {
        acc[item.category_id] = item.category_label;
        return acc;
      }
    }, {});
    const groupByDates = entries
      .reduce((acc, entry) => { // group by date {dateX: [entryA, entryB, entryC], ...}
        if (entry.accounted_on in acc) {
          acc[entry.accounted_on].push(entry);
          return acc;
        }
        else {
          acc[entry.accounted_on] = [entry];
        }

        return acc;
      }, {});

    const categoryKeys = Object.keys(categories).sort((a, b) => {
      return categories[a].localeCompare(categories[b]);
    });
    const chartData = _.reduce(groupByDates, (acc, entries, date) => {
      const formattedDate = moment(date).format('DD/MM');

      const row = [formattedDate, ...categoryKeys.map(categoryKey => {
        let entriesByCategory = entries.filter(item => item.category_id === categoryKey);

        if (entriesByCategory.length) {
          return entriesByCategory.reduce((acc, item) => acc + item.amount, 0);
        }
        else {
          return 0;
        }
      })];

      acc.push(row);
      return acc;
    }, [['Amount', ...categoryKeys.map(key => categories[key])]]);

    const options = {
      hAxis: { title:'Date' },
      vAxis: { title:`Amount (${currency})` },
      legend: 'right'
    };

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Activity Summary
        </div>
        <div className="panel-body">
          <Chart chartType="ColumnChart" data={chartData} options={options} width={"100%"} height={"250px"} />
        </div>
        <h5 className="panel-heading">Details</h5>
        <ul className="list-group list-group-entries">
        {entries.map(item => (
          <li key={item.id} className="list-group-item">
            <span className="date">{moment(item.accounted_on).format('DD/MM')}</span>
            <span>{item.category_label}</span>
            <span className="pull-right">
              {currency} {item.amount}
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