import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import "../../App.css";
import "react-toastify/dist/ReactToastify.css";
import { useGetAuthQuery } from "../../store/authApi";
const MainLayout = () => {
  //   const loaderData = useLoaderData();
  const { data } = useGetAuthQuery();
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    if (data) {
      dispatch(
        authActions.login({ user: data, token: localStorage.getItem("token") })
      );
    }
  }, [data]);

  return <Outlet />;
};
export default MainLayout;

export const loader = async () => {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER_API + "user/validate-token",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    user = await data.json();
  } catch (e) {
    console.log(e);
  }

  if (user && token) {
    return { user: user, token: token };
  }
  return null;
};
