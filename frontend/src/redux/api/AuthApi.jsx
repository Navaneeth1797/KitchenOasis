import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserApi } from "./UserApi";

export let AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(UserApi.endpoints.getUserProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(UserApi.endpoints.getUserProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => "/logout",
    }),
    registerAdmin: builder.mutation({
      query(body) {
        return {
          url: "/register/admin",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(UserApi.endpoints.getUserProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export let { useLoginMutation, useRegisterMutation,useLazyLogoutQuery, useRegisterAdminMutation } = AuthApi;
