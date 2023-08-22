import { createSlice } from '@reduxjs/toolkit'

const getInitialTeam = () => {
  let team = []
  if (localStorage.getItem('team')) {
    team = JSON.parse(localStorage.getItem("team") || "[]")
  } else if (sessionStorage.getItem('team')) {
    team = JSON.parse(sessionStorage.getItem("team") || "[]")
  }
  return team
}

const getInitialOpponentTeam = () => {
  let team = []
  if (localStorage.getItem('opponentTeam')) {
    team = JSON.parse(localStorage.getItem("opponentTeam") || "[]")
  } else if (sessionStorage.getItem('opponentTeam')) {
    team = JSON.parse(sessionStorage.getItem("opponentTeam") || "[]")
  }
  return team
}

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    team: getInitialTeam(),
    opponentTeam: getInitialOpponentTeam()
  },
  reducers: {
    addPlayer: (state, action) => {
      const { player } = action.payload
      let team
      team = JSON.parse(localStorage.getItem("team") || "[]")
      if (!team.length) {
        team = JSON.parse(sessionStorage.getItem("team") || "[]")
      }
      team = [...team, player]
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('team', JSON.stringify(team));
        sessionStorage.removeItem('team')
      } else {
        localStorage.removeItem('team')
        sessionStorage.setItem('team', JSON.stringify(team))
      }
    },
    removePlayer: (state, action) => {
      const { player } = action.payload
      let team
      team = JSON.parse(localStorage.getItem("team") || "[]")
      if (!team.length) {
        team = JSON.parse(sessionStorage.getItem("team") || "[]")
      }
      team = team.filter(p => p.id != player.id)
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('team', JSON.stringify(team));
        sessionStorage.removeItem('team')
      } else {
        localStorage.removeItem('team')
        sessionStorage.setItem('team', JSON.stringify(team))
      }
    },
    addOpponentPlayer: (state, action) => {
      const { player } = action.payload
      let team
      team = JSON.parse(localStorage.getItem("opponentTeam") || "[]")
      if (!team.length) {
        team = JSON.parse(sessionStorage.getItem("opponentTeam") || "[]")
      }
      team = [...team, player]
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('opponentTeam', JSON.stringify(team));
        sessionStorage.removeItem('opponentTeam')
      } else {
        localStorage.removeItem('opponentTeam')
        sessionStorage.setItem('opponentTeam', JSON.stringify(team))
      }
    },
    removeOpponentPlayer: (state, action) => {
      const { player } = action.payload
      let team
      team = JSON.parse(localStorage.getItem("opponentTeam") || "[]")
      if (!team.length) {
        team = JSON.parse(sessionStorage.getItem("opponentTeam") || "[]")
      }
      team = team.filter(p => p.id != player.id)
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('opponentTeam', JSON.stringify(team));
        sessionStorage.removeItem('opponentTeam')
      } else {
        localStorage.removeItem('opponentTeam')
        sessionStorage.setItem('opponentTeam', JSON.stringify(team))
      }
    }
  }
})

export default playersSlice.reducer

export const { addPlayer, removePlayer, addOpponentPlayer, removeOpponentPlayer } = playersSlice.actions

export const selectUserPlayers = (state) => state.players.team
export const selectOpponentPlayers = (state) => state.players.opponentTeam