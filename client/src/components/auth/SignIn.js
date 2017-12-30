import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';

class SignIn extends Component {
  render() {
    return (
      <div>
        <AuthForm onSubmit={this.props.signInUser} auth="Sign In" />
      </div>
    );
  }
}

export default connect(null, actions)(SignIn);
