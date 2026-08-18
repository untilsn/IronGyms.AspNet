import axiosClient from "./axiosClient";

export const schedulesApi = {
  getAll: () => axiosClient.get("/trainingschedules"),
  getByMember: (memberId) => axiosClient.get(`/trainingschedules/member/${memberId}`),
  getByTrainer: (trainerId) => axiosClient.get(`/trainingschedules/trainer/${trainerId}`),
  create: (payload) => axiosClient.post("/trainingschedules", payload),
  updateStatus: (id, payload) => axiosClient.patch(`/trainingschedules/${id}/status`, payload),
};
