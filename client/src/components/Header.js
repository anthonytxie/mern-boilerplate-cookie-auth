import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <ul>
            <li>
              <a href="/signin">Sign In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        );
      default:
        return [
          <li key="1">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.user ? '/dashboard' : '/'}
            className="left brand-logo"
          >
            Lunar
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth: { user, authError } }) {
  return {
    user,
    authError,
  };
}

export default connect(mapStateToProps)(Header);
