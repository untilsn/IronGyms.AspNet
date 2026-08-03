import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { useAuthCheck } from "./hooks/useAuthCheck";

export default function App() {
  useAuthCheck();

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
