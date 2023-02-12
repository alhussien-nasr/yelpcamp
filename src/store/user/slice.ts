import { createSlice } from "@reduxjs/toolkit";
import { authorTypes } from "../../types/index";
import { REHYDRATE } from "redux-persist";
import { apiSlice } from "../api/apiSlice";
import userApi from "./userAPI";
type userReducertypes = {
  user: authorTypes | null;
};
const initialState = {
  user: null,
} as userReducertypes;

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.logOutUser.matchFulfilled,
      (state, { payload }) => {
        console.log('from user')
        state.user = null;
      }
    );
  },
});
export const { addUser, resetUser } = user.actions;
export default user.reducer;
