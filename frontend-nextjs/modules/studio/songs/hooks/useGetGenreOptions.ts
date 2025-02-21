import { useQuery } from "@tanstack/react-query";

import { getGenreOptions } from "../api";

export const useGetGenreOptions = () => {
  return useQuery({
    queryKey: ["genre_options"],
    queryFn: async () => {
      return await getGenreOptions();
    },
  });
};
