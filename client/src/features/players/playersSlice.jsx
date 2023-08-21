import { createSlice } from '@reduxjs/toolkit'

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    team: "place holder", //get from local storage
    opponentTeam: "place holder"
  },
  reducers: {
    addPlayer: (state, action) => {
      const { player } = action.payload
    },
    removePlayer: (state, action) => {
      const { player } = action.payload
    },
    addOpponentPlayer: (state, action) => {
      const { player } = action.payload
    },
    removeOpponentPlayer: (state, action) => {
      const { player } = action.payload
    }
  }
})

export default playersSlice.reducer

export const { addPlayer, removePlayer, addOpponentPlayer, removeOpponentPlayer } = playersSlice.actions

export const selectUserPlayers = (state) => state.players.team
export const selectOpponentPlayers = (state) => state.players.opponentTeam