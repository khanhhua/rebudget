import React from 'react';
import {Link} from 'react-router';

export default class AppHeader extends React.Component {

  constructor (props) {
    super();

    this.state = Object.assign({menuOpen:false}, props);
  }

  onNavbarToggle (e) {
    const {menuOpen} = this.state;

    this.setState(Object.assign({}, this.state, {menuOpen:!menuOpen}));
  }

  render () {
    const {loginFacebook} = this.props;
    const {currentUser} = this.props;

    const {menuOpen} = this.state;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {!currentUser.fbId &&
          <button className="btn navbar-btn btn-primary pull-right" onClick={loginFacebook.bind(undefined)}>
            <i className="fa fa-facebook-official" /> Login
          </button>
          }
          <div className="navbar-header">
            <div className="navbar-brand">
              <Link to="/">Home Budget</Link>
            </div>
            <button type="button" className="navbar-toggle collapsed"
                    onClick={() => this.onNavbarToggle()}
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {currentUser.fbId &&
            <p className="nav navbar-text visible-xs" href="#">
              <i className="fa fa-user"></i> {currentUser.name}
            </p>
            }
          </div>
          {currentUser.fbId &&
          <div className="navbar-collapse collapse" style={menuOpen?{}:{'display':'block'}}>
            <ul className="nav navbar-nav">
              <li>
                <Link to={`/dashboard`} activeClassName="active">
                  <i className="fa fa-bar-chart"></i> Dasboard
                </Link>
              </li>
              <li>
                <Link to={`/categories`} activeClassName="active">
                  <i className="fa fa-gift"></i> Categories
                </Link>
              </li>
              <li>
                <Link to={`/settings`} activeClassName="active">
                  <i className="fa fa-cogs"></i> Settings
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right hidden-xs">
              <li>
                <a href="#"><i className="fa fa-user"></i> {currentUser.name}</a>
              </li>
            </ul>
          </div>
          }
        </div>
      </nav>
    );
  }
};
