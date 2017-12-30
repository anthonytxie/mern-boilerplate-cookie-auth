import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';

class SignUp extends Component {
  render() {
    return (
      <div>
        <AuthForm onSubmit={this.props.userLogin} auth={this.props.auth} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(SignUp);
