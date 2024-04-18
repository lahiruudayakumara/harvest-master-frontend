import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  paymentVerify: [],                //store data related to Pending Payment Verify table
  pendingApproval: [],              //store data related to Pending Order table
  count: [],                        //store data related to count in dasnboard
  delivery: [],                   //store data related to delivey schedule table
  logActivity: [],                //store data related to log activity table
  filter: {
    status: "all",
    search: "",
  },
  loading: false,
  error: null,
};

export const pendingOrderSlice = createSlice({
  name: "pendingOrder",
  initialState,
  reducers: {
    fetchPaymentVerify: (state, action) => {
      state.paymentVerify = action.payload.data;

    },

    fetchPendingApproval: (state, action) => {
      state.pendingApproval = action.payload.data;

    },

    fetchCount: (state, action) => {
      state.count = action.payload.data;
    },

    fetchDelivery: (state, action) => {
      state.delivery = action.payload.data;
    },

    fetchLogActivity: (state, action) => {
      state.logActivity = action.payload.data;
    },

    addDeliveryDetails: (state, action) => {
      state.products.push(action.payload);
    },

    updateSchedule: (state, action) => {
      const index = state.delivery.findIndex(
        (delivery) => delivery.index === action.payload.index
      );
      if (index !== -1) {
        state.delivery[index] = action.payload;
      }
    },

    removeDelivery: (state, action) => {
      const updatedDelivery = state.delivery.filter(
        (delivery) => delivery.delivery_id !== action.payload
      );
      state.delivery = updatedDelivery;
    },

    updateDelivery: (state, action) => {
      const updatedDelivery = action.payload;
      const index = state.delivery.findIndex(
        (delivery) => delivery.delivery_id === updatedDelivery.delivery_id
      );
      if (index !== -1) {
        state.delivery[index] = updatedDelivery;
      }
    },

    approvePendingOrder: (state, action) => {
      state.pendingApproval = state.pendingApproval.filter(
        (delivery) => delivery.delivery_id !== action.payload.delivery_id
      );
    },

    rejectPendingOrder: (state, action) => {
      state.pendingApproval = state.pendingApproval.filter(
        (delivery) => delivery.delivery_id !== action.payload.delivery_id
      );
    },

    rejectDeliveryRequest: (state, action) => {
      state.delivery = state.delivery.filter(
        (delivery) => delivery.pid !== action.payload
      );
    },

  },
});

export const { fetchPaymentVerify, fetchPendingApproval, addDeliveryDetails, updateSchedule, approvePendingOrder, rejectDeliveryRequest, fetchCount, fetchDelivery, removeDelivery, fetchLogActivity, updateDelivery } = pendingOrderSlice.actions;

export const selectVerifyPayment = (state) => state.pendingOrder.paymentVerify;
export const selectPendingApproval = (state) => state.pendingOrder.pendingApproval;
export const selectfilter = (state) => state.pendingOrder.filter;
export const selectCount = (state) => state.pendingOrder.count;
export const selectDelivery = (state) => state.pendingOrder.delivery;
export const selectLogActivity = (state) => state.pendingOrder.logActivity;

export default pendingOrderSlice.reducer;