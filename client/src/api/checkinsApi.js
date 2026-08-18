import axiosClient from "./axiosClient";

/*  
Không dùng createCrudApi — vì CheckInsController không có GetAll/GetById/Update/Delete, chỉ có đúng 2 action (GetByMember, Create). Ép factory vào đây sẽ tạo ra các hàm gọi API không tồn tại (404 khi lỡ gọi checkinsApi.getAll()) — giữ nguyên viết tay như bạn đã có là đúng.
*/
export const checkinsApi = {
  getByMember: (memberId) => axiosClient.get(`/checkins/member/${memberId}`),
  create: (memberId) => axiosClient.post("/checkins", { memberId }),
};
