import { combineReducers } from "@reduxjs/toolkit";
import campgroundsReducer from "./campground/slice";
import userReducer from "./user/slice";

export const rootReducer = combineReducers({
  campgrounds: campgroundsReducer,
  user: userReducer,
});
