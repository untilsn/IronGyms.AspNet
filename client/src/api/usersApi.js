import axiosClient from "./axiosClient";

// Dùng cho mọi role — chỉ chứa hành động chung ở tầng User (auth/identity),
// không chứa dữ liệu nghiệp vụ riêng (đó là việc của membersApi/trainersApi)
export const usersApi = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
