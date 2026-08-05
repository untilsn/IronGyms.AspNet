import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authApi } from "../../../api/authApi";
import { useAuthStore } from "../../../store/useAuthStore";

const navLinks = [
  { label: "Tổng quan", to: "/dashboard" },
  { label: "Gói tập", to: "/dashboard/membership" },
  { label: "Lịch tập", to: "/dashboard/schedule" },
  { label: "Check-in", to: "/dashboard/checkin" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      toast.success("Đã đăng xuất");
      navigate("/login");
    },
  });

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <NavLink
          to="/dashboard"
          className="font-display text-xl font-bold uppercase tracking-tight"
        >
          Iron<span className="text-primary">Gyms</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `rounded-field px-4 py-2 font-display text-sm uppercase tracking-wide transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/60 hover:text-base-content"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="w-9 rounded-full bg-primary/20 text-primary">
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
              <NavLink to="/dashboard/profile">Hồ sơ của tôi</NavLink>
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
      </div>
    </header>
  );
}
