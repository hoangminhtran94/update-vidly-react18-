import React from "react";
import { FormControlProps } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface InputProps extends FormControlProps {
  name: string;
  label: string;
  error: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  type,
  error,
  ...rest
}) => {
  return (
    <FloatingLabel controlId={name} label={label}>
      <Form.Control
        {...rest}
        as="input"
        type={type}
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
