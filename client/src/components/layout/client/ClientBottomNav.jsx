import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  ScanLine,
} from "lucide-react";

const items = [
  { label: "Tổng quan", to: "/dashboard", icon: LayoutDashboard },
  { label: "Gói tập", to: "/dashboard/membership", icon: CreditCard },
  { label: "Lịch tập", to: "/dashboard/schedule", icon: CalendarDays },
  { label: "Check-in", to: "/dashboard/checkin", icon: ScanLine },
];

export default function ClientBottomNav() {
  return (
    <nav className="btm-nav fixed bottom-0 z-40 border-t border-base-300 bg-base-100 md:hidden">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-base-content/50"
          }
        >
          <Icon size={20} />
          <span className="btm-nav-label text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
