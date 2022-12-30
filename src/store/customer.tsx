import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "./models/User.models";
import { CustomerOrder } from "./models/User.models";
interface CustomerState {
  customers: User[];
  customerOrders: CustomerOrder[];
}

export const initialState: CustomerState = {
  customers: [],
  customerOrders: [],
};

const userSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addACustomer(state, action) {
      state.customers.push(action.payload);
    },
    addCustomers(state, action) {
      state.customers = [...state.customers, ...action.payload];
    },
    addCustomerOrders(state, action) {
      state.customerOrders = [...state.customerOrders, ...action.payload];
    },
  },
});

export const customerActions = userSlice.actions;
export default userSlice.reducer;

// export const fetchCustomer = (): ThunkAction<
//   Promise<any>,
//   RootState,
//   any,
//   AnyAction
// > => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;

//     const response = await fetch("http://localhost:5000/api/movies/customer", {
//       method: "POST",
//       headers: { Authorization: "Bearer " + token },
//     });
//     const result = await response.json();
//     if (response.ok) {
//       let promises: Promise<any>[] = [];
//       dispatch(customerActions.addCustomerOrders(result));
//       result.forEach((customerOrder: CustomerOrder) => {
//         promises.push(
//           fetch("http://localhost:5000/api/user/" + customerOrder.customerId)
//         );
//       });
//       try {
//         const responses = await Promise.all(promises);
//         let results: Promise<any>[] = [];
//         responses.forEach((response) => {
//           if (!response.ok) {
//             throw new Error("Something went wrong");
//           } else {
//             results.push(response.json());
//           }
//         });

//         const customers = await Promise.all(results);
//         dispatch(customerActions.addCustomers(customers));
//       } catch (error) {}
//     }
//   };
// };
