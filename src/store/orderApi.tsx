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
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCustomerOrders: builder.query<
      { customerOrders: CustomerOrder[]; customers: User[] },
      void
    >({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const resultOrders = await baseQuery("movies/customer/order");

        if (resultOrders.error)
          return { error: resultOrders.error as FetchBaseQueryError };
        const orders = resultOrders.data as CustomerOrder[];
        let promises: MaybePromise<any>[] = [];
        orders.forEach((customerOrder: CustomerOrder) => {
          promises.push(baseQuery("user/" + customerOrder.customerId));
        });
        const resultCustomer = await Promise.all(promises);
        const customers: User[] = resultCustomer.map((data) => data.data);

        return { data: { customerOrders: orders, customers: customers } };
      },
    }),
  }),
});

export const { useGetCustomerOrdersQuery } = customerApi;
