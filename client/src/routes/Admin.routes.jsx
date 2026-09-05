import { Route } from "react-router-dom";
import RoleRoute from "./RoleRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import AdminLayout from "../components/layout/admin/AdminLayout";
import AdminDashboardPage from "../features/admin/AdminDashboardPage";
import AdminLoginPage from "../features/auth/AdminLoginPage";
import MembersListPage from "../features/admin/members/MembersListPage";
import PlansListPage from "../features/admin/plans/PlansListPage";
import TrainersListPage from "../features/admin/trainers/TrainersListPage";
import SchedulesPage from "../features/admin/schedules/SchedulesPage";
import CheckInsPage from "../features/admin/checkins/CheckInsPage";
// import MembersListPage, PlansListPage, TrainersListPage... khi bạn dựng xong

const ADMIN_ROLES = ["Admin", "Staff"];

export const adminRoutes = (
  <>
    <Route element={<PublicOnlyRoute area="admin" />}>
      <Route path="/admin/login" element={<AdminLoginPage />} />
    </Route>

    <Route element={<RoleRoute allowedRoles={ADMIN_ROLES} redirectTo="/admin/login" />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/members" element={<MembersListPage />} />
        <Route path="/admin/plans" element={<PlansListPage />} />
        <Route path="/admin/trainers" element={<TrainersListPage />} />
        <Route path="/admin/schedules" element={<SchedulesPage />} />
        <Route path="/admin/checkins" element={<CheckInsPage />} />
        {/* <Route path="/admin/members" element={<MembersListPage />} /> */}
        {/* <Route path="/admin/plans" element={<PlansListPage />} /> */}
        {/* <Route path="/admin/trainers" element={<TrainersListPage />} /> */}
      </Route>
    </Route>
  </>
);
