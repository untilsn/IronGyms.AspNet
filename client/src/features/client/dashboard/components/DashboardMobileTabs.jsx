import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Tổng quan", to: "/dashboard", end: true },
  { label: "Gói tập", to: "/dashboard/membership" },
  { label: "Lịch tập", to: "/dashboard/schedule" },
  { label: "Check-in", to: "/dashboard/checkin" },
  { label: "Thanh toán", to: "/dashboard/payments" },
  { label: "Hồ sơ", to: "/dashboard/profile" },
];

export default function DashboardMobileTabs() {
  return (
    <div className="tabs tabs-boxed mb-6 flex-nowrap overflow-x-auto lg:hidden">
      {tabs.map(({ label, to, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `tab whitespace-nowrap ${isActive ? "tab-active" : ""}`}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
