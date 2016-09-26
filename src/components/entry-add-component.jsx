import React from "react";

export default class EntryAddComponent extends React.Component {
  constructor (props) {
    super();
    this.state = Object.assign({entry:{}, errors: {}}, props);
  }

  validate (entry) {
    const {type} = this.props;
    const errors = {};

    if (!entry.amount || entry.amount.length === 0  || entry.amount <= 0) {
      errors.amount = 'Amount should be positive';
    }

    if (type === 'expense') {
      if (!entry.category_id) {
        errors.category_id = 'Category should be specified';
      }
    }

    if (!entry.accounted_on) {
      errors.accounted_on = 'Date should be specified';
    }

    return errors;
  }

  onSaveClick () {
    const {onSave} = this.props;
    const {type} = this.props;
    const {entry} = this.state;

    const errors = this.validate(entry);
    if (Object.keys(errors).length) {
      this.setState({errors});
      return;
    }
    else {
      this.setState({errors:{}});
    }

    const ret = onSave(entry);
    console.assert(typeof ret.then === 'function', 'Action should be a promise');

    ret.then(() => {
      this.setState({entry: {}});
    });
  }

  onInputChange (e) {
    const {entry} = this.state;

    const newEntry = Object.assign(entry, {[e.target.name]: e.target.value})
    this.setState({'entry': newEntry});
  }

  componentWillReceiveProps (nextProps) {
    this.setState(nextProps);
  }

  render () {
    const {title, type} = this.props;
    const {categories, loggedIn} = this.state;
    const {entry} = this.state;
    const {errors} = this.state;

    return (
      <div className="form">
        <h3>{title}</h3>
        <div className={errors.amount?'form-group has-error':'form-group'}>
          <label htmlFor="amount">Amount</label>
          <input onChange={(e)=>this.onInputChange(e)}
                 value={entry.amount}
                 name="amount"
                 type="text" className="form-control"
                 id="amount"/>
          {errors.amount &&
          <small className="help-block">
            {errors.amount}
          </small>
          }
        </div>

        {type==='expense' &&
        <div className={errors.category_id?'form-group has-error':'form-group'}>
          <label htmlFor="category-id" className="control-label">Category</label>
          <select onChange={(e)=>this.onInputChange(e)}
                  value={entry.category_id}
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
        }
        <div className={errors.accounted_on?'form-group has-error':'form-group'}>
          <label htmlFor="amount">Date</label>
          <input onChange={(e)=>this.onInputChange(e)}
                 value={entry.accounted_on || ''}
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

EntryAddComponent.propTypes = {
  type: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.any.isRequired
};
