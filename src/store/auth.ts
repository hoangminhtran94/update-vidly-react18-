import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { User } from "./models/User.models";
import { RootState } from ".";
import { customerApi } from "./orderApi";
interface AuthState {
  currentUser: User | null;
  token: string | null;
}
export const initialState: AuthState = {
  currentUser: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

export const logoutAndClearCache = (): ThunkAction<
  void,
  RootState,
  any,
  AnyAction
> => {
  return (dispatch) => {
    dispatch(authActions.logout());
    dispatch(customerApi.util.resetApiState());
  };
};
