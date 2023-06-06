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

import {
  useCheckoutMutation,
  useGetCartItemsQuery,
} from "../../../../store/cartApi";
const CartSideBar: React.FC = () => {
  const dispatch = useDispatch();

  const toggle = useSelector<RootState, boolean>((state) => state.cart.toggle);
  const { data, error } = useGetCartItemsQuery<{
    data: CartItem[];
    error: any;
  }>();
  const [checkout] = useCheckoutMutation();

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
      <Offcanvas.Body
        className="d-flex align-items-center"
        style={{ flexDirection: "column", gap: "8px" }}
      >
        {data?.length === 0 ? (
          <h2>No items in to cart</h2>
        ) : (
          data?.map((item, index) => <CartListItem key={index} item={item} />)
        )}
        {data?.length > 0 && (
          <Button
            variant="secondary"
            className={
              classes["checkout-button"] + " w-50 d-flex align-items-center"
            }
            onClick={async () => {
              checkout();
            }}
            style={{ gap: "8px" }}
          >
            Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-cart-check"
              viewBox="0 0 16 16"
            >
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </Button>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default CartSideBar;
