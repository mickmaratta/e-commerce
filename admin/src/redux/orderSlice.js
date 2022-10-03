import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderStats: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    orderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    orderFailure: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    //GET ALL ORDERS
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.orders = action.payload;
    },
    //GET ORDER STATS
    getOrderStatsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.orderStats = action.payload;
    },
  },
});

export const { orderStart, orderFailure, getOrdersSuccess, getOrderStatsSuccess } =
  orderSlice.actions;
  
export default orderSlice.reducer;
