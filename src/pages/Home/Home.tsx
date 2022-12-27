import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import CartSideBar from "../Rentals/components/CartSideBar/CartSideBar";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store";
import { getCart } from "../../store/cart";
import { fetchCustomer } from "../../store/customer";
import ChatBox from "./../../components/ChatBox/ChatBox";
import ChatBoxIcon from "../../components/ChatBoxIcon/ChatBoxIcon";
import { useGetGenresQuery, useGetMoviesQuery } from "../../store/movieApi";
const Home = () => {
  const user = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );
  const dispatchThunk = useTypedDispatch();
  useEffect(() => {
    const fetchWhenLogin = async () => {
      await dispatchThunk(getCart());
      await dispatchThunk(fetchCustomer());
    };
    if (user) {
      fetchWhenLogin();
    }
  }, [dispatchThunk, user]);

  return (
    <>
      <ToastContainer autoClose={1000} theme="colored" />
      {!toggle && user && <ChatBoxIcon />}
      <ChatBox />
      <CartSideBar />
      <h3>
        <NavBar user={user} />
      </h3>
      <main className="container-fluid mb-5">
        <Outlet />
      </main>
    </>
  );
};
export default Home;
