import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { loader as homeLoader } from "./pages/Home/Home";
import { loader as movieLoader } from "./pages/Movie/Movies";

import Movies from "./pages/Movie/Movies";
import Home from "./pages/Home/Home";
import LoginForm from "./pages/Login/LoginForm";
import Customer from "./pages/Customers/Customer";
import MovieForm from "./pages/Movie/components/MovieForm/MovieForm";
import Rentals from "./pages/Rentals/Rentals";
import Register from "./pages/Register/RegisterForm";
import NotFound from "./pages/NotFound/NotFound";
import YourOrders from "./pages/Orders/Orders";
const container = document.getElementById("root");
const root = createRoot(container!);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} loader={homeLoader}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/movies" element={<Movies />} loader={movieLoader} />
        <Route path="/movies/:id" element={<MovieForm />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/register" element={<Register />} />
        <Route path="/your-orders" element={<YourOrders />} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
    </>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
