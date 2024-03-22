import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Order","allOrders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => `/me/orders`,
    }),
    getOrderDetailsById: builder.query({
      query: (id) => `/order/${id}`,
      providedTags: ["Order"],
    }),
    stripeChekoutSession: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
          body,
        };
      },
    }),

    getDashBoardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    allOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ["allOrders"]
    }),
    updateOrderDetailsById: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/order/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrderById: builder.mutation({
      query( id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
         
        };
      },
      invalidatesTags: ["allOrders"],
    }),
  }),
});
export let {
  useNewOrderMutation,
  useLazyGetDashBoardSalesQuery,
  useStripeChekoutSessionMutation,
  useMyOrdersQuery,
  useGetOrderDetailsByIdQuery,
  useAllOrdersQuery,
  useUpdateOrderDetailsByIdMutation,
  useDeleteOrderByIdMutation
} = OrderApi;
