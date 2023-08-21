import { apiSlice } from "../../app/baseApiSlice"

export const playersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPlayers: builder.query({
      query: () => '/players'
    }),
  })
});

export const {
  useGetPlayersQuery,
} = playersApiSlice