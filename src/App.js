import "./App.css";
import NavBar from "./pages/Home/components/NavBar";
import Movie from "./pages/Movie/Movies.tsx";
import React, { Component, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import Customers from "./pages/Customers/Customer";
import Rentals from "./pages/Rentals/Rentals";
import NotFound from "./components/common/notFound";
import MovieForm from "./pages/Movie/components/MovieForm/MovieForm";
import LoginForm from "./pages/Login/LoginForm.tsx";
import Register from "./pages/Register/RegisterForm.tsx";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
    const pathname = location.pathname;
    if (pathname === "/") {
      navigate("/movies");
    }
  }, [location.pathname, navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
