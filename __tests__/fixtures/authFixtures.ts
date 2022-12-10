import { AuthState, AUTH_STATUS } from "../../src/store/auth";

export const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState: AuthState = {
  status: AUTH_STATUS.AUTHENTICATED,
  uid: "123abc",
  email: "demo@google.com",
  displayName: "Test user",
  photoURL: "https://example.com/photo.jpg",
  errorMessage: null,
};

export const notAuthenticatedState: AuthState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  status: AUTH_STATUS.AUTHENTICATED,
  uid: "123abc",
  email: "demo@google.com",
  displayName: "Test user",
  photoURL: "https://example.com/photo.jpg",
  errorMessage: null,
};
