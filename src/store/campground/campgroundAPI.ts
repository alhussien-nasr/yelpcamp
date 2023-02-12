import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
const extendesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampgrounds: builder.query<any, void>({
      query: () => `/campgrounds`,
      providesTags: ["Campgrounds"],
    }),
    getCampgroundByid: builder.query<any, string>({
      query: (id) => ({ url: `/campgrounds/${id}` }),
      providesTags: (res) => {
        return [{ type: "Campgrounds", id: res._id }];
      },
    }),

    postCampgrounds: builder.mutation({
      query: (campground) => ({
        url: "/campgrounds",
        method: "POST",
        body: campground,
        credentials: "include",
      }),
      invalidatesTags: ["Campgrounds"],
    }),
    deleteCampground: builder.mutation({
      query: (id) => ({
        url: `campgrounds/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Campgrounds"],
    }),
    updateCampground: builder.mutation({
      query: ({ id, body }) => {
        console.log(body, "body");
        return {
          url: `campgrounds/${id}`,
          method: "PUT",
          credentials: "include",
          body,
        };
      },
      invalidatesTags: (res, err, arg) => {
        console.log(res, "res");
        return [{ type: "Campgrounds", id: arg.id }, "Campgrounds"];
      },
    }),
    postReview: builder.mutation({
      query: ({ review, id }) => ({
        url: `/campgrounds/${id}/reviews`,
        method: "POST",
        body: review,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: (res, err, arg) => {
        console.log(res, "res");
        return [{ type: "Campgrounds", id: arg.id }, "Campgrounds"];
      },
    }),
    deleteReview: builder.mutation({
      query: ({ id, reviewId }) => ({
        url: `/campgrounds/${id}/reviews/${reviewId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (res, err, arg) => {
        console.log(res, "res");
        return [{ type: "Campgrounds", id: arg.id }, "Campgrounds"];
      },
    }),
  }),
});

export const {
  useGetCampgroundsQuery,
  usePostCampgroundsMutation,
  useGetCampgroundByidQuery,
  useDeleteCampgroundMutation,
  useUpdateCampgroundMutation,
  usePostReviewMutation,
  useDeleteReviewMutation,
} = extendesApi;
const selectCampgroundResult = extendesApi.endpoints.getCampgrounds.select();
export const selectCampgrounds = createSelector(
  selectCampgroundResult,
  (campground) => campground?.data?.data
);

// export const selectCampgroundById = (id) => selectCampgrounds.filter;
