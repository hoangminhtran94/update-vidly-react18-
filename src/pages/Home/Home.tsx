import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
const Home = () => {
  const user = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  return (
    <>
      <ToastContainer />
      <h3>
        <NavBar user={user} />
      </h3>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
export default Home;
