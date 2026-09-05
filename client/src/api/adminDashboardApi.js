import axiosClient from "./axiosClient";

export const adminDashboardApi = {
  getStats: () => axiosClient.get("/admin/dashboard/stats"),
  getRevenueChart: (months = 6) =>
    axiosClient.get("/admin/dashboard/revenue-chart", { params: { months } }),
  getCheckInsChart: (days = 7) =>
    axiosClient.get("/admin/dashboard/checkins-chart", { params: { days } }),
  getPlanDistribution: () => axiosClient.get("/admin/dashboard/plan-distribution"),
  getExpiringMemberships: (withinDays = 7) =>
    axiosClient.get("/admin/dashboard/expiring-memberships", { params: { withinDays } }),
};
