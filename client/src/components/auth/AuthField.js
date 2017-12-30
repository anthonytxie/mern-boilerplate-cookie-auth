import React from 'react';

const AuthField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <div>
      <label> {label}</label>
      <input {...input} type={type} placeholder={placeholder} />
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

// if touched shows error

export default AuthField;
