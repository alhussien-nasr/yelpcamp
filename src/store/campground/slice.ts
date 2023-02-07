import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCampgroundByid,
  getCampgrounds,
  postCampgrounds,
} from "../../utils/helperFunctions";
import { campTypes } from "../../types";

export const fetchCamps = createAsyncThunk(
  "campgrounds/fetchCampgrounds",
  getCampgrounds
);

export const postCamp = createAsyncThunk(
  "campgrounds/postCampgrounds",
  postCampgrounds
);
export const findCamp = createAsyncThunk(
  "campgrounds/findCamp",
  getCampgroundByid
);

type campgroundReducerTypes = {
  loading: boolean;
  campgrounds: campTypes[];
};

const initialState = {
  loading: false,
  campgrounds: [],
} as campgroundReducerTypes;

const campgoundSlice = createSlice({
  name: "campgrounds",
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(fetchCamps.fulfilled, (state, action) => {
      const { payload } = action;
      state.campgrounds = payload;
    });
    // bulder.addCase(postCamp.fulfilled, (state, action) => {
    //   const { payload } = action;
    //   state.campgrounds.push(payload);
    // });
    bulder.addCase(findCamp.fulfilled, (state, action) => {
      const { payload } = action;
      state.campgrounds.push(payload);
    });
  },
});

export default campgoundSlice.reducer;
