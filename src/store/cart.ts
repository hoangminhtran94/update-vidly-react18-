import { createSlice, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { CartItem } from "./models/CartItem.modules";
import { toast } from "react-toastify";
import { RootState } from ".";

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
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    addACartItem(state, action) {
      const cartItem = action.payload;
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.movieId === cartItem.movieId
      );
      if (existedItemIndex === -1) {
        state.cartItems.push(cartItem);
      } else {
        state.cartItems[existedItemIndex].quantity = action.payload.quantity;
      }
    },
    deleteACartItem(state, action) {
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems.splice(existedItemIndex, 1);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (): ThunkAction<
  Promise<any>,
  RootState,
  any,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        "http://localhost:5000/api/movies/cart/getCart",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const cartItems = await response.json();

      if (response.ok) {
        dispatch(cartActions.setCart(cartItems));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const postACartItem = (
  id: string,
  quantity: number
): ThunkAction<Promise<any>, RootState, any, AnyAction> => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch("http://localhost:5000/api/movies/cart", {
        method: "POST",
        body: JSON.stringify({ movieId: id, quantity: quantity }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const result = await response.json();
      if (response.ok) {
        if (result.message) {
          dispatch(cartActions.deleteACartItem(id));
        } else {
          dispatch(cartActions.addACartItem(result));
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };
};
export const checkout = (): ThunkAction<
  Promise<any>,
  RootState,
  any,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        "http://localhost:5000/api/movies/checkout",
        { method: "POST", headers: { Authorization: "Bearer " + token } }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {}
  };
};

export const deleteCartItem = (
  itemId: string
): ThunkAction<Promise<any>, RootState, any, AnyAction> => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        "http://localhost:5000/api/movies/cart/" + itemId,
        { method: "DELETE", headers: { Authorization: "Bearer " + token } }
      );
      if (response.ok) {
        dispatch(cartActions.deleteACartItem(itemId));
      }
    } catch (error) {}
  };
};
