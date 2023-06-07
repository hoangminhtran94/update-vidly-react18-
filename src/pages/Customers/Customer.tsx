import React, { useEffect } from "react";
import { useGetCustomerOrdersQuery } from "../../store/orderApi";
import CustomerOrderItem from "./CustomerOrderItem/CustomerOrderItem";
import { Order } from "../../store/models/Order.model";
import { redirect, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const Customer: React.FC = () => {
  const loaderData = useLoaderData();
  const { data, error } = useGetCustomerOrdersQuery<{
    data: Order[];
    error: any;
  }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loaderData) {
      navigate("/login");
    }
  }, []);
  return (
    <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white text-slate-600">
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

export const loader = async () => {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    const data = await fetch("http://localhost:5000/api/user/validate-token", {
      headers: { Authorization: `Bearer ${token}` },
    });
    user = await data.json();
  } catch (e) {
    return redirect("/");
  }

  if (!user || !token) {
    return redirect("/login");
  }
  return user;
};
