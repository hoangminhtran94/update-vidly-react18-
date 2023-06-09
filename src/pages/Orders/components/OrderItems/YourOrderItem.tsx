import React, { useLayoutEffect, useState, useRef } from "react";
import { Button, Image } from "react-bootstrap";
import Modal from "../../../../components/common/Modal/Modal";
import { useChangeYourOrderStatusMutation } from "../../../../store/orderApi";

import classes from "./YourOrderItem.module.css";
import { Order } from "../../../../store/models/Order.model";

interface CustomerOrderItemProps {
  data: Order;
}
const YourOrderItem: React.FC<CustomerOrderItemProps> = ({ data }) => {
  const [toggleViewCustomer, setToggleViewCustomer] = useState(false);
  const [updateOrder] = useChangeYourOrderStatusMutation();
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
                src={"http://localhost:5000/" + item.movie.image}
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
              className="col-2 d-flex align-items-center"
              style={{ gap: "8px", cursor: "pointer" }}
              onClick={() => {
                setToggleViewCustomer(true);
              }}
            >
              {item.movie.owner!.username}
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
                classes["order-actions"] + " col-3 d-flex align-items-center"
              }
              style={{ gap: "8px", flexWrap: "wrap" }}
            >
              <Button variant="success" size="sm">
                Contact seller
              </Button>
              {data.orderStatus.id === "pending" && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    updateOrder({ orderId: data.id, status: "cancelled" });
                  }}
                >
                  Cancel order
                </Button>
              )}
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default YourOrderItem;
