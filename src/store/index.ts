import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/slice'
import authReducer from '../features/auth/slice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch