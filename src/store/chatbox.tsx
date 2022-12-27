import { createSlice } from "@reduxjs/toolkit";

interface ChatBoxState {
  toggle: boolean;
}

const initialState: ChatBoxState = {
  toggle: false,
};
const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    setToggleChatBox(state) {
      state.toggle = !state.toggle;
    },
  },
});

export const chatboxActions = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
