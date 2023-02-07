import { createSlice } from "@reduxjs/toolkit";
import { authorTypes } from "../../types/index";


type userReducertypes = {
  loading: boolean;
  user:  authorTypes |null;
};
const initialState = {
  loading: false,
  user: null,
} as userReducertypes;

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { addUser } = user.actions;
export default user.reducer;
