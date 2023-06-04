import React from "react";
// import usePopulateOrderData from "./../../utils/hooks/usePopulateCustomerData";
import CustomerOrderItem from "./CustomerOrderItem/CustomerOrderItem";
import { useGetCustomerOrdersQuery } from "../../store/orderApi";
import { OrderData } from "../../utils/hooks/usePopulateCustomerData";
const Customer: React.FC = () => {
  const { data, error } = useGetCustomerOrdersQuery<{
    data: OrderData[];
    error: any;
  }>();
  console.log(data);

  return (
    <div className="container rounded shadow-sm p-4">
      <h1>Customers</h1>
      <div>
        {!data || data.length === 0 ? (
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
            {data.map((order, index) => (
              <CustomerOrderItem data={order} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Customer;
