// store.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminNavSlice";
import inventoryReducer from "./slices/inventorySlice";
import pendingOrderReducer from "./slices/pendingOrderSlice";

const Reducer = combineReducers({
  auth: authReducer,
  nav: adminReducer,
  inventory: inventoryReducer,
  pendingOrder: pendingOrderReducer ,
});

export default Reducer;
