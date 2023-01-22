import { createSlice } from "@reduxjs/toolkit";

const campgoundSlice = createSlice({
  name: "campgrounds",
  initialState: {
    loading: false,
    campgrounds: [],
  },
  reducers: {},
  extraReducers: (bulder) => {},
});
