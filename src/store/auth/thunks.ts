import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from ".";
import { store } from "..";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { AUTH_STATUS } from "./authSlice";
export const checkingAuthentication = createAsyncThunk(
  "checkingAuthentication",
  async ({ email, password }: { email: string; password: string }) => {
    store.dispatch(checkingCredentials());
  }
);

export const startGoogleSignIn = createAsyncThunk(
  "startGoogleSignIn",
  async () => {
    store.dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return store.dispatch(logout(result.errorMessage));

    store.dispatch(
      login({
        status: AUTH_STATUS.AUTHENTICATED,
        uid: result.uid ?? null,
        email: result.email ?? null,
        displayName: result.displayName ?? null,
        photoURL: result.photoURL ?? null,
        errorMessage: null,
      })
    );
  }
);

export const startCreatingUserWithEmailPassword = createAsyncThunk(
  "startCreatingUserWithEmailPassword",
  async ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    store.dispatch(checkingCredentials());
    const result = await registerWithEmailAndPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) return store.dispatch(logout(result.errorMessage));

    store.dispatch(
      login({
        status: AUTH_STATUS.AUTHENTICATED,
        uid: result.uid ?? null,
        email: result.email ?? null,
        displayName: result.displayName ?? null,
        photoURL: result.photoURL ?? null,
        errorMessage: null,
      })
    );
  }
);
