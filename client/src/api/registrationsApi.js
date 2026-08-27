import axiosClient from "./axiosClient";

// MemberMembershipsController không có PUT/DELETE chuẩn — chỉ có route
// lồng + updateStatus riêng, nên viết tay thay vì dùng createCrudApi.
export const registrationsApi = {
  getAll: () => axiosClient.get("/membermemberships"),
  getById: (id) => axiosClient.get(`/membermemberships/${id}`),
  getByMember: (memberId) => axiosClient.get(`/membermemberships/member/${memberId}`),
  create: (payload) => axiosClient.post("/membermemberships", payload),
  updateStatus: (id, payload) => axiosClient.patch(`/membermemberships/${id}/status`, payload),
};
