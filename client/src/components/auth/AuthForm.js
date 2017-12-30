import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import AuthField from './AuthField';

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
    label: 'password',
  },
];

class AuthForm extends Component {
  createLocalUser(values) {
    this.props.onSubmit(values.email, values.password, this.props.history);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.createLocalUser.bind(this))}>
          <div />
          {authFields.map(field => {
            return (
              <Field
                type={field.text}
                name={field.name}
                placeholder={field.placeholder}
                label={field.label}
                component={AuthField}
              />
            );
          })}
          <div>
            <button
              className="btn"
              type="submit"
              disabled={pristine || submitting}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col s4 offset-s4">
            <a class="waves-effect waves-light btn social google">
              <i class="fa fa-google" />
              {this.props.auth ? 'Sign In' : 'Sign Up'}
            </a>
          </div>
          <div className="col s4">
            <a className="waves-effect waves-light btn social facebook">
              <i className="fa fa-facebook" />
              {this.props.auth ? 'Sign In' : 'Sign Up'}
            </a>
          </div>
        </div>
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
export default reduxForm({
  form: 'signin',
  validate: validate,
})(withRouter(AuthForm));
