// store.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminNavSlice";
import inventoryReducer from "./slices/inventorySlice";
import communityMarketReducer from "./slices/communityMarketSlice";
import pendingOrderReducer from "./slices/pendingOrderSlice";
import supportDeskReducer from "./slices/supportDeskSlice";
import mapReducer from "./slices/mapSlice";
import paymentReducer from "./slices/paymentSlice";
import cartReducer from "./slices/cartSlice"
import postHarvestReducer from "./slices/postharvestPlanSlice"
import postPlansListReducer from "./slices/postPlanListSlice"
import paddyStockReducer from "./slices/paddyStockSlice"
import bidReducer from "./slices/bidSlice"
import postHarvestAuditReducer from "./slices/postharvestAuditSlice"

const Reducer = combineReducers({
  auth: authReducer,
  nav: adminReducer,
  inventory: inventoryReducer,
  communitymarket: communityMarketReducer,
  pendingOrder: pendingOrderReducer,
  support: supportDeskReducer,
  map: mapReducer,
  payments: paymentReducer,
  cart: cartReducer,
  postHarvest: postHarvestReducer,
  postPlanList: postPlansListReducer,
  paddyStock: paddyStockReducer,
  bids: bidReducer,
  postHarvestAudit: postHarvestAuditReducer
});

export default Reducer;
