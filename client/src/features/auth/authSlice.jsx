import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: state => {
      state.token = null
      localStorage.removeItem('scoring')
      sessionStorage.removeItem('scoring')
      localStorage.removeItem('team')
      sessionStorage.removeItem('team')
      localStorage.removeItem('opponentTeam')
      sessionStorage.removeItem('opponentTeam')
      localStorage.removeItem('scoring')
      sessionStorage.removeItem('scoring')
    },
  }
})

export default authSlice.reducer

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token