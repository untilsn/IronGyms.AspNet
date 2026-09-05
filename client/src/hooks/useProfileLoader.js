import { useEffect } from "react";
import { membersApi } from "../api/membersApi";
import { trainersApi } from "../api/trainersApi";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";

export function useProfileLoader() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setMember = useProfileStore((s) => s.setMember);
  const setTrainer = useProfileStore((s) => s.setTrainer);
  const clearProfile = useProfileStore((s) => s.clearProfile);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      clearProfile();
      return;
    }

    if (user.role === "Member") {
      membersApi
        .getMe()
        .then(({ data }) => setMember(data))
        .catch(() => clearProfile());
    } else if (user.role === "Trainer") {
      trainersApi
        .getMe()
        .then(({ data }) => setTrainer(data))
        .catch(() => clearProfile());
    } else {
      // Admin/Staff không có Member/Trainer profile
      clearProfile();
    }
  }, [isAuthenticated, user, setMember, setTrainer, clearProfile]);
}
