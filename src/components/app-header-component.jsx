import React from 'react';
import {Link} from 'react-router';

const AppHeader = (props) => {
  const {loginFacebook} = props;
  const {currentUser} = props;

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand">
            <Link to="/">Home Budget</Link>
          </div>
        </div>
        {currentUser.fbId &&
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#">{currentUser.fbId}</a>
          </li>
          <li>
            <Link to={`/categories`}>
              <i className="fa fa-gift"></i> Categories
            </Link>
          </li>
          <li>
            <Link to={`/settings`}>
              <i className="fa fa-cogs"></i> Settings
            </Link>
          </li>
        </ul>
        }
        {!currentUser.fbId &&
        <button className="btn navbar-btn btn-primary pull-right" onClick={loginFacebook.bind(undefined)}>
          <i className="fa fa-facebook-official" /> Login
        </button>
        }
      </div>
    </nav>
  );
};

export default AppHeader;