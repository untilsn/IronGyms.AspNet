import { Route } from "react-router-dom";
import RoleRoute from "./RoleRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import AuthLayout from "../components/layout/auth/AuthLayout";
import ClientLayout from "../components/layout/client/ClientLayout";

import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import HomePage from "../features/client/home/HomePage";
import AboutPage from "../features/client/about/AboutPage";
import ProgramsPage from "../features/client/programs/ProgramsPage";
import TrainersPage from "../features/client/trainers/TrainersPage";
import PricingPage from "../features/client/pricing/PricingPage";
import ContactPage from "../features/client/contact/ContactPage";

import DashboardPage from "../features/client/dashboard/DashboardPage";
import DashboardLayout from "../features/client/dashboard/DashboardLayout";
import MembershipPage from "../features/client/dashboard/membership/MembershipPage";
import SchedulePage from "../features/client/dashboard/schedule/SchedulePage";
import CheckInPage from "../features/client/dashboard/checkin/CheckInPage";
import MyPaymentsPage from "../features/client/dashboard/payments/MyPaymentsPage";
import ProfilePage from "../features/client/dashboard/profile/ProfilePage";
// import DashboardHomePage, MembershipPage, SchedulePage... khi bạn dựng xong

export const clientRoutes = (
  <>
    {/* Auth — layout riêng nền hero, đã login thì không cho vào lại */}
    <Route element={<PublicOnlyRoute area="client" />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Route>

    <Route element={<ClientLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/trainers" element={<TrainersPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Protected — khu vực dashboard, bắt buộc đăng nhập đúng role Member */}
      <Route element={<RoleRoute allowedRoles={["Member", "Trainer"]} redirectTo="/" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/membership" element={<MembershipPage />} />
          <Route path="/dashboard/schedule" element={<SchedulePage />} />
          <Route path="/dashboard/checkin" element={<CheckInPage />} />
          <Route path="/dashboard/payments" element={<MyPaymentsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Route>
  </>
);
