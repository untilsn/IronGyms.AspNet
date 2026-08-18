import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  ScanLine,
  Receipt,
  UserRound,
} from "lucide-react";

const links = [
  { label: "Tổng quan", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Gói tập", to: "/dashboard/membership", icon: CreditCard },
  { label: "Lịch tập", to: "/dashboard/schedule", icon: CalendarDays },
  { label: "Check-in", to: "/dashboard/checkin", icon: ScanLine },
  { label: "Thanh toán", to: "/dashboard/payments", icon: Receipt },
  { label: "Hồ sơ", to: "/dashboard/profile", icon: UserRound },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="surface-card rounded-box sticky top-24 space-y-1 p-3">
        {links.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `rounded-field flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-base-content/60 hover:bg-base-300 hover:text-base-content"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
