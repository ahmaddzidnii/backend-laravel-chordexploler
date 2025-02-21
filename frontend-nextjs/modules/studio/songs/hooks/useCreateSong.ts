import { z } from "zod";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSong } from "../api";
import { formCreateSongSchema } from "../ui/components/CreateSongForm";

export const useCreateSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: z.infer<typeof formCreateSongSchema>) => {
      // Create new FormData instance
      const formData = new FormData();

      // Append all form values to FormData
      Object.keys(values).forEach((key) => {
        const typedKey = key as keyof typeof values;
        if (key === "cover" && values[typedKey]) {
          formData.append("cover", values[typedKey] as File); // For file upload
        } else if (key === "key") {
          formData.append(key, JSON.stringify(values[typedKey]));
        } else if (key === "genre") {
          formData.append(key, JSON.stringify(values[typedKey]));
        } else {
          formData.append(key, values[typedKey].toString());
        }
      });
      return toast.promise(createSong(formData), {
        pending: "Creating song...",
        success: "Song created successfully",
        error: "Failed to create song",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["songs"],
      });
    },
  });
};
