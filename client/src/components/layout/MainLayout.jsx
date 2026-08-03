import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useUiStore } from "../../store/useUiStore";

export default function MainLayout() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div
        className={`flex flex-1 flex-col transition-[margin] duration-200 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
