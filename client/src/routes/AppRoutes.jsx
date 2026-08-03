import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import AdminLoginPage from "../features/auth/AdminLoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import MembersListPage from "../features/members/MembersListPage";
import HomePage from "../features/client/home/HomePage";
import ClientLayout from "../components/layout/client/ClientLayout";
// ... import các page còn lại

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Client — chỉ cần đăng nhập, không cần role cụ thể */}
      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/dashboard/membership" element={<MembershipPage />} />
          <Route path="/dashboard/schedule" element={<SchedulePage />} />
          <Route path="/dashboard/checkin" element={<CheckInPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} /> */}
        </Route>
      </Route>

      {/* Admin — bắt buộc role Admin/Staff */}
      <Route
        element={
          <RoleRoute
            allowedRoles={["Admin", "Staff"]}
            redirectTo="/admin/login"
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/members" element={<MembersListPage />} />
          {/* các route admin khác */}
        </Route>
      </Route>
    </Routes>
  );
}
