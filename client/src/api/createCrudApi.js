import axiosClient from "./axiosClient";

// Factory for standard REST CRUD calls against a resource, so each
// feature module doesn't repeat the same 5 functions. Override or add
// extra methods per-feature when the endpoint isn't a plain CRUD verb
// (e.g. Registrations.renew, Registrations.cancel).
export function createCrudApi(resourcePath) {
  return {
    getAll: (params) => axiosClient.get(`/${resourcePath}`, { params }),
    getById: (id) => axiosClient.get(`/${resourcePath}/${id}`),
    create: (data) => axiosClient.post(`/${resourcePath}`, data),
    update: (id, data) => axiosClient.put(`/${resourcePath}/${id}`, data),
    remove: (id) => axiosClient.delete(`/${resourcePath}/${id}`),
  };
}
