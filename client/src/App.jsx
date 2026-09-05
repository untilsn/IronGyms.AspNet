import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { useProfileLoader } from "./hooks/useProfileLoader";

export default function App() {
  useAuthCheck();
  useProfileLoader();

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
