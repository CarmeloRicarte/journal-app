import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FirebaseAuth } from "../firebase";
import { logout, login, AUTH_STATUS } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { startLoadingNotes } from "../store/journal";

/**
 * It uses the `useEffect` hook to listen for changes in the user's authentication status, and then
 * dispatches the appropriate action to the Redux store
 */
export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(null));
      const { uid, email, displayName, photoURL } = user;
      dispatch(
        login({
          uid,
          email,
          displayName,
          photoURL,
          status: AUTH_STATUS.AUTHENTICATED,
          errorMessage: null,
        })
      );
      dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};
