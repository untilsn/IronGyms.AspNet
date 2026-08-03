import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { authApi } from "../../api/authApi";
import toast from "react-hot-toast";

export default function Topbar() {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout(); // server clears the HttpOnly cookie
    } catch {
      // even if the call fails, clear local state and send them to login
    } finally {
      clearUser();
      toast.success("Đã đăng xuất");
      navigate("/login");
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-ink-600">
          Xin chào, <span className="font-medium text-ink-800">{user?.fullName ?? "—"}</span>
        </span>
        <button onClick={handleLogout} className="btn-secondary">
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
