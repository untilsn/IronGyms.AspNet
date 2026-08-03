import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  CalendarClock,
  ScanLine,
  ChevronLeft,
} from "lucide-react";
import { useUiStore } from "../../../store/useUiStore";

const menu = [
  { label: "Tổng quan", to: "/admin", icon: LayoutDashboard },
  { label: "Hội viên", to: "/admin/members", icon: Users },
  { label: "Gói tập", to: "/admin/plans", icon: CreditCard },
  { label: "Huấn luyện viên", to: "/admin/trainers", icon: Dumbbell },
  { label: "Lịch tập", to: "/admin/schedules", icon: CalendarClock },
  { label: "Check-in", to: "/admin/checkins", icon: ScanLine },
];

export default function AdminSidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-base-300 bg-base-200 transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="font-display text-lg font-bold uppercase tracking-tight">
            Iron<span className="text-primary">Gyms</span>
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-square btn-sm"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {menu.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-field px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-base-content/60 hover:bg-base-300 hover:text-base-content"
              }`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
