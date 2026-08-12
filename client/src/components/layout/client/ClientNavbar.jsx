import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  ScanLine,
  Receipt,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authApi } from "../../../api/authApi";
import { useAuthStore } from "../../../store/useAuthStore";

const marketingLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/about" },
  { label: "Chương trình", to: "/programs" },
  { label: "Huấn luyện viên", to: "/trainers" },
  { label: "Bảng giá", to: "/pricing" },
  { label: "Liên hệ", to: "/contact" },
];

const memberMenuLinks = [
  { label: "Tổng quan", to: "/dashboard", icon: LayoutDashboard },
  { label: "Gói tập", to: "/dashboard/membership", icon: CreditCard },
  { label: "Lịch tập", to: "/dashboard/schedule", icon: CalendarDays },
  { label: "Check-in", to: "/dashboard/checkin", icon: ScanLine },
  { label: "Thanh toán", to: "/dashboard/payments", icon: Receipt },
];

const navItemClass =
  "rounded-field focus:outline-none focus-visible:bg-base-300 hover:bg-base-300 active:!bg-primary/10 active:!text-primary";

export default function ClientNavbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearUser = useAuthStore((s) => s.clearUser);

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      toast.success("Đã đăng xuất");
      navigate("/login");
    },
  });

  const initial = user?.fullname?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <NavLink
          to="/"
          className="font-display text-xl font-bold uppercase tracking-tight"
        >
          Iron<span className="text-primary">Gyms</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {marketingLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `rounded-field border-x-2 px-3.5 py-2 font-display text-xs font-medium uppercase tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  isActive
                    ? "border-primary/60 text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="
      flex cursor-pointer items-center gap-2
      rounded-full
      px-3 py-2
      outline-none
      transition-colors
      hover:bg-base-200
      focus-visible:ring-2
      focus-visible:ring-primary/40
    "
            >
              <span className="relative flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {initial}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-base-100 bg-success" />
              </span>
              <span className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-sm font-medium text-base-content">
                  {user?.fullname ?? "Người dùng"}
                </span>
                <span className="text-[11px] text-base-content/50">
                  Đang hoạt động
                </span>
              </span>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-50 mt-3 w-64 rounded-box bg-base-200 p-2 shadow-lg"
            >
              <li className="menu-title px-2 pt-1 text-xs text-base-content/50">
                {user?.email}
              </li>

              {memberMenuLinks.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <NavLink to={to} end className={navItemClass}>
                    <Icon size={16} />
                    {label}
                  </NavLink>
                </li>
              ))}

              <div className="divider my-1" />

              <li>
                <NavLink to="/dashboard/profile" className={navItemClass}>
                  <User size={16} />
                  Hồ sơ của tôi
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/settings" className={navItemClass}>
                  <Settings size={16} />
                  Cài đặt tài khoản
                </NavLink>
              </li>

              <div className="divider my-1" />

              <li>
                <button
                  onClick={() => logoutMutation.mutate()}
                  className="rounded-field text-error focus:outline-none focus-visible:bg-error/10 hover:bg-error/10"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
