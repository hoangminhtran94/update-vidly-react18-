import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Rentals from "../../Rentals/Rentals";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import classes from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            Vidly
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${classes["nav"]}`}>
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
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
              <NavDropdown
                className={`${classes["user-profile"]}`}
                title={user.userName}
              >
                <NavDropdown.Item>
                  <NavLink
                    className="nav-item nav-link text-secondary"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(authActions.logout());
                  }}
                >
                  <p
                    className="nav-item nav-link text-secondary"
                    style={{ margin: 0 }}
                  >
                    Logout
                  </p>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
