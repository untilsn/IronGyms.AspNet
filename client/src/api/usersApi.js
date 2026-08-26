import axiosClient from "./axiosClient";

export const usersApi = {
  uploadAvatar: (id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post(`/users/${id}/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
