import axiosClient from "./axiosClient";

export const registrationsApi = {
  getAll: () => axiosClient.get("/membermemberships"),
  getById: (id) => axiosClient.get(`/membermemberships/${id}`),
  getByMember: (memberId) => axiosClient.get(`/membermemberships/member/${memberId}`),

  // Member tự đăng ký gói mới cho chính mình
  subscribe: (payload) => axiosClient.post("/membermemberships/subscribe", payload),

  // Member tự gia hạn gói mình đang có
  renew: (id, payload) => axiosClient.post(`/membermemberships/${id}/renew`, payload),

  updateStatus: (id, payload) => axiosClient.patch(`/membermemberships/${id}/status`, payload),
};
