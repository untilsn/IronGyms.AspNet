import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function RoleRoute({ allowedRoles = [], redirectTo = "/" }) {
  const { user, isAuthenticated, isChecking } = useAuthStore();

  if (isChecking) {
    return (
      <div className="bg-base-100 flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
