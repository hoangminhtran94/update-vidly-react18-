import { redirect, useNavigate } from "react-router-dom";
import { Order } from "../../store/models/Order.model";
import { useGetYourOrdersQuery } from "../../store/orderApi";
import YourOrderItem from "./components/OrderItems/YourOrderItem";

const YourOrders = () => {
  const { data, error } = useGetYourOrdersQuery<{
    data: Order[];
    error: any;
  }>();

  return (
    <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
      <h1>Your Orders</h1>
      <div>
        {!data || data.length === 0 ? (
          <h2>There's no customer</h2>
        ) : (
          data.map((item) => (
            <ul key={item.id} className="container shadow-sm p-3 mb-4 rounded">
              <li className="text-xs font-bold mb-3">Order id: {item.id}</li>
              <li className="container  text-sm font-bold bg-slate-100">
                <div className="row ">
                  <div className="col-1"></div>
                  <div className="col-2">Movie</div>
                  <div className="col-1">Quantity</div>
                  <div className="col-2">Total</div>
                  <div className="col-2">Seller</div>
                  <div className="col-1">Status</div>
                  <div className="col-3"></div>
                </div>
              </li>

              <YourOrderItem data={item} />
            </ul>
          ))
        )}
      </div>
    </div>
  );
};

export default YourOrders;

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
  return null;
};
