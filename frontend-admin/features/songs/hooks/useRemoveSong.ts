import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSong } from "../api/songs";
import { toast } from "sonner";

export const useRemoveSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: string[]) => {
      return await removeSong(values);
    },
    onSuccess: () => {
      toast.success("Song removed successfully");
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
