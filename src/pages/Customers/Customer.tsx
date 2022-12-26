import React from "react";
import usePopulateOrderData from "./../../utils/hooks/usePopulateCustomerData";
import CustomerOrderItem from "./CustomerOrderItem/CustomerOrderItem";
const Customer: React.FC = () => {
  const orderData = usePopulateOrderData();
  console.log(orderData);
  return (
    <div className="container rounded shadow-sm p-4">
      <h1>Customers</h1>
      <div>
        {orderData.length === 0 ? (
          <h2>There's no customer</h2>
        ) : (
          <ul>
            <li className="container mb-3 fw-bold">
              <div className="row">
                <div className="col-1"></div>
                <div className="col-2">Movie</div>
                <div className="col-1">Quantity</div>
                <div className="col-2">Total</div>
                <div className="col-3">Customer</div>
                <div className="col-1">Status</div>
                <div className="col-2"></div>
              </div>
            </li>
            {orderData.map((order, index) => (
              <CustomerOrderItem data={order} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Customer;
