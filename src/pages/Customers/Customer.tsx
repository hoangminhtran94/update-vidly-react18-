import React, { Component } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
const Customer: React.FC = () => {
  const users = useSelector<RootState, User[]>((state) => state.user.users);
  return (
    <div>
      <h1>Customers</h1>
      <div>
        {users.length === 0 ? (
          <h2>There's no customer</h2>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name}- {user.userName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Customer;
