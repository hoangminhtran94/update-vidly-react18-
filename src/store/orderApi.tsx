import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { CustomerOrder, User } from "./models/User.models";
import { RootState } from ".";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
export const customerApi = createApi({
  reducerPath: "customerApi",
  tagTypes: ["customerData"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
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
      query: (args) => ({ url: "movies/customer/order" }),
      providesTags: ["customerData"],
    }),
  }),
});

export const { useGetCustomerOrdersQuery } = customerApi;
