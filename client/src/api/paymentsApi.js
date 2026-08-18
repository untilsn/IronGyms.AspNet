import axiosClient from "./axiosClient";

export const paymentsApi = {
  getAll: () => axiosClient.get("/payments"),
  getById: (id) => axiosClient.get(`/payments/${id}`),
  getByMembership: (memberMembershipId) =>
    axiosClient.get(`/payments/membership/${memberMembershipId}`),
  create: (payload) => axiosClient.post("/payments", payload),
};
