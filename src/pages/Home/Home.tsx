import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import CartSideBar from "../Rentals/components/CartSideBar/CartSideBar";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store";
import { fetchMovies, fetchGenres } from "../../store/movies";
import { getCart } from "../../store/cart";
import { fetchCustomer } from "../../store/customer";
const Home = () => {
  const user = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const dispatchThunk = useTypedDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatchThunk(fetchGenres());
      await dispatchThunk(fetchMovies());
    };
    fetchData();
  }, [dispatchThunk]);

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
