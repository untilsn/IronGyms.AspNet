import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  ClipboardCheck,
  CreditCard,
  Wallet,
  UserCog,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useUiStore } from "../../store/useUiStore";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/members", label: "Hội viên", icon: Users },
  { to: "/trainers", label: "Huấn luyện viên", icon: Dumbbell },
  { to: "/checkins", label: "Check-in", icon: ClipboardCheck },
  { to: "/plans", label: "Gói tập", icon: CreditCard },
  { to: "/registrations", label: "Đăng ký / Thanh toán", icon: Wallet },
  { to: "/users", label: "Người dùng", icon: UserCog },
];

export default function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-ink-100 bg-ink-900 text-ink-100 transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight text-white">
            Iron<span className="text-brand-400">Gyms</span>
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-ink-300 hover:bg-ink-800 hover:text-white"
          aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-2">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-ink-300 hover:bg-ink-800 hover:text-white"
              }`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
