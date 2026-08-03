import { Route } from "react-router-dom";
import RoleRoute from "./RoleRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import AdminLayout from "../components/layout/admin/AdminLayout";
import AdminDashboardPage from "../features/admin/AdminDashboardPage";
import AdminLoginPage from "../features/auth/AdminLoginPage";
// import MembersListPage, PlansListPage, TrainersListPage... khi bạn dựng xong

const ADMIN_ROLES = ["Admin", "Staff"];

export const adminRoutes = (
  <>
    <Route element={<PublicOnlyRoute area="admin" />}>
      <Route path="/admin/login" element={<AdminLoginPage />} />
    </Route>

    <Route element={<RoleRoute allowedRoles={ADMIN_ROLES} />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        {/* <Route path="/admin/members" element={<MembersListPage />} /> */}
        {/* <Route path="/admin/plans" element={<PlansListPage />} /> */}
        {/* <Route path="/admin/trainers" element={<TrainersListPage />} /> */}
      </Route>
    </Route>
  </>
);
