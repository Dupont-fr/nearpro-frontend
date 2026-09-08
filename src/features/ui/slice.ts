import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
}

interface UiState {
  toasts: Toast[]
}

const initialState: UiState = {
  toasts: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast(
      state,
      action: PayloadAction<{ message: string; variant?: ToastVariant }>,
    ) {
      const { message, variant = 'info' } = action.payload
      state.toasts.push({ id: nanoid(), message, variant })
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = uiSlice.actions
export default uiSlice.reducer