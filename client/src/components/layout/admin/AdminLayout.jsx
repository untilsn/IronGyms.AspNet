import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { useUiStore } from "../../../store/useUiStore";

export default function AdminLayout() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <AdminSidebar />
      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-200 ${collapsed ? "ml-16" : "ml-64"}`}
      >
        <AdminTopbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
