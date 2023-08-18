import { apiSlice } from "../../app/baseApiSlice"

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCheckoutSession: builder.mutation({
      query: res => ({
        url: '/payment/createCheckoutSession',
        method: 'POST',
        body: { ...res }
      })
    }),
  })
});

export const {
  useCreateCheckoutSessionMutation,
} = paymentApiSlice