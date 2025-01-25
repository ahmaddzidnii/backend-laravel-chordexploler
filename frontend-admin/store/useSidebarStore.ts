import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => {
  return {
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  };
});
