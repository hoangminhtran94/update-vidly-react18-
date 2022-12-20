import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <FloatingLabel controlId={name} label={label}>
      <Form.Control
        type={rest.type}
        {...rest}
        id={name}
        name={name}
        className="mb-2"
        placeholder={label}
      />
      {error && error !== "n/a" && (
        <div className="alert alert-danger mb-0">{error}</div>
      )}
    </FloatingLabel>
  );
};

export default Input;
