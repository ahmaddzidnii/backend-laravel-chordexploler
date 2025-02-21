import { useQuery } from "@tanstack/react-query";
import { getKeyOptions } from "../api";

export const useGetKeyOptions = () => {
  return useQuery({
    queryKey: ["key_options"],
    queryFn: async () => {
      return await getKeyOptions();
    },
  });
};
