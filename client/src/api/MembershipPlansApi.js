import axiosClient from "./axiosClient";
import { createCrudApi } from "./createCrudApi";

// MembershipPlans supports soft-delete when a plan already has
// registrations tied to it, so `remove` maps to a dedicated endpoint
// instead of a hard DELETE.
export const MembershipPlansApi = {
  ...createCrudApi("membership-plans"),
  softDelete: (id) => axiosClient.patch(`/membership-plans/${id}/deactivate`),
};
