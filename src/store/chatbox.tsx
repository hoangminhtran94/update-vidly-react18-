import { createSlice } from "@reduxjs/toolkit";
import { User } from "./models/User.models";

interface ChatBoxState {
  toggle: boolean;
  currentReceiver: User | null;
}

const initialState: ChatBoxState = {
  toggle: false,
  currentReceiver: null,
};
const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    setToggleChatBox(state) {
      state.toggle = !state.toggle;
    },
    openChatBox(state) {
      state.toggle = true;
    },
    setCurrentReceiver(state, action) {
      state.currentReceiver = action.payload;
    },
  },
});

export const chatboxActions = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
