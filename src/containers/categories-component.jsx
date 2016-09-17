import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { addCategory } from '../actions';

const CategoriesComponent = (props) => {
  const {categories} = props;

  return (
    <div className="row">
      <div className="col-xs-12">
        <ul className="list-group">
        {categories.map((item) =>
          <li className="list-group-item" key={item.id}>{item.label}</li>
        )}
        </ul>
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