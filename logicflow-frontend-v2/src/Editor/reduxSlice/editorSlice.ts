/* eslint-disable import/order */
import type { IUser } from '@/Auth/models/user.models'
import { store } from '@/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ICursor } from '../models/cursor.models'
import type { Operation } from '../models/operations.models'

export interface EditorState {
  fontSize: number
  fontFamily: string
  textColor: string
  isConnected: boolean
  currentUserCursor: ICursor | null
  users: Array<IUser>
  cursors: {
    [key: string]: ICursor
  }
  operations: Array<Operation>
  lastSavedContent: string
}

const initialState: EditorState = {
  fontSize: 16,
  fontFamily: 'Arial',
  textColor: '#000000',
  isConnected: false,
  users: [],
  currentUserCursor: null,
  cursors: {},
  operations: [],
  lastSavedContent: '',
}

export const editorSlice = createSlice({
  name: 'editorStore',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload
    },
    updateFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload
    },
    updateTextColor: (state, action: PayloadAction<string>) => {
      state.textColor = action.payload
    },
    updateIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    updateUsers: (state, action: PayloadAction<Array<IUser>>) => {
      state.users = action.payload
    },
    updateAddUsers: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    },
    updateOperatons: (state, action: PayloadAction<Array<Operation>>) => {
      state.operations = action.payload
    },
    updateAddOperatons: (state, action: PayloadAction<Operation>) => {
      state.operations.push(action.payload)
    },
    updateLastSavedContent: (state, action: PayloadAction<string>) => {
      state.lastSavedContent = action.payload
    },
    updateCurrentUserCursor: (state, action: PayloadAction<ICursor | null>) => {
      state.currentUserCursor = action.payload
    },
  },
})

export const {
  updateFontFamily,
  updateFontSize,
  updateIsConnected,
  updateLastSavedContent,
  updateOperatons,
  updateTextColor,
  updateUsers,
  updateAddOperatons,
  updateCurrentUserCursor,
  updateAddUsers
} = editorSlice.actions

export const setFontSize = (newValue: number) => {
  store.dispatch(updateFontSize(newValue))
}

export const setFontFamily = (newValue: string) => {
  store.dispatch(updateFontFamily(newValue))
}

export const setTextColor = (newValue: string) => {
  store.dispatch(updateTextColor(newValue))
}

export default editorSlice.reducer
