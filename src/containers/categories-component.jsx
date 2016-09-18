import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { addCategory } from '../actions';

class AddItemControl extends React.Component {
  constructor (props) {
    super();
    this.state = { value: '' || props.value };
  }

  onAddClick () {
    const {onAdd} = this.props;
    if (typeof onAdd !== 'function') {
      return;
    }

    const {value} = this.state;
    const ret = onAdd.call(undefined, value);

    console.assert(typeof ret.then === 'function', 'onAdd must be a promise');
    ret.then(() => {
      this.setState({value: ''});
    })
  }

  onInputChange (e) {
    this.setState({value: e.target.value});
  }

  render () {
    const state = this.state;

    return (
      <div className="input-group">
        <input className="form-control" value={state.value || ''} onChange={(e) => this.onInputChange(e)} />
        <span className="input-group-btn">
          <button className="btn btn-default" onClick={(e)=>this.onAddClick(e)}>
            <i className="fa fa-plus"></i>
          </button>
        </span>
      </div>
    )
  }
}

const CategoriesComponent = (props) => {
  const {categories} = props;
  const {addCategory} = props;

  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-sm-push-3">
          <div className="form-group">
            <label>New Category</label>
            <AddItemControl onAdd={addCategory} className="form-control" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-sm-push-2">
          <ul className="list-group">
          {categories.map((item) =>
            <li className="list-group-item" key={item.id}>{item.label}</li>
          )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {categories} = state;

  return {categories};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addCategory}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesComponent);