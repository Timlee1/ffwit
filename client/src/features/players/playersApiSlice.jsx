import { apiSlice } from "../../app/baseApiSlice"

export const playersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPlayers: builder.query({
      query: () => '/players'
    }),
    createSimulation: builder.mutation({
      query: res => ({
        url: '/players/simulation',
        method: 'POST',
        body: { ...res }
      }),
    }),
  })
});

export const {
  useGetPlayersQuery,
  useCreateSimulationMutation
} = playersApiSlice