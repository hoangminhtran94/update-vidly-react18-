import React, { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import { useDispatch } from "react-redux";
import Input from "../../components/common/input";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
import _ from "lodash";
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
  // doSubmit = async () => {
  //   try {
  //     const data = await userService.register(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4o04Aw3jc1I0w0_iwu4wYOqdMMiSKBbI",
  //       {
  //         email: state.data.username,
  //         password: state.data.password,
  //         returnSecureToken: true,
  //       }
  //     );

  //     data.json().then((res) => {
  //       console.log(res);
  //       console.log(res.headers);
  //       auth.loginWithJwt(res.idToken);
  //       console.log(auth.getCurrentUser());
  //     });

  //     // window.location = "/";
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       console.log(ex);
  //       const errors = { ...state.errors };
  //       errors.username = ex.response.data;
  //     }
  //   }
  // };

  return (
    <div>
      <h1>Register</h1>
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
