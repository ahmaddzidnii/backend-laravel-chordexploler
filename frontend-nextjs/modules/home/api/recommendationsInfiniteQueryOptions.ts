import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const recommendationsInfiniteQueryOptions = queryOptions({
  queryKey: ["recommendations"],
  queryFn: async ({ pageParam }) => {
    const data = await axios.get(`http://127.0.0.1:8000/api/public/recommendations`, {
      params: {
        cursor: pageParam,
      },
    });

    return data.data;
  },
});
