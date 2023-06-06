import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { Outlet, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import CartSideBar from "../Rentals/components/CartSideBar/CartSideBar";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store";
import { getCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatBoxIcon from "../../components/ChatBoxIcon/ChatBoxIcon";
import { authActions } from "../../store/auth";
import "../../App.css";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const user = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );
  const dispatchThunk = useTypedDispatch();

  useEffect(() => {
    if (loaderData) {
      dispatch(authActions.login(loaderData));
    }
  }, []);

  return (
    <>
      <ToastContainer autoClose={1000} theme="colored" />
      {!toggle && user && <ChatBoxIcon />}
      {user && <ChatBox />}
      <CartSideBar />

      <NavBar user={user} />

      <main className="">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;

export const loader = async () => {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    const data = await fetch("http://localhost:5000/api/user/validate-token", {
      headers: { Authorization: `Bearer ${token}` },
    });
    user = await data.json();
  } catch (e) {
    console.log(e);
  }

  if (user && token) {
    return { user: user, token: token };
  }
  return null;
};
