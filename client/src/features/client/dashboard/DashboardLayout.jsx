import { Outlet } from "react-router-dom";
import DashboardMobileTabs from "./components/DashboardMobileTabs";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="container py-6">
      <DashboardMobileTabs />
      <div className="flex gap-6">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
