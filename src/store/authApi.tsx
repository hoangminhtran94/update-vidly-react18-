import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from ".";
import { User } from "./models/User.models";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  tagTypes: ["authData"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
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
    getAuth: builder.query<User | null, void>({
      query: () => ({
        url: "user/validate-token",
      }),
      providesTags: ["authData"],
    }),
    login: builder.mutation<
      { user: User; token: string },
      { userName: string; password: string }
    >({
      query: ({ userName, password }) => ({
        url: "user/login",
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["authData"],
    }),
    register: builder.mutation<{ user: User; token: string }, FormData>({
      query: (data) => ({ url: "user/register", method: "POST", body: data }),
      invalidatesTags: ["authData"],
    }),
  }),
});

export const { useGetAuthQuery, useLoginMutation, useRegisterMutation } =
  authApiSlice;
