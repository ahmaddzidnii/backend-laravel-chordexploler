import { useQuery } from "@tanstack/react-query";
import { getSections } from "../api";

export const useGetSectionsBySongId = (songId: string) => {
  return useQuery({
    queryKey: ["sections", songId],
    queryFn: async () => {
      return await getSections(songId);
    },
  });
};
