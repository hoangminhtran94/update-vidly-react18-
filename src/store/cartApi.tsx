import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ShoppingCart } from "./models/ShoppingCart.model";
import { RootState } from ".";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  tagTypes: ["cartData"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API + "shopping-cart",
    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).auth.token;
      if (!token) {
        token = localStorage.getItem("token");
      }
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCartItems: builder.query<ShoppingCart, void>({
      query: () => ({ url: "/" }),
      providesTags: ["cartData"],
    }),
    postCartItem: builder.mutation<any, { movieId: string; quantity: number }>({
      query: (cartItem) => ({
        url: "/",
        method: "POST",
        body: JSON.stringify(cartItem),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["cartData"],
    }),
    checkout: builder.mutation<any, void>({
      query: () => ({
        url: "/checkout",
        method: "POST",
      }),
      
      invalidatesTags: ["cartData"],
    }),
    deleteCartItem: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cartData"],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useDeleteCartItemMutation,
  useGetCartItemsQuery,
  useLazyGetCartItemsQuery,
  usePostCartItemMutation,
} = cartApiSlice;
