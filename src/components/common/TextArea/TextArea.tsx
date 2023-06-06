import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface TextAreaProps {
  error?: string;
  id?: string;
  name?: string;
  label: string;
  onClick?: React.MouseEventHandler;
  onChange?: React.ChangeEventHandler;
  value?: string;
  defaultValue?: string;
}
const TextArea: React.FC<TextAreaProps> = ({
  error,
  id,
  name,
  label,
  value,
  onClick,
  onChange,
  defaultValue,
}) => {
  return (
    <FloatingLabel controlId="floatingTextarea2" label={label}>
      <Form.Control
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        as="textarea"
        placeholder="Leave a comment here"
        style={{ minHeight: "100px" }}
        onClick={onClick}
        onChange={onChange}
      />
      {error && error !== "n/a" && (
        <div className="alert alert-danger">{error}</div>
      )}
    </FloatingLabel>
  );
};

export default TextArea;
