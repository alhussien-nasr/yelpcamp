import { apiSlice } from "../api/apiSlice";

 const extendesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUser: builder.query({
    //   query: () => ({ url: "/user", method: "GET", credentials: "include" }),
    // }),
    logInUser: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "post",
        credentials: "include",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/user",
        method: "post",
        credentials: "include",
        body,
      }),
    }),
    logOutUser: builder.mutation<void,void>({
      query: () => ({
        url: "/user/logout",
        method: "post",
        credentials: "include",
      }),
    }),
  }),
});
export const {
  // useGetUserQuery,
  useLogInUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
} = extendesApi;
export default extendesApi