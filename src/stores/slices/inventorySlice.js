import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
  },
  reducers: {
    fetchInventory: (state, action) => {
      state.products = action.payload;
    },

    addInventory: (state, action) => {
      state.products.push(action.payload);
    },

    updateInventory: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.index === action.payload.index
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    removeInventory: (state, action) => {
      state.products = state.products.filter(
        (product) => product.pid !== action.payload
      );
    },
  },
});

export const {
  fetchInventory,
  addInventory,
  updateInventory,
  removeInventory,
} = inventorySlice.actions;

export const selectInventory = (state) => state.inventory;

export default inventorySlice.reducer;
