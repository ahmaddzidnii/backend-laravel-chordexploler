import { create } from "zustand";

interface SectionFormStore {
  isEditing: boolean;
  setEditing: () => void;
  disableEditing: () => void;
}
export const useSectionFormStore = create<SectionFormStore>((set) => ({
  isEditing: false,
  setEditing: () => {
    set({ isEditing: true });
  },
  disableEditing: () => {
    set({ isEditing: false });
  },
}));
