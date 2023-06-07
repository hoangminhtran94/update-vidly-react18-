import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { Outlet, useMatches } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import CartSideBar from "../Rentals/components/CartSideBar/CartSideBar";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatBoxIcon from "../../components/ChatBoxIcon/ChatBoxIcon";

import "../../App.css";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
  const matches = useMatches();
  console.log(matches);

  const user = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );

  return (
    <>
      <ToastContainer autoClose={1000} theme="colored" />
      <NavBar user={user} />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
