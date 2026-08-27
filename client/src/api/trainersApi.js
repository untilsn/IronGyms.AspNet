import axiosClient from "./axiosClient";
import { createCrudApi } from "./createCrudApi";

const base = createCrudApi("trainers");

// Dùng cho: Admin quản lý danh sách Trainer (getAll, getById, create, update)
//           Trainer tự xem hồ sơ mình (getMe)
// Backend chưa có Delete cho Trainer nên không lấy `remove` từ factory.
export const trainersApi = {
  getAll: base.getAll,
  getById: base.getById,
  create: base.create,
  update: base.update,
  getMe: () => axiosClient.get("/trainers/me"),
};
