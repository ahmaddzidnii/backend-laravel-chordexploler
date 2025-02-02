import { useMutation } from "@tanstack/react-query";
import { createSong } from "../api/songs";
import { z } from "zod";
import { formCreateSongSchema } from "../components/CreateSongForm";

export const useCreateSong = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof formCreateSongSchema>) => {
      // Create new FormData instance
      const formData = new FormData();

      // Append all form values to FormData
      Object.keys(values).forEach((key) => {
        const typedKey = key as keyof typeof values;
        if (key === "cover" && values[typedKey]) {
          formData.append("cover", values[typedKey] as File); // For file upload
        } else {
          formData.append(key, values[typedKey].toString());
        }
      });
      return await createSong(formData);
    },
  });
};
