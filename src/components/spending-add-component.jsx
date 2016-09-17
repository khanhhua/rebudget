import React from "react";

export default class SpendingAddComponent extends React.Component {
  constructor (props) {
    super();
    this.state = Object.assign({spending:{}}, props);
  }

  onSaveClick () {
    const {onSave} = this.props;
    const {spending} = this.state;

    const ret = onSave(spending);
    console.assert(typeof ret.then === 'function', 'Action should be a promise');

    ret.then(() => {
      this.setState({spending: {}});
    });
  }

  onInputChange (e) {
    const {spending} = this.state;

    const newSpending = Object.assign(spending, {[e.target.name]: e.target.value})
    this.setState({'spending': newSpending});
  }

  componentWillReceiveProps (nextProps) {
    this.setState(nextProps);
  }

  render () {
    const {categories, loggedIn} = this.state;
    const {spending} = this.state;

    return (
      <div className="form">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input onChange={(e)=>this.onInputChange(e)}
                 value={spending.amount || 0}
                 name="amount"
                 type="text" className="form-control"
                 id="amount"/>
        </div>

        <div className="form-group">
          <label htmlFor="category-id" className="control-label">Category</label>
          <select onChange={(e)=>this.onInputChange(e)}
                  name="category_id"
                  id="category-id" className="form-control">
            <option value="">SELECT A CATEGORY</option>
          {categories.map(item =>
            <option key={item.id} value={item.id} selected={item.id===spending.category_id}>{item.label}</option>
          )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Date</label>
          <input onChange={(e)=>this.onInputChange(e)}
                 value={spending.accounted_on || ''}
                 name="accounted_on"
                 type="date" className="form-control"
                 id="acounted-on"/>
        </div>

        <div className="form-group text-center">
        {loggedIn ?
          <button className="btn btn-primary" onClick={() => this.onSaveClick()}>Save</button>
          :
          <button className="btn btn-primary" disabled="disabled">Please login :D</button>
        }
        </div>
      </div>
    );
  }
}