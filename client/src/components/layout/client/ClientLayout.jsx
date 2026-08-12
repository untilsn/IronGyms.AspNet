import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import ClientFooter from "./ClientFooter";

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <ClientNavbar />
      <main className="mx-auto ">
        <Outlet />
      </main>
      <ClientFooter />
    </div>
  );
}
