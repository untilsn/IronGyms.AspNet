import axiosClient from "./axiosClient";
import { createCrudApi } from "./createCrudApi";

export const checkinsApi = {
  ...createCrudApi("checkins"),
  // Manual check-in by member code/name (datalist-driven lookup on the
  // form) — mirrors the old CheckIns/Create action.
  manualCheckIn: (payload) => axiosClient.post("/checkins/manual", payload),
  searchMembers: (query) =>
    axiosClient.get("/checkins/member-search", { params: { q: query } }),
};
