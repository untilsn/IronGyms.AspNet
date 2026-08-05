import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 md:px-8 md:pb-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
