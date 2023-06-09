import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { CustomerOrder, User } from "./models/User.models";
import { RootState } from ".";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { Order } from "./models/Order.model";
export const customerApi = createApi({
  reducerPath: "customerApi",
  tagTypes: ["customerData", "yourOrders"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API + "orders",
    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).auth.token;
      if (!token) {
        token = localStorage.getItem("token");
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCustomerOrders: builder.query<CustomerOrder[], void>({
      query: (args) => ({ url: "/customers" }),
      providesTags: ["customerData"],
    }),
    getYourOrders: builder.query<Order[], void>({
      query: (args) => ({ url: "/" }),
      providesTags: ["yourOrders"],
    }),
    changeYourOrderStatus: builder.mutation<
      void,
      { status: string; orderId: string }
    >({
      query: (args) => ({
        url: `/${args.orderId}/update-your-order`,
        method: "POST",
        body: JSON.stringify({ orderStatus: args.status }),
        headers: { "Content-Type": "application/json" },
      }),

      invalidatesTags: ["yourOrders"],
    }),
    changeOrderStatus: builder.mutation<
      void,
      { status: string; orderId: string }
    >({
      query: (args) => ({
        url: `/${args.orderId}/change-status`,
        method: "POST",
        body: JSON.stringify({ orderStatus: args.status }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["customerData"],
    }),
  }),
});

export const {
  useGetCustomerOrdersQuery,
  useGetYourOrdersQuery,
  useChangeYourOrderStatusMutation,
  useChangeOrderStatusMutation,
} = customerApi;
