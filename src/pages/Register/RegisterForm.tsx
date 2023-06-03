import React, { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import { useDispatch } from "react-redux";
import Input from "../../components/common/Input/Input";
import { useNavigate } from "react-router-dom";
import { customerActions } from "../../store/customer";
import classes from "./RegisterForm.module.css";
import UploadImage from "../../components/common/UploadImage/UploadImage";
import { User } from "../../store/models/User.models";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../store/authApi";
const schema: { [key: string]: any } = {
  userName: Joi.string().email({ tlds: false }).required().label("Username"),
  password: Joi.string().min(5).required().label("Password"),
  name: Joi.string().required().label("Name"),
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isSuccess, isLoading }] = useRegisterMutation();
  const [registerData, setRegisterData] = useState<
    User & { file: File | null }
  >({
    id: "",
    username: "",
    password: "",
    name: "",
    image: "",
    file: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
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
    return error ? error.details[0].message : "n/a";
  };
  const onChangeHandler = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    const errorMessage = validateProperty(target);
    setErrors((prev) => (prev = { ...prev, [target.name]: errorMessage }));
    setRegisterData(
      (prev) => (prev = { ...prev, [target.name]: target.value })
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", registerData.name);
    formData.append("userName", registerData.username);
    formData.append("password", registerData.password!);
    formData.append("image", registerData.file!);

    try {
      const { user, token } = await register(formData).unwrap();
      dispatch(authActions.login({ user: user, token: token }));
      localStorage.setItem("token", token);
      if (!isLoading) {
        navigate("/movies");
      }
    } catch (error: any) {
      return toast(error.data.message, { type: "error" });
    }
  };
  const chooseImageHandler = (image: string, file: File | null) => {
    setRegisterData((prev) => (prev = { ...prev, image: image, file: file }));
  };
  return (
    <div className={`${classes["regiter-container"]} p-4 rounded`}>
      <h1>Register</h1>
      <form className={classes["regiter-form"]} onSubmit={handleSubmit}>
        <UploadImage image={registerData.image} getImage={chooseImageHandler} />
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
          disabled={!Object.values(errors).every((item) => item === "n/a")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
