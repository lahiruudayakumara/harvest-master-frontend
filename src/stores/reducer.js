// store.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminNavSlice";
import inventoryReducer from "./slices/inventorySlice";

const Reducer = combineReducers({
  auth: authReducer,
  nav: adminReducer,
  inventory: inventoryReducer,
});

export default Reducer;
