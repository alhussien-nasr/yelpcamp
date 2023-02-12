import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import { apiSlice } from "./api/apiSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
