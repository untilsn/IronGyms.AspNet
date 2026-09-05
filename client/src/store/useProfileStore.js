import { create } from "zustand";

export const useProfileStore = create((set) => ({
  member: null, // { id, fullname, email, avatarUrl, dateOfBirth, gender, city, address, joinedAt }
  trainer: null, // { id, fullname, email, avatarUrl, specialty, bio, experienceYears, certifications, joinedAt }
  isLoadingProfile: true,

  setMember: (member) => set({ member, trainer: null, isLoadingProfile: false }),
  setTrainer: (trainer) => set({ trainer, member: null, isLoadingProfile: false }),
  clearProfile: () => set({ member: null, trainer: null, isLoadingProfile: false }),
}));
