import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

// Creating Order API slice
// action craetor for orderApiSlice

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: (order) => ({
            method: 'POST',
            url: ORDERS_URL,
            body: {...order}
            })
        })
    })
})

export const {useCreateOrderMutation} = ordersApiSlice