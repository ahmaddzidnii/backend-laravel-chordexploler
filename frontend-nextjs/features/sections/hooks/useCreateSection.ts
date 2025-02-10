import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSection } from "../api";

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
      return await createSection(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });
    },
  });
};
