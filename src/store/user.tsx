import { createSlice } from "@reduxjs/toolkit";
import { User } from "./models/User.models";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAUser(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
