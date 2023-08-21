import { createSlice } from '@reduxjs/toolkit'

const getInitialScoring = () => {
  var scoringObject = new Object();
  let scoring = "Standard"
  if (localStorage.getItem('scoring')) {
    scoring = localStorage.getItem('scoring').slice(1, -1)
  } else if (sessionStorage.getItem('scoring')) {
    scoring = sessionStorage.getItem('scoring').slice(1, -1)
  }
  scoringObject.value = scoring
  scoringObject.label = scoring
  return scoringObject
}

const getInitialTeamPoints = () => {
  let points = 0
  if (localStorage.getItem('teamPoints')) {
    points = localStorage.getItem('teamPoints').slice(1, -1)
  } else if (sessionStorage.getItem('teamPoints')) {
    points = sessionStorage.getItem('teamPoints').slice(1, -1)
  }
  return points
}

const getInitialOpponentPoints = () => {
  let points = 0
  if (localStorage.getItem('opponentPoints')) {
    points = localStorage.getItem('opponentPoints').slice(1, -1)
  } else if (sessionStorage.getItem('opponentPoints')) {
    points = sessionStorage.getItem('opponentPoints').slice(1, -1)
  }
  return points
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    scoring: getInitialScoring(),
    teamPoints: getInitialTeamPoints(),
    opponentTeamPoints: getInitialOpponentPoints()
  },
  reducers: {
    changeScoring: (state, action) => {
      const { scoring } = action.payload
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('scoring', JSON.stringify(scoring));
        sessionStorage.removeItem('scoring')
      } else {
        localStorage.removeItem('scoring')
        sessionStorage.setItem('scoring', JSON.stringify(scoring))
      }
    },
    changeTeamPoints: (state, action) => {
      const { points } = action.payload
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('teamPoints', JSON.stringify(points));
        sessionStorage.removeItem('teamPoints')
      } else {
        localStorage.removeItem('teamPoints')
        sessionStorage.setItem('teamPoints', JSON.stringify(points))
      }
    },
    changeOpponentPoints: (state, action) => {
      const { points } = action.payload
      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('opponentPoints', JSON.stringify(points));
        sessionStorage.removeItem('opponentPoints')
      } else {
        localStorage.removeItem('opponentPoints')
        sessionStorage.setItem('opponentPoints', JSON.stringify(points))
      }
    }
  }
})

export default settingsSlice.reducer

export const { changeScoring, changeTeamPoints, changeOpponentPoints } = settingsSlice.actions

export const selectScoring = (state) => state.settings.scoring
export const selectTeamPoints = (state) => state.settings.teamPoints
export const selectOpponentPoints = (state) => state.settings.opponentTeamPoints