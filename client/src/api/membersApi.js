import axiosClient from "./axiosClient";
import { createCrudApi } from "./createCrudApi";

export const membersApi = {
  ...createCrudApi("members"),
  getMe: () => axiosClient.get("/members/me"),
};
