import axiosClient from "./axiosClient";
import { createCrudApi } from "./createCrudApi";

// Dùng cho: Admin/Staff quản lý danh sách Member (getAll, getById, update, remove)
//           Member tự xem/sửa hồ sơ mình (getMe)
export const membersApi = {
  ...createCrudApi("members"),
  getMe: () => axiosClient.get("/members/me"),
};
