import React from "react";
import { useGetCustomerOrdersQuery } from "../../store/orderApi";
import CustomerOrderItem from "./CustomerOrderItem/CustomerOrderItem";
import { Order } from "../../store/models/Order.model";

const Customer: React.FC = () => {
  const { data, error } = useGetCustomerOrdersQuery<{
    data: Order[];
    error: any;
  }>();

  return (
    <div className="container rounded shadow-sm p-4">
      <h1>Customers</h1>
      <div>
        {!data || data.length === 0 ? (
          <h2>There's no customer</h2>
        ) : (
          data.map((item) => (
            <ul key={item.id}>
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

              <CustomerOrderItem data={item} />
            </ul>
          ))
        )}
      </div>
    </div>
  );
};

export default Customer;
