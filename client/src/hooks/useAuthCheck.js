import { useEffect } from "react";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthCheck() {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    authApi
      .me()
      .then(({ data }) => setUser(data))
      .catch(() => clearUser());
  }, [setUser, clearUser]);
}
