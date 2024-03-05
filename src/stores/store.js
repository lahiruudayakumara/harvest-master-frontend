import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import Reducer from "./reducer"
import { thunk } from "redux-thunk"

const store = configureStore({ reducer: Reducer }, applyMiddleware(thunk));

export default store;
