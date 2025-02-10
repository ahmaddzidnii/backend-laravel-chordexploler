import { useMutation } from "@tanstack/react-query";
import { reorderSections, Section } from "../api";

export const useReorderSection = () => {
  return useMutation({
    mutationFn: async (sections: Section["data"]) => {
      return await reorderSections(sections);
    },
  });
};
