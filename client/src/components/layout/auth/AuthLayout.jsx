import { Outlet } from "react-router-dom";
import { Images } from "../../../assets/images";

export default function AuthLayout() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${Images.hero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      <div className="relative z-10 w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
