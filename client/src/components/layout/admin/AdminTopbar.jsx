import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authApi } from "../../../api/authApi";
import { useAuthStore } from "../../../store/useAuthStore";

export default function AdminTopbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      toast.success("Đã đăng xuất");
      navigate("/admin/login");
    },
  });

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-base-300 bg-base-100/90 px-6 backdrop-blur-xl">
      <span className="badge badge-secondary badge-sm">{user?.role}</span>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar placeholder"
        >
          <div className="w-9 rounded-full bg-secondary/20 text-secondary">
            <User size={18} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-box bg-base-200 p-2 shadow-lg"
        >
          <li className="menu-title px-2 text-xs text-base-content/50">
            {user?.email}
          </li>
          <li>
            <button
              onClick={() => logoutMutation.mutate()}
              className="text-error"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
