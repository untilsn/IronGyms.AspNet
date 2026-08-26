import axiosClient from "./axiosClient";

export const dashboardApi = {
  getMemberSummary: () => axiosClient.get("/dashboard/member-summary"),
};
