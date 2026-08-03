import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../features/misc/NotFoundPage";

import HomePage from "../features/client/home/HomePage";
import { clientRoutes } from "./Client.routes";
import { adminRoutes } from "./Admin.routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {clientRoutes}
      {adminRoutes}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
