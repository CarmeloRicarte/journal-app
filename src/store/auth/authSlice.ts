import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum AUTH_STATUS {
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
}

export interface AuthState {
  status: string;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthState>) => {
      state.status = payload.status;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = payload.errorMessage;
    },
    logout: (state, { payload }: PayloadAction<string | null>) => {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = AUTH_STATUS.CHECKING;
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
