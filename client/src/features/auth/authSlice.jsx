import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("persist") === "true" ? localStorage.getItem('token') : sessionStorage.getItem('token')
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload

      state.token = accessToken

      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('token', JSON.stringify(accessToken));
        sessionStorage.removeItem('token')
      } else {
        localStorage.removeItem('token')
        sessionStorage.setItem('token', JSON.stringify(accessToken))
      }
    },
    logOut: state => {
      state.token = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('persist')
      localStorage.removeItem('scoring')
      sessionStorage.removeItem('scoring')
      localStorage.removeItem('teamPoints')
      sessionStorage.removeItem('teamPoints')
      localStorage.removeItem('opponentPoints')
      sessionStorage.removeItem('opponentPoints')
      localStorage.removeItem('scoring')
      sessionStorage.removeItem('scoring')
    },
  }
})

export default authSlice.reducer

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token