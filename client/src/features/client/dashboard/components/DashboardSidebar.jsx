import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  ScanLine,
  Receipt,
  UserRound,
  LogOut,
} from "lucide-react";
import { authApi } from "../../../../api/authApi";
import { useAuthStore } from "../../../../store/useAuthStore";

const links = [
  { label: "Tổng quan", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Gói tập", to: "/dashboard/membership", icon: CreditCard },
  { label: "Lịch tập", to: "/dashboard/schedule", icon: CalendarDays },
  { label: "Check-in", to: "/dashboard/checkin", icon: ScanLine },
  { label: "Thanh toán", to: "/dashboard/payments", icon: Receipt },
  { label: "Hồ sơ", to: "/dashboard/profile", icon: UserRound },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-field px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? "bg-primary/10 font-semibold text-primary"
      : "text-base-content/60 hover:bg-base-300 hover:text-base-content"
  }`;

export default function DashboardSidebar() {
  const navigate = useNavigate();
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
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="surface-card rounded-box ring-base-content/10 sticky top-24 flex flex-col p-3 ring-1">
        <div className="space-y-1">
          {links.map(({ label, to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
        <div className="divider-subtle border-base-content/40 my-2 border-t" />
        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="rounded-field hover:bg-error/10 flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 transition-colors"
        >
          <LogOut size={18} />
          {logoutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>
      </nav>
    </aside>
  );
}
