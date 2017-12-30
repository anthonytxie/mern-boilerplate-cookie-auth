import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';

class SignUp extends Component {
  render() {
    return <AuthForm onSubmit={this.props.createUser} />;
  }
}

export default connect(null, actions)(SignUp);
