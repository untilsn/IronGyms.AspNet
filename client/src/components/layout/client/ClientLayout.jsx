import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import ClientBottomNav from "./ClientBottomNav";

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <ClientNavbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:px-8 md:pb-10">
        <Outlet />
      </main>
      <ClientBottomNav />
    </div>
  );
}
