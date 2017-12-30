import React from 'react';

const AuthField = ({
  type,
  placeholder,
  label,
  input,
  meta: { touched, error },
}) => {
  return (
    <div>
      <label> {label}</label>
      <input {...input} />
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

// if touched shows error

export default AuthField;
