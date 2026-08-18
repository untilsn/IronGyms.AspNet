import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute() {
  const { isAuthenticated, isChecking } = useAuthStore();
  const location = useLocation();

  if (isChecking) {
    return (
      <div className="bg-base-100 flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
