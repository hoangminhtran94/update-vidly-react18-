import React, { Component } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Badge, Button } from "react-bootstrap";
import classes from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { logoutAndClearCache } from "../../../store/auth";
import NavDropdown from "react-bootstrap/NavDropdown";
import { User } from "../../../store/models/User.models";
import { cartActions } from "./../../../store/cart";
import { CartItem } from "./../../../store/models/CartItem.modules";
import { useTypedDispatch } from "../../../store";
import { useGetCartItemsQuery } from "../../../store/cartApi";
const NavBar: React.FC<{ user: User | null }> = ({ user }) => {
  const { data, error } = useGetCartItemsQuery<{
    data: CartItem[];
    error: any;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchThunk = useTypedDispatch();

  return (
    <Navbar className="mb-0 " bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            Vidly
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${classes["nav"]}`}>
            {user && (
              <>
                <NavLink className="nav-item nav-link" to="/movies">
                  Your movies
                </NavLink>
                <NavLink className="nav-item nav-link" to="/customers">
                  Customers
                </NavLink>
                <NavLink className="nav-item nav-link" to="/your-orders">
                  Your Orders
                </NavLink>
              </>
            )}
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            {!user && (
              <>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}
            {user && (
              <>
                <Nav.Item
                  className="ms-auto d-flex cursor-pointer align-item-center"
                  onClick={() => {
                    dispatch(cartActions.toggleCartBar(true));
                  }}
                >
                  <Button
                    variant="secondary"
                    className="d-flex align-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="rgba(255, 255, 255, 0.75)"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    {data?.length > 0 && (
                      <Badge bg="light" className="text-dark ms-2">
                        {data.reduce((a, b) => {
                          return a + b.quantity!;
                        }, 0)}
                      </Badge>
                    )}
                  </Button>
                </Nav.Item>

                <NavDropdown
                  className={`${classes["user-profile"]}`}
                  title={user.username}
                >
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <p className="nav-item nav-link text-secondary m-0">
                      Profile
                    </p>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      dispatchThunk(logoutAndClearCache());
                      navigate("/login");
                    }}
                  >
                    <p className="nav-item nav-link text-secondary m-0">
                      Logout
                    </p>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
