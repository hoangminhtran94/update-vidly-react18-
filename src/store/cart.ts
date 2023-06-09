import { createSlice, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { CartItem } from "./models/CartItem.modules";
import { RootState } from ".";
import { rentalApiSlice } from "./rentalApi";
import { orderApiSlice } from "./orderApi";

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

export const updateRelatedState = (): ThunkAction<
  void,
  RootState,
  any,
  AnyAction
> => {
  return (dispatch) => {
    dispatch(rentalApiSlice.util.invalidateTags(["publicMovieData"]));
    dispatch(orderApiSlice.util.invalidateTags(["yourOrders"]));
  };
};
