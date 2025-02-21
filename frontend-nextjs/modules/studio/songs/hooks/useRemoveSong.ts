import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeSong } from "../api";

export const useRemoveSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: string[]) => {
      return toast.promise(removeSong(values), {
        pending: "Removing song...",
        success: "Song removed successfully",
        error: "Failed to remove song",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });
};
