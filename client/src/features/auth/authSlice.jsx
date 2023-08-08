import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem("persist") ? localStorage.getItem('token') : null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload

      state.token = accessToken

      if (localStorage.getItem("persist") === "true") {
        localStorage.setItem('token', accessToken);
      } else {
        localStorage.removeItem('token')
      }
    },
    logOut: state => {
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('persist')
    },
  }
})

export default authSlice.reducer

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token