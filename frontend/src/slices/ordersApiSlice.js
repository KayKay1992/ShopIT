import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

// Creating Order API slice
// action craetor for orderApiSlice

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        method: "POST",
        url: ORDERS_URL,
        body: { ...order },
      }),
    }),
    getOrdersDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: ({pageNumber}) => ({
        url: ORDERS_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder : builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT'
      }),
    }),
   payOrder : builder.mutation({
    query: (orderId) => ({
      url: `${ORDERS_URL}/${orderId}/pay`,
      method: 'PUT'
    }),
   }), 
  }),
});

export const { useCreateOrderMutation, useGetOrdersDetailsQuery, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation, usePayOrderMutation } =
  ordersApiSlice;
