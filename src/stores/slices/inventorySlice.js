import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
  },
  reducers: {
    add: (state, action) => {
      state.products.push(action.payload);
    },
    update: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    remove: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { add, update, remove } = inventorySlice.actions;

export const selectInventory = (state) => state.inventory;

export default inventorySlice.reducer;
