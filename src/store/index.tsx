import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import movieReducer from "./movies";
import authReducer from "./auth";
import userReducer from "./user";
export const store = configureStore({
  reducer: { movie: movieReducer, auth: authReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
