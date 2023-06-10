import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChatList, Message, MessageRoom } from "./models/Message.modules";
import { RootState } from ".";
import { User } from "./models/User.models";

export const messageApiSlice = createApi({
  reducerPath: "messageApi",
  tagTypes: ["messagesData", "chatlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API + "messages",
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
    getMessages: builder.query<MessageRoom, string>({
      query: (receiverId) => ({
        url: `/${receiverId}`,
      }),
      providesTags: ["messagesData"],
    }),
    getChatList: builder.query<ChatList[], void>({
      query: () => ({
        url: "/chat-list",
      }),
      providesTags: ["chatlist"],
    }),
  }),
});

export const { useGetChatListQuery, useGetMessagesQuery } = messageApiSlice;
