import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import AuthField from './AuthField';
import { connect } from 'react-redux';

const authFields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
    label: 'E-mail',
  },

  {
    name: 'password',
    type: 'password',
    placeholder: '*******',
    label: 'Password',
  },
];

class AuthForm extends Component {
  createLocalUser(values) {
    this.props.onSubmit(values.email, values.password, this.props.history);
  }

  renderAuthError() {
    return <div className="auth-error">{this.props.authError}</div>;
  }
  render() {
    console.log(this.props.authError);
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.createLocalUser.bind(this))}>
          <div />
          {authFields.map(field => {
            return (
              <Field
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                label={field.label}
                component={AuthField}
              />
            );
          })}
          <div>
            <div>{this.renderAuthError()}</div>

            <div className="row auth-row">
              <div className="col s4">
                <button
                  className="btn"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Submit
                </button>
              </div>
              <div className="col s4 ">
                <a
                  className="waves-effect waves-light btn social google"
                  href="api/auth/google"
                >
                  <i className="fa fa-google" />
                  {this.props.auth}
                </a>
              </div>
              <div className="col s4">
                <a
                  className="waves-effect waves-light btn social facebook"
                  href="/api/auth/facebook"
                >
                  <i className="fa fa-facebook" href="/api/auth/facebook" />
                  {this.props.auth}
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'You must insert a value here';
  }
  if (!values.lastName) {
    errors.lastName = 'You must insert a value here';
  }

  if (!values.email) {
    errors.email = 'You must insert a value here';
  }
  return errors;
};

function mapStateToProps({ auth: { user, authError } }) {
  return {
    user,
    authError,
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'signin',
    validate: validate,
  })(withRouter(AuthForm))
);
