import React, { useLayoutEffect, useState, useRef } from "react";
import { Button, Image } from "react-bootstrap";
import Modal from "../../../components/common/Modal/Modal";
import { OrderData } from "../../../utils/hooks/usePopulateCustomerData";
import classes from "./CustomerOrderItem.module.css";

interface CustomerOrderItemProps {
  data: OrderData;
}
const CustomerOrderItem: React.FC<CustomerOrderItemProps> = ({ data }) => {
  const [toggleViewCustomer, setToggleViewCustomer] = useState(false);
  return (
    <li className="container shadow-sm p-3 mb-4 rounded">
      <div className="row d-flex">
        <div className="col-1  d-flex align-items-center">
          <Image
            className="shadow-sm h-100"
            src={"http://localhost:5000/" + data.image}
            rounded
            thumbnail
          />
        </div>
        <div className="col-2 d-flex align-items-center">{data.title}</div>
        <div className="col-1 d-flex align-items-center ">
          {`${data.quantity} x ${data.dailyRentalRate}`}
        </div>
        <div className="col-2 d-flex align-items-center ">
          {`Total: $${data.quantity * data.dailyRentalRate}`}
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
          >{`${data.userName}`}</p>
        </div>
        <div className="col-1 d-flex align-items-center text-success fw-bold">
          <p className={classes["status"] + " m-0"}> Pending</p>
        </div>
        <div
          className={
            classes["order-actions"] + " col-2 d-flex align-items-center"
          }
          style={{ gap: "8px", flexWrap: "wrap" }}
        >
          <Button variant="success" size="sm">
            Ship
          </Button>
          <Button variant="danger" size="sm">
            Cancel
          </Button>
        </div>
      </div>
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
                src={"http://localhost:5000/" + data.customerImage}
                rounded
                fluid
              />
            </div>
            <div className="col-8">
              <h4>{data.name}</h4>
              <p>{`Username: ${data.userName}`}</p>
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
    </li>
  );
};

export default CustomerOrderItem;
