import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../../types'

export type AuthStatus = 'idle' | 'authenticated' | 'guest'

interface AuthState {
  user: AuthUser | null
  status: AuthStatus
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.status = 'authenticated'
    },
    clearUser(state) {
      state.user = null
      state.status = 'guest'
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer