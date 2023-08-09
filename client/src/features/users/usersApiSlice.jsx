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

  })
});

export const {
  useGetUsersQuery,
  useVerifyUserQuery,
  useCreateUserMutation,

} = usersApiSlice

