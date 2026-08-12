import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ADMIN_ROLES = ["Admin", "Staff"];

export default function PublicOnlyRoute({ area = "client" }) {
  const { user, isAuthenticated, isChecking } = useAuthStore();

  if (isChecking) return null;

  if (isAuthenticated) {
    const isAdminUser = ADMIN_ROLES.includes(user?.role);
    if (area === "admin" && isAdminUser)
      return <Navigate to="/admin" replace />;
    if (area === "client" && !isAdminUser) return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
