import React, { useLayoutEffect, useState, useRef } from "react";
import { Button, Image } from "react-bootstrap";
import Modal from "../../../components/common/Modal/Modal";

import classes from "./CustomerOrderItem.module.css";
import { useChangeOrderStatusMutation } from "../../../store/orderApi";
import { Order } from "../../../store/models/Order.model";

interface CustomerOrderItemProps {
  data: Order;
}
const CustomerOrderItem: React.FC<CustomerOrderItemProps> = ({ data }) => {
  const [toggleViewCustomer, setToggleViewCustomer] = useState(false);
  const [updateOrder] = useChangeOrderStatusMutation();
  if (data.orderItems.length === 0) {
    return <h2>Not available</h2>;
  }

  return (
    <>
      {data.orderItems.map((item) => (
        <li key={item.id} className="p-2">
          <div className="row d-flex">
            <div className="col-1  d-flex align-items-center">
              <Image
                className=" w-[80px] !h-[80px]   object-cover"
                src={item.movie.image}
                rounded
                thumbnail
              />
            </div>
            <div className="col-2 d-flex align-items-center">
              {item.movie.title}
            </div>
            <div className="col-1 d-flex align-items-center ">
              {`${item.quantity} x ${item.movie.dailyRentalRate}`}
            </div>
            <div className="col-2 d-flex align-items-center ">
              {`Total: $${item.quantity * item.movie.dailyRentalRate}`}
            </div>
            <div
              className="col-3 d-flex align-items-center"
              style={{ gap: "8px", cursor: "pointer" }}
              onClick={() => {
                setToggleViewCustomer(true);
              }}
            >
              <p
                className={classes["customer-name"] + " m-0"}
              >{`${data.shoppingCart.owner.username}`}</p>
            </div>
            <div className="col-1 d-flex align-items-center text-success fw-bold">
              <p
                className={`${classes["status"]} m-0 ${
                  (data.orderStatus.id === "cancelled" ||
                    data.orderStatus.id === "declined") &&
                  "!text-red-400"
                }`}
              >
                {data.orderStatus.name}
              </p>
            </div>
            <div
              className={
                classes["order-actions"] + " col-2 d-flex align-items-center"
              }
              style={{ gap: "8px", flexWrap: "wrap" }}
            >
              {data.orderStatus.id === "pending" && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    updateOrder({ orderId: data.id, status: "confirmed" });
                  }}
                >
                  Confirm order
                </Button>
              )}
              {data.orderStatus.id === "confirmed" && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    updateOrder({ orderId: data.id, status: "shipping" });
                  }}
                >
                  Ship
                </Button>
              )}
              {data.orderStatus.id === "shipping" && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    updateOrder({ orderId: data.id, status: "shipped" });
                  }}
                >
                  Shipped
                </Button>
              )}
              {data.orderStatus.id === "shipped" && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    updateOrder({ orderId: data.id, status: "finished" });
                  }}
                >
                  Shipped
                </Button>
              )}

              {data.orderStatus.id === "pending" && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    updateOrder({ orderId: data.id, status: "declined" });
                  }}
                >
                  Decline order
                </Button>
              )}
            </div>
          </div>
        </li>
      ))}
      <Modal
        toggle={toggleViewCustomer}
        onClick={() => {
          setToggleViewCustomer(false);
        }}
      >
        <div className="container">
          <div className="row mb-4">
            <h2 className="text-center">Customer info </h2>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <Image
                className="shadow-sm"
                src={data.shoppingCart.owner.image}
                rounded
                fluid
              />
            </div>
            <div className="col-8">
              <h4>{`${data.shoppingCart.owner.firstName} ${data.shoppingCart.owner.lastName}`}</h4>
              <p>{`Username: ${data.shoppingCart.owner.username}`}</p>
              <p>Phone number:</p>
              <p>Shipping address:</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <Button
              className="w-50 d-flex justify-content-center align-items-center"
              style={{ gap: "8px" }}
            >
              <p className="m-0">Chat now </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chat-left-dots"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomerOrderItem;
