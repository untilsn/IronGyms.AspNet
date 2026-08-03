import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { id, email, role }
      isAuthenticated: false,
      isChecking: true, // đang kiểm tra session lúc load app
      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isChecking: false }),
      clearUser: () =>
        set({ user: null, isAuthenticated: false, isChecking: false }),
    }),
    { name: "irongyms-auth" },
  ),
);
