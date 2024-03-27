import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoding } from "../features/UserSlice";
import { setUser } from "../features/UserSlice";
export let UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User", "allUsers", "AdminUser"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => `/profile`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          let { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoding(false));
        } catch (error) {
          dispatch(setLoding(false));
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/profile/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/password/update",
          method: "PUT",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forgot",
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
    }),
    allUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ["allUsers"],
    }),
    usersById: builder.query({
      query: (id) => `/admin/user/${id}`,
      providesTags: ["User", "AdminUser"],
    }),
    updateUsersById: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/user/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["allUsers"],
    }),
    deleteUsersById: builder.mutation({
      query( id ) {
        return {
          url: `/admin/user/${id}`,
          method: "DELETE",
          
        };
      },
      invalidatesTags: ["allUsers"],
    }),
  }),
});
export let { useGetUserProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation,
  useUsersByIdQuery,
  useUpdateUsersByIdMutation,
  useAllUsersQuery,
useDeleteUsersByIdMutation} = UserApi;
