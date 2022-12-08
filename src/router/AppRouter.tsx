import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";
import { AUTH_STATUS } from "../store/auth";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const status = useCheckAuth();
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
