import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateSettings} from '../actions';

class SettingsComponent extends React.Component {
  constructor (props) {
    super();
    const settings = Object.assign({currency: ''}, props.settings);
    this.state = Object.assign({}, {settings});
  }

  componentWillReceiveProps (nextProps) {
    const {settings} = nextProps;
    this.setState({ settings });
  }

  onInputChange (e) {
    const {settings} = this.state;
    const {name, value} = e.target;

    const newSettings = Object.assign(settings, {[name]: value});

    this.setState({settings: newSettings});
  }

  onSaveClick () {
    const {updateSettings} = this.props;
    const {settings} = this.state;
    const ret = updateSettings(settings);

    console.assert(typeof ret.then === 'function', 'Action updateSettings should return a promise');
  }

  render () {
    // actions
    const {settings} = this.state;

    return (
      <div className="container">
        <div className="col-xs-12">
          <div className="form">
            <div className="form-group">
              <label htmlFor="input-currency" className="control-label">Currency</label>
              <input className="form-control"
                     name="currency" id="input-currency" maxLength="3" placeholder="USD"
                     onChange={this.onInputChange.bind(this)}
                     value={settings.currency} />
            </div>

            <div className="form-group tex-center">
              <button className="btn btn-success" onClick={this.onSaveClick.bind(this)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const {settings} = state;

    return {settings};
  },
  (dispatch) => {
    return bindActionCreators({updateSettings}, dispatch);
  }
)(SettingsComponent);
