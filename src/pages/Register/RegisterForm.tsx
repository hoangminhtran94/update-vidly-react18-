import React, { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import { useDispatch } from "react-redux";
import Input from "../../components/common/input";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
import classes from "./RegisterForm.module.css";
const schema: { [key: string]: any } = {
  userName: Joi.string().email({ tlds: false }).required().label("Username"),
  password: Joi.string().min(5).required().label("Password"),
  name: Joi.string().required().label("Name"),
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    userName: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({
    userName: "",
    password: "",
    name: "",
  });
  const validateProperty = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const { error } = schema[name].validate(value);
    return error ? error.details[0].message : false;
  };
  const onChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const errorMessage = validateProperty(target);
    setErrors((prev) => (prev = { ...prev, [target.name]: errorMessage }));
    setRegisterData(
      (prev) => (prev = { ...prev, [target.name]: target.value })
    );
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.addAUser(registerData));
    navigate("/movies");
  };
  return (
    <div className={`${classes["regiter-container"]} p-4 rounded`}>
      <h1>Register</h1>
      <form className={classes["regiter-form"]} onSubmit={handleSubmit}>
        <Input
          name="userName"
          label="UserName"
          type="email"
          error={errors.userName}
          onChange={onChangeHandler}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          onChange={onChangeHandler}
        />
        <Input
          name="name"
          label="Name"
          type="text"
          error={errors.name}
          onChange={onChangeHandler}
        />

        <button
          className="btn btn-primary"
          disabled={!Object.values(errors).every((item) => item === false)}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
