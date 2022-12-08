import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";
import { AUTH_STATUS, login, logout } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CheckingAuth } from "../ui";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(""));
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
    });
  }, []);

  if (status === AUTH_STATUS.CHECKING) {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === AUTH_STATUS.AUTHENTICATED ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
