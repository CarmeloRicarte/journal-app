import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login and Register */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* JournalApp */}
        <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  )
}
