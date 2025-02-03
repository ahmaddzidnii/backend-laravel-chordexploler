import { useQuery } from "@tanstack/react-query";
import { getSongByIds } from "../api/songs";

export const useGetSongById = (id: string) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => {
      return await getSongByIds(id);
    },
  });
};
