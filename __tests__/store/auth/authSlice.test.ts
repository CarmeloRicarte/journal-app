import { describe, test, expect } from "vitest";
import {
  authSlice,
  AUTH_STATUS,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures";

describe("Tests of authSlice.ts", () => {
  test("should return initial state and call it auth", () => {
    expect(authSlice.name).toBe("auth");
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("should do authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: demoUser.errorMessage,
    });
  });

  test("should do logout with null message", () => {
    const state = authSlice.reducer(authenticatedState, logout(null));
    expect(state).toEqual(notAuthenticatedState);
  });

  test("should do logout with error message", () => {
    const errorMessageForReturn = "Wrong credentials";
    const state = authSlice.reducer(
      authenticatedState,
      logout(errorMessageForReturn)
    );
    expect(state).toEqual({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessageForReturn,
    });
  });

  test('should change status to "checking"', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe(AUTH_STATUS.CHECKING);
  });
});
