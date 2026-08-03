import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const { isAuthenticated, isChecking } = useAuthStore();

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
