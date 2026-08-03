import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUiStore = create(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "irongyms-ui", // stored under this key in localStorage automatically
    }
  )
);
