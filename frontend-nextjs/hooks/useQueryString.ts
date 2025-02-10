import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
  const searchParams = useSearchParams();
  /**
   * Get a new searchParams string by merging the current searchParams with a provided key/value pair
   */
  const createQueryString = useCallback(
    (updates: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Loop through each key-value pair in the updates object
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, String(value));
      });

      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};
