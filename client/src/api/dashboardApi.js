import axiosClient from "./axiosClient";

export const dashboardApi = {
  getStats: () => axiosClient.get("/dashboard/stats"),
  getRevenueChart: (params) => axiosClient.get("/dashboard/revenue-chart", { params }),
  getCheckInChart: (params) => axiosClient.get("/dashboard/checkin-chart", { params }),
};
