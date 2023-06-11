import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { User } from "./models/User.models";
import { RootState } from ".";
import { orderApiSlice } from "./orderApi";
import { movieApiSlice } from "./movieApi";
import { cartApiSlice } from "./cartApi";
import { authApiSlice } from "./authApi";
import { messageApiSlice } from "./messageApi";
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

export const loginWithCache = ({
  user,
  token,
}: {
  user: User;
  token: string;
}): ThunkAction<Promise<any>, RootState, any, AnyAction> => {
  return async (dispatch) => {
    dispatch(authActions.login({ user: user, token: token }));
    console.log(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
};

export const logoutAndClearCache = (): ThunkAction<
  void,
  RootState,
  any,
  AnyAction
> => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authActions.logout());
    dispatch(authApiSlice.util.resetApiState());
    dispatch(orderApiSlice.util.resetApiState());
    dispatch(cartApiSlice.util.resetApiState());
    dispatch(movieApiSlice.util.resetApiState());
    dispatch(messageApiSlice.util.resetApiState());
  };
};
