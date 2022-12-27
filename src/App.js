import "./App.css";
import NavBar from "./pages/Home/components/NavBar";
import Movie from "./pages/Movie/Movies.tsx";
import React, { Component, useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Customers from "./pages/Customers/Customer";
import Rentals from "./pages/Rentals/Rentals";

import NotFound from "./pages/NotFound/NotFound";
import MovieForm from "./pages/Movie/components/MovieForm/MovieForm";
import LoginForm from "./pages/Login/LoginForm.tsx";
import Register from "./pages/Register/RegisterForm.tsx";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/") {
      navigate("/rentals");
    }
  }, [location.pathname, navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute user={user}>
                <Movie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute user={user}>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute user={user}>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
