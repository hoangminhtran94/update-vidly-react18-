import { createSlice } from "@reduxjs/toolkit";
import { User } from "./models/User.models";
interface UserProps {
  currentUser: User | null;
}
const initialState: UserProps = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
