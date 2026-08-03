import axiosClient from "./axiosClient";

export const authApi = {
  register: (payload) => axiosClient.post("/auth/register", payload),
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  logout: () => axiosClient.post("/auth/logout"),
  me: () => axiosClient.get("/auth/me"),
};
