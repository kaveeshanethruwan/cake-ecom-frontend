import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";

const reducer = combineReducers({
  userX: userSlice,
  products: productsSlice,
  cart:cartSlice
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: true })],
});

export default store;
