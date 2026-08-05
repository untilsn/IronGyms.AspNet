import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../features/misc/NotFoundPage";
import { clientRoutes } from "./Client.routes";
import { adminRoutes } from "./Admin.routes";

export default function AppRoutes() {
  return (
    <Routes>
      {clientRoutes}
      {adminRoutes}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
