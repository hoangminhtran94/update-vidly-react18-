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
import { useLoginMutation } from "../../store/authApi";
import { useTypedDispatch } from "../../store";
import { loginWithCache } from "./../../store/auth";
const schema: { [key: string]: any } = {
  userName: Joi.string().required().email({ tlds: false }).label("Username"),
  password: Joi.string().required().label("Password"),
};
const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const initialState = { userName: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typedDispatch = useTypedDispatch();

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
      const { user, token } = await login(loginData).unwrap();
      await typedDispatch(loginWithCache({ user, token }));
      navigate("/movies");
    } catch (error: any) {
      toast(error.data.message, { type: "error" });
    }
  };
  return (
    <div
      className={`${classes["login-container"]} bg-deep-blue w-1/2 mx-auto my-10 p-4 rounded`}
    >
      <h1 className=" text-white">Login</h1>
      <form className={classes["login-form"]} onSubmit={handleSubmit}>
        <Input
          name="userName"
          label="Username/Email"
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
          className="btn btn-success"
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
