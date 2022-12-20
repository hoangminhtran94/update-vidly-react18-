import React, { Component } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <FloatingLabel controlId={name} label={label}>
      <Form.Select
        name={name}
        id={name}
        {...rest}
        aria-label="Floating label select example"
        className="mb-2"
      >
        <option value="">Select a genre</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
      {error && error !== "n/a" && (
        <div className="alert alert-danger mb-0">{error}</div>
      )}
    </FloatingLabel>
  );
};

export default Select;
