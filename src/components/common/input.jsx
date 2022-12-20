import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label} </label>
      <input
        {...rest}
        id={name}
        name={name}
        className="form-control"
        autoFocus
      />
      {error && error !== "n/a" && (
        <div className="alert alert-danger">{error}</div>
      )}
    </div>
  );
};

export default Input;
