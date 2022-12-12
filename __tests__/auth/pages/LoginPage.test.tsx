import { describe, expect, test, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";

import { demoUser, notAuthenticatedState } from "../../fixtures/authFixtures";

// mocks for sign in functions
const mockStartGoogleSignIn = vi.fn();
const mockStartLoginWithEmailPassword = vi.fn();
vi.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

// mock for store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

// this is how to mock partial library for mock a method, in this case, useDispatch
const mockedUseDispatch = vi.fn();
vi.mock("react-redux", async () => {
  const mod = await vi.importActual<typeof import("react-redux")>(
    "react-redux"
  );
  return {
    ...mod,
    useAppDispatch: () => mockedUseDispatch,
  };
});

describe("Tests of <LoginPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should render", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("should call so startGoogleSignIn when google button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const googleButton = screen.getByLabelText("google-btn");
    fireEvent.click(googleButton);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("should call to startLoginWithEmailPassword on submit", () => {
    const email = demoUser.email;
    const password = "12345678";
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password-input");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
