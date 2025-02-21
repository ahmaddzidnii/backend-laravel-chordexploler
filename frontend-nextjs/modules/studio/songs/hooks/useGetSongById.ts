import { useQuery } from "@tanstack/react-query";
import { getSongById } from "../api";

export const useGetSongById = (id: string) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => {
      return await getSongById(id);
    },
  });
};
