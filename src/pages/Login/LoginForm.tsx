import React, { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import Input from "../../components/common/Input/Input";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./../../store/auth";
import classes from "./LoginForm.module.css";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import { toast } from "react-toastify";
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
  }: ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >) => {
    const errorMessage = validateProperty(target);
    setErrors((prev) => (prev = { ...prev, [target.name]: errorMessage }));
    setLoginData((prev) => (prev = { ...prev, [target.name]: target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const { user, token } = await response.json();
        dispatch(authActions.login({ user: user, token: token }));
        localStorage.setItem("token", token);
        navigate("/movies");
      } else {
        const result = await response.json();
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };
  return (
    <div className={`${classes["login-container"]} p-4 rounded`}>
      <h1>Login</h1>
      <form className={classes["login-form"]} onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
