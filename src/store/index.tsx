import {
  configureStore,
  ThunkDispatch,
  AnyAction,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import { movieApiSlice } from "./movieApi";
import { customerApi } from "./orderApi";
import { useSelector, useDispatch } from "react-redux";
import movieReducer from "./movies";
import authReducer from "./auth";
import customerReducer, {
  initialState as customerInitialState,
} from "./customer";
import cartReducer, { initialState as CartInitialState } from "./cart";
import { initialState as authInitialState } from "./auth";
import chatboxReducer from "./chatbox";

const combinedReducer = combineReducers({
  movie: movieReducer,
  auth: authReducer,
  customer: customerReducer,
  cart: cartReducer,
  chatbox: chatboxReducer,
  [movieApiSlice.reducerPath]: movieApiSlice.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
});

const rootReducer: Reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === "auth/logout") {
    return {
      ...state,
      cart: CartInitialState,
      auth: authInitialState,
      customer: customerInitialState,
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApiSlice.middleware)
      .concat(customerApi.middleware),
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
