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
import MainLayout from "./pages/Layout/MainLayout";
import { loader as movieLoader } from "./pages/Movie/Movies";
import { loader as mainLoader } from "./pages/Layout/MainLayout";
import { loader as customerLoader } from "./pages/Customers/Customer";
import { loader as orderLoader } from "./pages/Orders/Orders";
import Movies from "./pages/Movie/Movies";
import Layout from "./pages/Layout/Layout";
import LayoutSecondary from "./pages/Layout/LayoutSecondary";
import LoginForm from "./pages/Login/LoginForm";
import Customer from "./pages/Customers/Customer";
import Rentals from "./pages/Rentals/Rentals";
import Register from "./pages/Register/RegisterForm";
import NotFound from "./pages/NotFound/NotFound";
import YourOrders from "./pages/Orders/Orders";
import Home from "./pages/Home/Home";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />} loader={mainLoader}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/" element={<LayoutSecondary />}>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rentals" element={<Rentals />} />

              <Route path="/movies" element={<Movies />} loader={movieLoader} />
              <Route
                path="/customers"
                element={<Customer />}
                loader={customerLoader}
              />
              <Route
                path="/your-orders"
                element={<YourOrders />}
                loader={orderLoader}
              />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
          </Route>
        )
      )}
    />
  </Provider>
);
