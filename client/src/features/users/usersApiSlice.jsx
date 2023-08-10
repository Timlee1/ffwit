import { apiSlice } from "../../app/baseApiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users'
    }),
    verifyUser: builder.query({
      query: token => `/users/verify/${token}`
    }),

    createUser: builder.mutation({
      query: res => ({
        url: '/users/signup',
        method: 'POST',
        body: { ...res }
      })
    }),
    forgotPassword: builder.mutation({
      query: res => ({
        url: '/users/forgotPassword',
        method: 'POST',
        body: { ...res }
      })
    }),
    resetPassword: builder.mutation({
      query: res => ({
        url: '/users/resetPassword',
        method: 'POST',
        body: { ...res }
      })
    }),
    updatePassword: builder.mutation({
      query: res => ({
        url: '/users',
        method: 'PATCH',
        body: { ...res }
      })
    }),

  })
});

export const {
  useGetUsersQuery,
  useVerifyUserQuery,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation
} = usersApiSlice

