import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import ClientFooter from "./ClientFooter";

export default function ClientLayout() {
  return (
    <div className="bg-base-100 min-h-screen">
      <ClientNavbar />
      <main className="pb-24 md:pb-10">
        <Outlet />
      </main>
      <ClientFooter />
    </div>
  );
}
