import React from "react";
import { Button } from "react-bootstrap";
import { CartItem } from "../../../../store/models/CartItem.modules";
import classes from "./CartListItem.module.css";
import {
  usePostCartItemMutation,
  useDeleteCartItemMutation,
} from "../../../../store/cartApi";

interface CartItemProps {
  item: CartItem;
}

const CartListItem: React.FC<CartItemProps> = ({ item }) => {
  const [postCartItem] = usePostCartItemMutation();
  const [deletCartItem] = useDeleteCartItemMutation();

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
          onClick={() => {
            deletCartItem(item.movieId);
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
      <div className="flex gap-2">
        <div className="w-[60px] h-full">
          <img
            src={"http://localhost:5000/" + item.movie.image}
            alt="cartImage"
            className="rounded w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2 text-center ">
            <p className="fw-bold">Title</p>
            <p className="fw-bold">Quantity</p>
            <p className="fw-bold mb-2">Price</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center items-center">
            <div className="">
              <p className="m-0">{item.movie.title}</p>
            </div>
            <div className="flex items-start">
              <button
                className="w-[40px] h-[40px] bg-slate-100  flex justify-center items-center hover:scale-105 cursor-pointer"
                onClick={() => {
                  postCartItem({ movieId: item.movieId, quantity: -1 });
                }}
              >
                -
              </button>
              <input
                className="w-[40px] h-[40px] p-1  border border-slate-100  text-center  hover:scale-105 cursor-pointer "
                value={item.quantity}
              />
              <button
                className="w-[40px] h-[40px] bg-slate-100  flex justify-center items-center hover:scale-105 cursor-pointer"
                onClick={() => {
                  postCartItem({ movieId: item.movieId, quantity: 1 });
                }}
              >
                +
              </button>
            </div>
            <div className="">
              <p className="m-0">
                ${item.quantity! * item.movie.dailyRentalRate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartListItem;
