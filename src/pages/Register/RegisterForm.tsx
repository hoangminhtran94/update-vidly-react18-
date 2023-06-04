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
  const [image, setImage] = useState<{ image: string; file: File | null }>({
    image: "",
    file: null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("image", image.file ?? "");

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
    setImage({ image: image, file: file });
  };
  return (
    <div className={`${classes["regiter-container"]} p-4 rounded`}>
      <h1>Register</h1>
      <form className={classes["regiter-form"]} onSubmit={handleSubmit}>
        <UploadImage image={image.image} getImage={chooseImageHandler} />
        <Input name="userName" label="UserName" type="email" error={""} />
        <Input name="password" label="Password" type="password" error={""} />
        <Input name="name" label="Name" type="text" error={""} />

        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
