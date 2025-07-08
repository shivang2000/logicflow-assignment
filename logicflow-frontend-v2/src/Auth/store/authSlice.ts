/* eslint-disable import/order */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../models/user.models";

export interface AuthState {
  user: IUser | null
}

const initialState:AuthState= {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state,action: PayloadAction<IUser|null>) => {
      state.user = action.payload
    }
  }
})

export const {updateAuth} = authSlice.actions

export default authSlice.reducer