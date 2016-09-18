import React from "react";

export default class SpendingAddComponent extends React.Component {
  constructor (props) {
    super();
    this.state = Object.assign({spending:{}, errors: {}}, props);
  }

  validate (spending) {
    const errors = {};

    if (!spending.amount || spending.amount <= 0) {
      errors.amount = 'Amount should be positive';
    }

    if (!spending.category_id) {
      errors.category_id = 'Category should be specified';
    }

    if (!spending.accounted_on) {
      errors.accounted_on = 'Date should be specified';
    }

    return errors;
  }

  onSaveClick () {
    const {onSave} = this.props;
    const {spending} = this.state;

    const errors = this.validate(spending);
    if (Object.keys(errors).length) {
      this.setState({errors});
      return;
    }
    else {
      this.setState({errors:{}});
    }

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
    const {errors} = this.state;

    return (
      <div className="form">
        <div className={errors.amount?'form-group has-error':'form-group'}>
          <label htmlFor="amount">Amount</label>
          <input onChange={(e)=>this.onInputChange(e)}
                 value={spending.amount || 0}
                 name="amount"
                 type="text" className="form-control"
                 id="amount"/>
          {errors.amount &&
          <small className="help-block">
            {errors.amount}
          </small>
          }
        </div>

        <div className={errors.category_id?'form-group has-error':'form-group'}>
          <label htmlFor="category-id" className="control-label">Category</label>
          <select onChange={(e)=>this.onInputChange(e)}
                  value={spending.category_id}
                  name="category_id"
                  id="category-id" className="form-control">
            <option value="">SELECT A CATEGORY</option>
            {categories.map(item =>
            <option key={item.id} value={item.id}>{item.label}</option>
            )}
          </select>
          {errors.category_id &&
          <small className="help-block">
            {errors.category_id}
          </small>
          }
        </div>

        <div className={errors.accounted_on?'form-group has-error':'form-group'}>
          <label htmlFor="amount">Date</label>
          <input onChange={(e)=>this.onInputChange(e)}
                 value={spending.accounted_on || ''}
                 name="accounted_on"
                 type="date" className="form-control"
                 id="acounted-on"/>
          {errors.accounted_on &&
          <small className="help-block">
            {errors.accounted_on}
          </small>
          }
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