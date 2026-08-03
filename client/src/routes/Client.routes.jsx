import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ClientLayout from "../components/layout/client/ClientLayout";

import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import HomePage from "../features/client/home/HomePage";
// import MembershipPage, SchedulePage, CheckInPage, ProfilePage khi bạn dựng xong

export const clientRoutes = (
  <>
    {/* Public-only: đã đăng nhập thì không cho quay lại login/register */}
    <Route element={<PublicOnlyRoute area="client" />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* Protected: bắt buộc đăng nhập */}
    <Route element={<ProtectedRoute />}>
      <Route element={<ClientLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/dashboard/membership" element={<MembershipPage />} /> */}
        {/* <Route path="/dashboard/schedule" element={<SchedulePage />} /> */}
        {/* <Route path="/dashboard/checkin" element={<CheckInPage />} /> */}
        {/* <Route path="/dashboard/profile" element={<ProfilePage />} /> */}
      </Route>
    </Route>
  </>
);
