import { createCrudApi } from "./createCrudApi";

// Dùng cho: mọi người xem danh sách gói (getAll/getById — public trên /pricing)
//           Admin/Staff quản lý gói (create, update, remove)
export const membershipPlansApi = createCrudApi("membershipplans");
