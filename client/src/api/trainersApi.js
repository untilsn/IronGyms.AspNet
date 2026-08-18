import { createCrudApi } from "./createCrudApi";
const base = createCrudApi("trainers");
export const trainersApi = {
  getAll: base.getAll,
  getById: base.getById,
  create: base.create,
  update: base.update,
};
