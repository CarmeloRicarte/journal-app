import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkingCredentials } from ".";
import { store } from "..";

export const checkingAuthentication = createAsyncThunk(
  "checkingAuthentication",
  async ({ email, password }: { email: string; password: string }) => {
    store.dispatch(checkingCredentials());
  }
);

export const startGoogleSignIn = createAsyncThunk(
  "startGoogleSignIn",
  async ({ email, password }: { email: string; password: string }) => {
    store.dispatch(checkingCredentials());
  }
);
