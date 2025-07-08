import authSlice from '@/Auth/store/authSlice'
import editorSlice from '@/Editor/reduxSlice/editorSlice'
// eslint-disable-next-line import/order
import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {
    editorStore: editorSlice,
    auth: authSlice
  },
})

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: 
export type AppDispatch = typeof store.dispatch