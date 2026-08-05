import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import AuthLayout from "../components/layout/auth/AuthLayout";

import HomePage from "../features/client/home/HomePage";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import MainLayout from "../components/layout/client/MainLayout";
// import MembershipPage, SchedulePage, CheckInPage, ProfilePage khi bạn dựng xong

export const clientRoutes = (
  <>
    {/* Public - HomePage tự có Marketing Navbar/Footer riêng, không cần layout bọc */}
    <Route path="/" element={<HomePage />} />

    {/* Auth - layout riêng nền hero, đã login thì không cho vào lại */}
    <Route element={<PublicOnlyRoute area="client" />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Route>

    {/* Protected - khu vực dashboard, bắt buộc đăng nhập */}
    <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
      <Route element={<MainLayout />}>
        {/* <Route path="/dashboard" element={<DashboardHomePage />} /> */}
        {/* <Route path="/dashboard/membership" element={<MembershipPage />} /> */}
        {/* <Route path="/dashboard/schedule" element={<SchedulePage />} /> */}
        {/* <Route path="/dashboard/checkin" element={<CheckInPage />} /> */}
        {/* <Route path="/dashboard/profile" element={<ProfilePage />} /> */}
      </Route>
    </Route>
  </>
);
