import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message } from "./models/Message.modules";
import { RootState } from ".";

export const messageApiSlice = createApi({
  reducerPath: "messageApi",
  tagTypes: ["messagesData"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.mutation<Message[], string>({
      query: (roomId) => ({
        url: "messages/",
        body: JSON.stringify({ roomId: roomId }),
        method: "POST",
      }),
      invalidatesTags: ["messagesData"],
    }),
  }),
});

export const { useGetMessagesMutation } = messageApiSlice;
