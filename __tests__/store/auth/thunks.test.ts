import { describe, test, expect, vi, beforeEach, afterAll, Mock } from "vitest";
import { AppDispatch, store } from "../../../src/store";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../../src/store/auth/thunks";
import { demoUser, initialState } from "../../fixtures/authFixtures";
vi.mock("../../../src/firebase/providers");

describe("tests of auth thunks", () => {
  const dispatch = vi.fn();
  const getState = vi.fn(() => ({}));

  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should invoke checkingCredentials", async () => {
    //await checkingAuthentication()(dispatch, getState, demoUser);
    //expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
  test("startGoogleSignIn should call checkingCredentials and login", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    //expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    //expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startGoogleSignIn should call checkingCredentials and logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Error in Google Sign In",
    };

    //await startGoogleSignIn()(dispatch, getState, undefined);
    //expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    //expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });
});
