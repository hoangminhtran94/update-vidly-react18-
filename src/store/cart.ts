import { createSlice, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { CartItem } from "./models/CartItem.modules";

export interface CartState {
  cartItems: CartItem[];
  toggle: boolean;
}

export const initialState: CartState = {
  toggle: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleCartBar(state, action) {
      state.toggle = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
