import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './baseApiSlice'
import authReducer from '../features/auth/authSlice'
import playersReducer from '../features/players/playersSlice'
import settingsReducer from '../features/settings/settingsSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    players: playersReducer,
    settings: settingsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,

})