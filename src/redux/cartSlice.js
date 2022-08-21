import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: "cartanyone",
   initialState: {
      shoppingCart: [],
      orderTotal: 0,
      orderStatus: false
   },
   reducers: {
      setCart: (state, action) => {
         state.shoppingCart = action.payload;
      },
      setCartTotal: (state, action) => {
         state.orderTotal = action.payload;
      },
      setOrderStatus: (state, action) => {
         state.orderStatus = action.payload;
      },
   },
});

export const { setCart, setCartTotal, setOrderStatus } = cartSlice.actions;

export default cartSlice.reducer;
