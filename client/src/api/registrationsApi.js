import axiosClient from "./axiosClient";

/* 
Lưu ý: MemberMembershipsController dùng PATCH .../status cho việc đổi trạng thái, không phải PUT chuẩn CRUD — nên viết thêm hàm riêng updateStatus, còn update từ factory (gọi PUT /membermemberships/{id}) thực ra không khớp với backend hiện tại (controller không có action Update toàn phần cho resource này). Nên bỏ hẳn update/remove khỏi object này để tránh gọi nhầm vào endpoint không tồn tại:
 */
export const registrationsApi = {
  getAll: () => axiosClient.get("/membermemberships"),
  getById: (id) => axiosClient.get(`/membermemberships/${id}`),
  getByMember: (memberId) => axiosClient.get(`/membermemberships/member/${memberId}`),
  create: (payload) => axiosClient.post("/membermemberships", payload),
  updateStatus: (id, payload) => axiosClient.patch(`/membermemberships/${id}/status`, payload),
};
