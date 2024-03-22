import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
        setCartItem: (state, action) => {
          const newItem = action.payload;
          const existingItem = state.cartItems.find(
            (item) => item.product === newItem.product
          );

          if (existingItem) {
            existingItem.quantity = newItem.quantity;
          } else {
            state.cartItems.push(newItem);
          }

          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeItem: (state, action) => {
          state.cartItems = state?.cartItems?.filter(
            (i) => i.product !== action.payload
          );
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state, action) => {

          localStorage.removeItem("cartItems",);
          state.cartItems = []
        },
        saveShippingInfo: (state, action) => {
          state.shippingInfo = action.payload;
          localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
        },
      },
    });

   

export const { setCartItem, removeItem,saveShippingInfo,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
