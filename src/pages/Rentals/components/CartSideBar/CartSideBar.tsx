import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Movie } from "./../../../../store/models/Movie.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { cartActions } from "../../../../store/cart";
import { CartItem } from "../../../../store/models/CartItem.modules";
import CartListItem from "../CartListItem/CartListItem";
import classes from "./CartSideBar.module.css";
import { useTypedDispatch } from "../../../../store";
import { checkout } from "../../../../store/cart";
const CartSideBar: React.FC = () => {
  const dispatch = useDispatch();
  const dispatchThunk = useTypedDispatch();
  const toggle = useSelector<RootState, boolean>((state) => state.cart.toggle);
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.cart.cartItems
  );

  return (
    <Offcanvas
      placement="end"
      show={toggle}
      onHide={() => {
        dispatch(cartActions.toggleCartBar(false));
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <h2>No items in to cart</h2>
        ) : (
          cartItems.map((item, index) => (
            <CartListItem key={index} item={item} />
          ))
        )}
        {cartItems.length > 0 && (
          <Button
            variant="info"
            className={classes["checkout-button"]}
            onClick={async () => {
              dispatchThunk(checkout());
            }}
          >
            Checkout
          </Button>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default CartSideBar;
