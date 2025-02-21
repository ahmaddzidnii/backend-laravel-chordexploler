import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSection } from "@/modules/studio/sections/api";

type InputRequest = {
  name: string;
  start_time: number;
  end_time: number;
  content: string;
  song_id: string;
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (section: InputRequest) => {
      return toast.promise(createSection(section), {
        pending: "Creating section...",
        success: "Section created",
        error: "Failed to create section",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });
    },
  });
};
