import axiosClient from "./axiosClient";
import { createCrudApi } from "./createCrudApi";

export const registrationsApi = {
  ...createCrudApi("registrations"),
  renew: (id, payload) => axiosClient.post(`/registrations/${id}/renew`, payload),
  cancel: (id) => axiosClient.post(`/registrations/${id}/cancel`),
};
