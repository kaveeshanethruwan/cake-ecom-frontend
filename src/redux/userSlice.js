import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "useranyone",
  initialState: {
    user: {},
    userid: 0,
    token: "",
    toCheckout: false,
    card: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getUserId: (state, action) => {
      state.userid = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setToCheckOut: (state, action) => {
      state.toCheckout = action.payload;
    },
    setCard: (state, action) => {
      state.card = action.payload;
    },


  },
});

export const { setUserToken, setUser, getUserId, setToCheckOut, setBillingDetails, setCard } = userSlice.actions;

export default userSlice.reducer;
