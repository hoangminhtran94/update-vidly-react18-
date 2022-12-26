import React from "react";
import { Button } from "react-bootstrap";
import { CartItem } from "../../../../store/models/CartItem.modules";
import classes from "./CartListItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartActions,
  deleteCartItem,
  postACartItem,
} from "./../../../../store/cart";
import { RootState } from "../../../../store";
import { Movie } from "../../../../store/models/Movie.model";
import { useTypedDispatch } from "../../../../store";
interface CartItemProps {
  item: CartItem;
}

const CartListItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const dispatchThunk = useTypedDispatch();
  const movies = useSelector<RootState, Movie[]>((state) => state.movie.movies);
  const currentMovie = movies.find((movie) => movie.id === item.movieId);
  if (!currentMovie) {
    return <></>;
  }
  return (
    <div
      className={`container rounded p-3 mb-2 ${classes["cart-item-container"]}`}
    >
      <div className="row mx-0 mb-2 justify-content-end">
        <Button
          variant="danger"
          size="sm"
          className="d-flex align-items-center justify-content-center p-1 rounded-circle"
          style={{ width: "25px" }}
          onClick={async () => {
            await dispatchThunk(deleteCartItem(item.id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </Button>
      </div>
      <div className="row mx-0">
        <div className="col-3">
          <div className={classes["cart-item-image"]}>
            <img
              src={"http://localhost:5000/" + currentMovie.image}
              alt="cartImage"
              className="rounded"
            />
          </div>
        </div>
        <div className="col-4">
          <p className="fw-bold mb-2">Title</p>
          <p className="m-0">{currentMovie.title}</p>
        </div>
        <div className="col-3">
          <p className="fw-bold mb-2">Quantity</p>
          <div className="d-flex align-items-center ">
            <Button
              className={`${classes["substitute-button"]} rounded-circle`}
              variant="danger"
              onClick={async () => {
                dispatchThunk(postACartItem(item.movieId, -1));
              }}
            >
              -
            </Button>
            <p className="m-0 mx-1">{item.quantity}</p>
            <Button
              className={`${classes["increment-button"]} rounded`}
              variant="success"
              onClick={async () => {
                dispatchThunk(postACartItem(item.movieId, 1));
              }}
            >
              +
            </Button>
          </div>
        </div>
        <div className="col-2">
          <p className="fw-bold mb-2">Price</p>
          <p className="m-0">
            ${item.quantity! * currentMovie.dailyRentalRate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CartListItem;
