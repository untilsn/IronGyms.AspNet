import axiosClient from "./axiosClient";

export const authApi = {
  register: (payload) => axiosClient.post("/auth/register", payload),
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  refresh: () => axiosClient.post("/auth/refresh"),
  logout: () => axiosClient.post("/auth/logout"),
  me: () => axiosClient.get("/auth/me"),
  changePassword: (payload) => axiosClient.post("/auth/change-password", payload),
};
