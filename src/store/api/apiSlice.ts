import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "campgroundsAPi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://yelpcamp-api.onrender.com" }),
  tagTypes: ["Campgrounds"],
  endpoints: () => ({}),
});
