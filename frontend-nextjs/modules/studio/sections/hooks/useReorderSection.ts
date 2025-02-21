import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderSections, Section } from "../api";
import { toast } from "react-toastify";

export const useReorderSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sections: Section["data"]) => {
      return toast.promise(reorderSections(sections), {
        pending: "Reordering sections...",
        success: "Sections reordered",
        error: "Failed to reorder sections",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });
    },
  });
};
