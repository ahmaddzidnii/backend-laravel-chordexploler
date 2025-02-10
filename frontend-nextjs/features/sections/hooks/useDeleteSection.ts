import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSections } from "../api";

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return toast.promise(deleteSections(ids), {
        loading: "Deleting...",
        success: "Deleted successfully",
        error: "Failed to delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });
    },
  });
};
