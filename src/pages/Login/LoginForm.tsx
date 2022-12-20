import React, { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import Input from "../../components/common/input";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./../../store/auth";
const schema: { [key: string]: any } = {
  userName: Joi.string().required().email({ tlds: false }).label("Username"),
  password: Joi.string().required().label("Password"),
};
const LoginForm: React.FC = () => {
  const initialState = { userName: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateProperty = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const { error } = schema[name].validate(value);
    return error ? error.details[0].message : "n/a";
  };

  const onChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const errorMessage = validateProperty(target);
    setErrors((prev) => (prev = { ...prev, [target.name]: errorMessage }));
    setLoginData((prev) => (prev = { ...prev, [target.name]: target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(authActions.login(loginData));
    navigate("/movies");
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button
          className="btn btn-primary"
          disabled={
            _.isEqual(initialState, loginData) ||
            !Object.values(errors).every((item) => item === "n/a")
          }
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
