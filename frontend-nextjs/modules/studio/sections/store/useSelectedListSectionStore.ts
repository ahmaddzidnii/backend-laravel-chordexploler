import { create } from "zustand";

interface SelectedListSectionStore {
  isAllSelected: boolean;
  selectedSections: string[];
  sections: any[];
  toggleAllSelected: () => void;
  toggleSelectSection: (sectionId: string) => void;
  resetSelection: () => void;
  setSections: (sections: any[]) => void;
}

export const useSelectedListSectionStore = create<SelectedListSectionStore>((set) => ({
  isAllSelected: false,
  sections: [],
  selectedSections: [],
  toggleAllSelected: () =>
    set((state) => ({
      isAllSelected: !state.isAllSelected,
      selectedSections: state.isAllSelected ? [] : state.sections.map((section) => section.id),
    })),
  toggleSelectSection: (sectionId) =>
    set((state) => {
      const isSelected = state.selectedSections.includes(sectionId);
      const updatedSections = isSelected
        ? state.selectedSections.filter((id) => id !== sectionId)
        : [...state.selectedSections, sectionId];

      return {
        selectedSections: updatedSections,
        isAllSelected: updatedSections.length === state.sections.length,
      };
    }),
  resetSelection: () => set({ isAllSelected: false, selectedSections: [] }),
  setSections: (sections) => set({ sections }),
}));
